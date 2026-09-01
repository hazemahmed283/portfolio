(function () {
    "use strict";

    var root = document.documentElement;
    var nav = document.querySelector(".nav");
    var navToggle = document.querySelector("#nav-toggle");
    var navPanel = document.querySelector("#nav-menu");
    var themeToggle = document.querySelector("#theme-toggle");
    var navLinks = document.querySelectorAll(".nav-links a");
    var sections = document.querySelectorAll("main section[id]");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function getStoredTheme() {
        try {
            return localStorage.getItem("theme");
        } catch (err) {
            return null;
        }
    }

    function storeTheme(theme) {
        try {
            localStorage.setItem("theme", theme);
        } catch (err) {
            /* storage may be blocked */
        }
    }

    function preferredTheme() {
        var stored = getStoredTheme();
        if (stored === "dark" || stored === "light") {
            return stored;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function updateThemeToggle(theme) {
        if (!themeToggle) {
            return;
        }
        var next = theme === "dark" ? "light" : "dark";
        themeToggle.setAttribute("aria-label", "Switch to " + next + " mode");
        themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }

    function setTheme(theme) {
        root.setAttribute("data-theme", theme);
        storeTheme(theme);
        updateThemeToggle(theme);
        var metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute("content", theme === "dark" ? "#0b1120" : "#f8fafc");
        }
    }

    setTheme(preferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var current = root.getAttribute("data-theme");
            setTheme(current === "dark" ? "light" : "dark");
        });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
        if (!getStoredTheme()) {
            setTheme(event.matches ? "dark" : "light");
        }
    });

    function closeMenu() {
        if (!nav || !navToggle) {
            return;
        }
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
    }

    function openMenu() {
        nav.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");
        if (window.matchMedia("(max-width: 767px)").matches) {
            document.body.style.overflow = "hidden";
        }
    }

    if (navToggle && nav) {
        navToggle.addEventListener("click", function () {
            var expanded = navToggle.getAttribute("aria-expanded") === "true";
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            document.querySelectorAll("dialog[open]").forEach(function (dialog) {
                dialog.close();
            });
        }
    });

    document.addEventListener("click", function (event) {
        if (!nav || !nav.classList.contains("is-open")) {
            return;
        }
        if (!nav.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });

    var observerOptions = { threshold: 0.15 };

    if (!reducedMotion && "IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll(".reveal").forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("visible");
        });
    }

    if ("IntersectionObserver" in window) {
        var spyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                var id = entry.target.getAttribute("id");
                navLinks.forEach(function (link) {
                    var match = link.getAttribute("href") === "#" + id;
                    link.classList.toggle("active", match);
                    if (match) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

        sections.forEach(function (section) {
            spyObserver.observe(section);
        });
    }

    document.querySelectorAll(".portrait-img").forEach(function (img) {
        function showFallback() {
            var figure = img.closest(".portrait");
            if (!figure) {
                return;
            }
            figure.classList.add("is-fallback");
            var fallback = figure.querySelector(".portrait-fallback");
            if (fallback) {
                fallback.hidden = false;
            }
        }

        img.addEventListener("error", showFallback);
        if (img.complete && img.naturalWidth === 0) {
            showFallback();
        }
    });

    document.querySelectorAll("[data-dialog]").forEach(function (button) {
        button.addEventListener("click", function () {
            var dialog = document.getElementById(button.getAttribute("data-dialog"));
            if (dialog && typeof dialog.showModal === "function") {
                dialog.showModal();
            }
        });
    });

    document.querySelectorAll("[data-close-dialog]").forEach(function (button) {
        button.addEventListener("click", function () {
            var dialog = button.closest("dialog");
            if (dialog) {
                dialog.close();
            }
        });
    });

    document.querySelectorAll("dialog").forEach(function (dialog) {
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
})();
