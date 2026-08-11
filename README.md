# Alvin's Personal Portfolio & Resume Website 🚀

A modern, responsive, high-performance portfolio, resume, and project showcase website built with pure HTML5, CSS3, and JavaScript — ready for instant hosting on **GitHub Pages**.

---

## ✨ Features

- 🌓 **Dark & Light Mode**: Smooth theme toggling with localStorage memory and OS preference detection.
- 💻 **Project Showcase with Filters**: Categorized project cards with interactive details modal popups.
- 📜 **Interactive Resume & Timeline**: Vertical career & education timeline with tech badges and instant printable layout.
- ⚡ **Dynamic Micro-Animations**: Live typewriter effect in hero, floating badge animations, ambient background glow, and smooth scroll reveals.
- 📋 **Interactive Contact & Toast Alerts**: One-click email copy to clipboard with toast notifications and contact form handling.
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop screens with custom hamburger navigation.
- 🚀 **Zero-Build Deployment**: Pure vanilla stack without complicated build steps — runs immediately on any browser and deploys in seconds to GitHub Pages.

---

## 📂 Project Structure

```
Alvin Website/
├── index.html            # Main website markup with SEO & OpenGraph tags
├── css/
│   └── style.css         # Design tokens, dark/light theme, glassmorphism & responsive CSS
├── js/
│   └── main.js           # Theme switcher, typewriter, modal dialog, project filtering & toast
├── assets/
│   └── images/           # Avatar and high-resolution project preview screenshots
└── README.md             # Documentation and GitHub Pages hosting guide
```

---

## 🛠️ How to Preview Locally

### Option 1: Double-Click
Simply double-click [`index.html`](index.html) to open it directly in your web browser.

### Option 2: Local HTTP Server (Recommended)
Open your terminal in this project folder and run:

```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🌐 How to Host on GitHub Pages (Step-by-Step)

### Step 1: Create a GitHub Repository
1. Log into your account at [github.com](https://github.com).
2. Click the **`+`** icon in the top right $\rightarrow$ **New repository**.
3. Repository name:
   - For your primary user site: `<your-username>.github.io` (e.g., `alvin.github.io`)
   - Or any custom project name: `portfolio` or `alvin-website`
4. Set the visibility to **Public**.
5. Click **Create repository** (do not check "Initialize with README").

---

### Step 2: Push Your Local Code to GitHub
Open your terminal in this directory (`/Users/Alvin/Desktop/Alvin Website`) and execute:

```bash
# 1. Initialize git
git init

# 2. Add and commit all files
git add .
git commit -m "Initial commit: Personal Portfolio & Resume website"

# 3. Ensure branch is named 'main'
git branch -M main

# 4. Link your remote repository (replace with your actual GitHub username and repository name)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push code to GitHub
git push -u origin main
```

---

### Step 3: Activate GitHub Pages
1. Go to your repository on **GitHub.com**.
2. Click **Settings** (tab on the top right) $\rightarrow$ **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` and folder `/ (root)`
4. Click **Save**.
5. Within 1–2 minutes, your website will be live at:
   - `https://<your-username>.github.io/` (if named `<your-username>.github.io`)
   - or `https://<your-username>.github.io/<repo-name>/`

---

## ✏️ How to Customize Your Details

- **Name & Bio**: Edit [`index.html`](index.html) in the `<header>` and `#hero` section.
- **Projects**:
  - Add or change project cards in [`index.html`](index.html#projects).
  - Update the modal data object `PROJECTS_DATA` in [`js/main.js`](js/main.js#L7).
  - Add your project preview images into `assets/images/`.
- **Experience & Education**: Update the timeline items in [`index.html`](index.html#experience).
- **Skills & Tech Stack**: Update the chip items in [`index.html`](index.html#skills).
- **Contact & Social Links**: Update your email and social profile URLs in [`index.html`](index.html#contact).
