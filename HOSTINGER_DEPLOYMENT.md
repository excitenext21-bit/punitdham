# Hostinger Deployment Guide

This guide provides step-by-step instructions to bundle and deploy your polished, bug-free **Punitdhan Pulses** React & Express application to Hostinger.

---

## 📦 Option 1: Static Website Hosting (Recommended & Fastest)
Since this application operates entirely as a high-performance, interactive Single Page Application (SPA), deploying it as a **Static Site** on Hostinger Shared hosting is the easiest, most robust approach. It yields exceptional loading speeds, zero runtime maintenance, and utilizes standard web hosting with no server process management.

### Step 1: Export Your App from Google AI Studio
1. In Google AI Studio, click on the **Settings (Gear Icon)** in the top right.
2. Select **Export as ZIP** or **Export to GitHub**.
3. Extract the ZIP on your local computer.

### Step 2: Build the Application
Ensure you have [Node.js](https://nodejs.org) installed on your computer.
1. Open your terminal inside the project folder.
2. Install the development dependencies:
   ```bash
   npm install
   ```
3. Generate the finalized production assets:
   ```bash
   npm run build
   ```
   *This creates a folder named `dist` containing all production-optimized HTML, CSS, JavaScript, and asset references.*

### Step 3: Upload files to Hostinger
1. Log in to your **Hostinger hPanel**.
2. Go to **Websites** and click **Manage** next to your domain.
3. Open the **File Manager** (located under the *Files* section).
4. Go into the folder for your domain, usually named `public_html`.
5. Upload the **contents** of the `dist` folder directly into `public_html`.
   - *Ensure that `index.html` sits directly inside `public_html` (i.e., not nested inside a `public_html/dist/` subfolder).*

---

## ⚙️ Option 2: Apache Server Redirects (.htaccess)
Since Hostinger Shared Hosting runs on Apache, add a `.htaccess` file inside `public_html` so React router paths route gracefully:
1. Create a file named `.htaccess` in your `public_html` folder.
2. Add the following content:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 🚀 Option 3: Hostinger Node.js Web App Deployment
If you are using Hostinger's **Node.js Panel** or a VPS to run the actual live Express backend:

### Step 1: Run the Build
Run the following inside the project directory on your local machine or server:
```bash
npm install
npm run build
```
This command compiles the React frontend to `dist/` and compiles the Express backend (`server.ts`) to a production-optimized, standalone client-agnostic CommonJS server at `dist/server.cjs`.

### Step 2: Configure the Node.js App in Hostinger hPanel
1. Navigate to **Websites** -> **Node.js** in hPanel.
2. Set up a new Node.js application:
   - **Application Entry File**: `server.js` (We've added a main `server.js` wrapper at the root that routes seamlessly into `dist/server.cjs`)
   - **Application Root**: `/public_html` or your dedicated app directory
   - **Node version**: Select **20.x** or **22.x**
   - **Production Mode**: Enabled (`NODE_ENV=production`)
3. Upload all files (including the compiled `dist` directory, root `server.js` file, and `package.json` file) to the specified root directory.
4. Click **Run npm install** or run `npm install --omit=dev` inside the Hostinger console.
5. Start/Restart the application from the Node.js dashboard.

---

## 🛠️ Bug-Free & Production Ready Features Included
- **Streamlined Hybrid Server**: The clean standard TypeScript `server.ts` mounts the Vite dev server locally while serving compiled `dist/` statically in production.
- **Compiled Build Security**: esbuild bundles and minimizes the server code to `dist/server.cjs` with full support for native static delivery and asset loading.
- **Optimized Asset Delivery**: All images and structural media references utilize responsive, lightweight elements mapped directly inside the bundle.
- **Clean Configuration**: No unused legacy scripts or unused module loaders; pure, production-grade output.
