MTB Parks & Trails

Discover mountain bike parks and trails at a glance. See downhill status, difficulty ratings, locations, and leave reviews. This prototype is a static web app; reviews are stored in your browser (localStorage).

Features
- Parks view: name, location, downhill status, trail count, average rating
- Trails view: name, park, location, difficulty, downhill, length, elevation drop, average rating
- Filters: search (name/location), downhill (any/yes/no), difficulty (trails), by park (trails)
- Details: modal with description and metadata
- Reviews: add 1–5 star rating and comment; data persists per-browser via localStorage

Project Structure
- `index.html` – Main page markup
- `styles.css` – Minimal responsive styling
- `app.js` – Data, render logic, filters, and review handling

Local Development
This app is static. You can:

- Option A: Open `index.html` directly in your browser.
- Option B (recommended): Serve locally to avoid any browser restrictions with modern features:
  - Python: `python3 -m http.server 5173` then open http://localhost:5173
  - Node (if you have one): `npx serve` or `npx http-server`

Notes
- Reviews are stored only on the device/browser you use. A future backend can enable shared reviews, auth, and moderation.
- Sample data includes several well-known parks and trails. You can extend the `DATA` object in `app.js`.

