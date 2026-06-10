# IG Grid Preview Widget for Notion

## Files
- `public/index.html` — the widget UI
- `api/notion.js` — serverless proxy (fixes CORS)
- `vercel.json` — Vercel config

## Deploy to Vercel via GitHub

### 1. Create a GitHub repo
1. Go to github.com and click the **+** → **New repository**
2. Name it `ig-grid-widget` (or anything you like)
3. Set it to **Public**, click **Create repository**

### 2. Upload the files
On the new repo page, click **uploading an existing file**
Upload these files keeping the folder structure:
- `public/index.html`
- `api/notion.js`
- `vercel.json`

Click **Commit changes**.

### 3. Deploy on Vercel
1. Go to vercel.com and click **Add New Project**
2. Click **Import** next to your GitHub repo
3. Leave all settings as default — click **Deploy**
4. Wait ~30 seconds — you'll get a live URL like `https://ig-grid-widget.vercel.app`

### 4. Embed in Notion
1. Open your Notion page
2. Type `/embed`
3. Paste your Vercel URL
4. Click **Create embed** and resize to fit

### 5. Connect your database
Fill in the widget form:
- **Token**: from notion.so/my-integrations
- **Database ID**: the 32-char ID from your Notion database URL
- **Property names**: must match your Notion columns exactly (case-sensitive)

Make sure your integration is connected to the database:
Notion database → ··· → Connections → select your integration
