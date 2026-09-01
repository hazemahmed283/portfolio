# Hazem Ahmed — Network & Cyber Security Portfolio

Single-page portfolio built with **HTML5**, **CSS3**, and **vanilla JavaScript**. No frameworks, icon libraries, or third-party scripts.

## How to run

Open `index.html` in a browser, or serve the `portfolio` folder locally:

```bash
# from this folder
npx --yes serve .
```

Or in PowerShell:

```powershell
Start-Process index.html
```

A local server is optional; all assets are static.

## Where to place the profile image

Put a professional photo at:

```text
assets/profile.jpg
```

Until that file exists, the page shows an initials placeholder (`HA`) so the layout does not break.

## Where to place the CV

**Placeholder:** `assets/cv.pdf` is not included yet.

Add the file here:

```text
assets/cv.pdf
```

Download buttons already point to that path (`<a href="assets/cv.pdf" download>`).

## Project images

Optional screenshots or diagrams can go in:

```text
assets/project-images/
```

Securenet X currently uses an inline SVG diagram placeholder.

## Where to edit portfolio content

| Content | File / location |
| --- | --- |
| Name, role, bio, contact | `index.html` (hero, about, contact, footer) |
| Education | `#education` |
| Skills | `#skills` |
| Experience bullets | `#experience` |
| Services | `#services` |
| Projects and Security Labs | `#projects`, `#security-labs` |
| Colors / theme | `styles.css` (`:root` and `[data-theme="dark"]`) |
| Theme, menu, animations | `script.js` |

Search HTML comments such as:

- `TODO: Replace this summary with Hazem's final professional summary`
- `ASSUMPTION: Replace with exact internship responsibilities`

## How to customize colors

Edit CSS variables in `styles.css`:

```css
:root { /* light theme */ }
[data-theme="dark"] { /* dark theme */ }
```

Theme preference is stored in `localStorage` under the key `theme`. On first visit, the site follows `prefers-color-scheme`.

## Assumptions and placeholders

- Professional summary in About is a placeholder pending Hazem’s final wording.
- Experience bullets are high-level assumptions (no invented metrics or tools).
- Profile photo and CV are missing until you add `assets/profile.jpg` and `assets/cv.pdf`.
- Location “Egypt” in About is inferred from internships; replace if needed.
- No contact form backend is included. Use WhatsApp, email, or LinkedIn.

## Accessibility and theme

- Dark/light toggle without page reload
- Keyboard-accessible navigation and mobile menu (Escape closes the menu)
- `prefers-reduced-motion` disables animations
- External links use `rel="noopener noreferrer"`
