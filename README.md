<div align="center">

# 🌙 Club Ibn Khaldoun — Website

**Official website for Club Ibn Khaldoun (CIK), a social and cultural student club at FSBM, Université Hassan II Casablanca.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#)

</div>

---

## 📌 About

This is the official website of **Club Ibn Khaldoun (CIK)** — *نادي ابن خلدون للأعمال الاجتماعية والثقافية* — a student club at the Faculté des Sciences Ben M'Sick (FSBM), Université Hassan II, Casablanca.

The site showcases the club's activities, team, and mission. All content is real and sourced directly from the club's Instagram account [@cik_fsbm](https://www.instagram.com/cik_fsbm/).

> Built as a second-year student project using React, Vite, and plain CSS — no UI libraries, no backend, no database.

---

## ✨ Features

- 🌍 **Trilingual** — Full support for Arabic (RTL), French, and English
- 🌙 **Dark / Light mode** — Theme preference saved in the browser
- 📸 **48 activities** — Each with a real photo gallery and Instagram link
- 🗂️ **Gallery** — Filter photos by category with lazy-loading pagination
- 📱 **Fully responsive** — Works on mobile, tablet, and desktop
- ⚡ **Fast** — No external UI library, no unnecessary dependencies

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev) | UI components and state |
| [React Router 7](https://reactrouter.com) | Client-side page navigation |
| [Vite 8](https://vitejs.dev) | Dev server and production build |
| Plain CSS | All styling — no Tailwind, no Bootstrap |
| Node.js | Build scripts for generating event data |

---

## 📂 Project Structure

```
cik-website/
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and npm scripts
│
├── scripts/
│   ├── posts-manifest.json     # ← Edit this to add/update activities
│   ├── build-events.js         # Generates src/data/events.js from the manifest
│   └── build-full-manifest.mjs # Advanced: rebuilds manifest from Instagram export
│
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Root component (routing, language, theme)
│   ├── App.css                 # All styles
│   ├── components/
│   │   ├── Header.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Footer with social links
│   │   ├── EventCard.jsx       # Activity preview card
│   │   ├── LangSwitch.jsx      # AR / FR / EN switcher
│   │   └── ThemeToggle.jsx     # Dark / light mode button
│   ├── data/
│   │   ├── events.js           # Auto-generated — do not edit manually
│   │   ├── siteText.js         # All site text in 3 languages
│   │   ├── categories.js       # Activity categories
│   │   ├── highlights.js       # Instagram story highlights
│   │   └── team.js             # Bureau member list
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Activities.jsx
│   │   ├── EventDetail.jsx
│   │   ├── Gallery.jsx
│   │   ├── Team.jsx
│   │   ├── Join.jsx
│   │   └── NotFound.jsx
│   └── utils/
│       └── lang.js             # t(obj, lang) translation helper
│
└── public/
    ├── favicon.svg
    ├── 404.html                # GitHub Pages SPA routing fix
    └── images/
        ├── logo.jpg            # Club logo
        ├── hero.jpg            # Homepage background
        ├── events/             # One folder per activity (named by Instagram ID)
        └── team/               # Team member photos (01.jpg → 09.jpg)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hmza_brd/university-club-project.git
cd cik-website

# 2. Install dependencies
npm install

# 3. Generate the events data file
npm run build:data

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server with hot-reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run build:data` | Regenerate `src/data/events.js` from the manifest |

---

## 📝 How to Add a New Activity

1. **Get the Instagram shortcode** from the post URL.
   ```
   https://www.instagram.com/p/DYiC6BmCGyL/  →  shortcode: DYiC6BmCGyL
   ```

2. **Create the image folder:**
   ```
   public/images/events/DYiC6BmCGyL/
   ```

3. **Add photos** inside that folder, named `01.jpg`, `02.jpg`, etc.

4. **Add a new entry** at the top of `scripts/posts-manifest.json`:
   ```json
   {
     "id": "DYiC6BmCGyL",
     "category": "health",
     "date": "2026-05-16",
     "images": 9,
     "instagram": "https://www.instagram.com/p/DYiC6BmCGyL/",
     "isVideo": false,
     "title": { "ar": "...", "fr": "...", "en": "..." },
     "location": { "ar": "...", "fr": "...", "en": "..." },
     "description": { "ar": "...", "fr": "...", "en": "..." }
   }
   ```

   > **Categories:** `health` · `solidarity` · `campus` · `culture`

5. **Rebuild the data file:**
   ```bash
   npm run build:data
   ```

The new activity will automatically appear on the Activities page, Gallery, and (if it's one of the 6 most recent) the Home page.

---

## 🎨 How to Update Site Text

All text content — in Arabic, French, and English — lives in one file:

```
src/data/siteText.js
```

Edit the `ar`, `fr`, or `en` keys for the section you want to change. No rebuild needed — just save and the dev server updates instantly.

---

## 👥 How to Update the Team

1. Replace the photos in `public/images/team/` (`01.jpg` through `09.jpg`)
2. Edit the names and roles in `src/data/team.js`
3. Add or update role title translations in `src/data/siteText.js` under the `team` key

---

## 🌐 Deployment

This site is a static build — it can be hosted anywhere that serves static files.

### GitHub Pages (step by step)

```bash
# 1. Build the production site
npm run build

# 2. Push the dist/ folder to a gh-pages branch (or configure Pages manually)
```

**To deploy via GitHub Pages:**

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set the source to **GitHub Actions** (recommended) or upload the `dist/` folder to a `gh-pages` branch
4. The site will be live at `https://hmza_brd.github.io/university-club-project/`

> **Note:** The `public/404.html` file handles direct URL access (e.g. sharing a link to `/activities/DYiC6BmCGyL`). Without it, GitHub Pages would return a 404 for any route other than the homepage.

> **Note:** If your repository name ever changes, update the `og:image` and `og:url` meta tags in `index.html` to match the new GitHub Pages URL.

---

## 📸 Instagram

The club's real Instagram account: [@cik_fsbm](https://www.instagram.com/cik_fsbm/)

All activity photos and content are sourced from there. No fake stats, no invented events.

---

## 📄 License

This project is open source under the MIT License.

---

<div align="center">

Made with ❤️ by the members of **Club Ibn Khaldoun — FSBM**

*نادي ابن خلدون للأعمال الاجتماعية والثقافية — كلية العلوم بن مسيك*

</div>
