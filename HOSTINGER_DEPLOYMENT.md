# Punitdhan Pulses Limited — PHP/HTML Web Hosting Deployment Guide

This repository is fully configured and optimized for standard **PHP / HTML Shared Web Hosting** (Hostinger Shared Web Hosting, cPanel, Plesk, Apache, LiteSpeed, etc.) without requiring any Node.js server runtime, background processes, or VPS setup.

---

## 🌟 What Was Done to Make It 100% PHP / HTML Hosting Compatible

1. **Dual Entry Points (`index.html` & `index.php`)**:
   - Both `index.html` and `index.php` are placed at the root of `dist/`.
   - On web hosts where Apache/LiteSpeed looks for `index.php` before `index.html`, `index.php` automatically outputs `index.html` with proper MIME headers.
2. **Pre-rendered Clean URLs for All Routes**:
   - Every page (`/about-us`, `/board-of-directors`, `/services`, `/products-specs`, `/alliances`, `/connect`, `/careers`) is pre-rendered into its own subfolder containing both `index.html` and `index.php`, as well as standalone `.html` files (e.g. `about-us.html`).
   - Deep-linking and refreshing on any page works with zero 404 errors.
3. **Optimized Apache `.htaccess` Included**:
   - Built directly into `dist/.htaccess`.
   - Handles automatic HTTPS redirection, gzip/deflate compression, Core Web Vitals caching, video streaming byte-ranges (`.mp4`), and clean SPA fallback routing.
4. **Serverless PHP Form Email Handling**:
   - Contact form inquiries, product RFQs, and job applications are processed through `send-inquiry.php` (and `api/send-inquiry.php`).
   - Uses authenticated SMTP (via bundled PHPMailer or raw socket fallback) to dispatch all submissions directly to `punitdhan_pulses2025@yahoo.com`.
   - Works immediately on any PHP 7.4+ / PHP 8.x hosting without Node.js!
5. **Zero Design or Effect Changes**:
   - Lenis smooth scrolling, Motion animations, responsive navigation, contact drawers, language switcher, video background, and all styles remain 100% preserved and fully interactive.

---

## 🚀 How to Deploy to Hostinger / cPanel (Step-by-Step)

### Step 1: Build the Production Files
In your project directory, run:
```bash
npm run build
```
*(This compiles all React components, generates static route subfolders with `index.html` and `index.php`, syncs `.htaccess`, and places everything inside the `dist/` folder.)*

### Step 2: Upload `dist` to Hostinger File Manager
1. Log in to your **Hostinger hPanel** (or cPanel).
2. Go to **Websites** -> Click **Manage** next to `punitdhan.com`.
3. Open **File Manager** (under the *Files* section).
4. Navigate to your website's root folder: `public_html`.
5. *(Optional but recommended)* Delete any default placeholder files (like `default.php`).
6. Upload the **contents** of your local `dist/` folder directly into `public_html`.

> [!IMPORTANT]
> Upload the **contents inside** `dist/` directly into `public_html`, so that `index.html`, `index.php`, `.htaccess`, `send-inquiry.php`, and the `assets/` folder are located directly in `public_html`.

---

## 📂 Verification of Files in `public_html`

After uploading, your `public_html` should look like this:
```
public_html/
├── .htaccess                 <- Apache rewrite, caching, security headers
├── index.html                <- Main pre-rendered application HTML
├── index.php                 <- PHP fallback entry point
├── send-inquiry.php          <- PHP SMTP email handler
├── phpmailer/                <- Bundled PHPMailer classes
├── api/
│   └── send-inquiry.php      <- Secondary API endpoint
├── about-us/
│   ├── index.html
│   └── index.php
├── board-of-directors/
│   ├── index.html
│   └── index.php
├── services/
│   ├── index.html
│   └── index.php
├── products-specs/
│   ├── index.html
│   └── index.php
├── alliances/
│   ├── index.html
│   └── index.php
├── connect/
│   ├── index.html
│   └── index.php
├── careers/
│   ├── index.html
│   └── index.php
├── assets/                   <- Production JavaScript & CSS chunks
├── hero-video.mp4            <- Background media
├── favicon.ico, sitemap.xml, robots.txt, etc.
```

---

## 🧪 Testing Your Live Site

1. Open `https://punitdhan.com/` in your browser.
2. Navigate across pages:
   - `https://punitdhan.com/about-us`
   - `https://punitdhan.com/board-of-directors`
   - `https://punitdhan.com/services`
   - `https://punitdhan.com/products-specs`
   - `https://punitdhan.com/alliances`
   - `https://punitdhan.com/connect`
   - `https://punitdhan.com/careers`
3. Refresh the page on any sub-URL to verify that the server serves the pre-rendered page with zero 404s.
4. Submit a test message through the Contact Form or Drawer — verify that it returns a success message and delivers an email to `punitdhan_pulses2025@yahoo.com`.
