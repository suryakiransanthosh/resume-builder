# Resume Builder

A simple web app that walks you through a short questionnaire and generates a polished, print-ready resume from a prebuilt template.

## Features

- **5-step wizard**: contact → summary → experience → education → skills
- **Prebuilt resume layout**: clean template with summary, experience, education, and skills sections
- **PDF export**: click **Download PDF**, then choose **Save as PDF** in your browser's print dialog
- **No build required**: plain HTML, CSS, and JavaScript

## Run locally

```bash
cd ~/resume-builder
python3 -m http.server 8080
```

Open http://localhost:8080 in your browser.

You can also double-click `index.html`, but a local server is recommended so fonts load reliably.

## Host on Vercel

1. Push this folder to GitHub (create a new empty repo on github.com, then):

```bash
cd ~/resume-builder
git add index.html styles.css app.js README.md .gitignore
git commit -m "Resume builder"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new) and sign in.
3. **Import** your `resume-builder` repo → click **Deploy** (no build step needed).

Vercel will give you a live URL like `https://resume-builder-xyz.vercel.app`.

## Optional React version

The `src/` folder contains a React + Vite version if you prefer that stack. Install Node.js, then:

```bash
npm install
npm run dev
```
