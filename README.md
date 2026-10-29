# Rohit Tomar – Portfolio

## Run it on your computer
1. Install Node.js (nodejs.org), then open this folder in VS Code.
2. In the VS Code terminal: `npm install`
3. Copy `.env.example` to `.env` and fill in `EMAIL_PASS`:
   Google Account > Security > turn on 2-Step Verification > App passwords > create one, paste the 16 letters.
4. `npm start` and open http://localhost:3000

## Make it live
**Option A, with the contact form emailing you (recommended): Render.com**
1. Push this folder to a GitHub repo (never commit `.env`).
2. Render > New > Web Service > connect the repo.
3. Build command `npm install`, start command `npm start`.
4. Add environment variables EMAIL_USER, EMAIL_PASS, EMAIL_TO.

**Option B, static only (no backend): Netlify or GitHub Pages**
Upload only the `public` folder. Everything works; the form falls back to opening the visitor's email app.
