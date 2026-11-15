# GitHub Pages Setup Guide

Your code has been successfully pushed to GitHub! Now follow these steps to enable GitHub Pages:

## Step 1: Wait for GitHub Actions to Deploy

1. Go to: `https://github.com/pushpendra8400/p2p/actions`
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Once ✓ (green checkmark), proceed to Step 2

## Step 2: Enable GitHub Pages

1. Go to your repository: `https://github.com/pushpendra8400/p2p`
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

## Step 3: Access Your Deployed Site

Your site will be available at:
```
https://pushpendra8400.github.io/p2p/
```

Or if you've configured a custom domain:
```
https://your-custom-domain.com
```

## Step 4: Share the Link

You can now share:
```
https://pushpendra8400.github.io/p2p/
```

## Automatic Deployments

Every time you push to `main`, GitHub Actions will:
1. Build your project
2. Deploy to GitHub Pages
3. Update your live site automatically

## Troubleshooting

**If you don't see the gh-pages branch:**
- The workflow needs to run first
- Check the Actions tab for any errors
- Make sure your build passes locally: `npm run build`

**If the site still shows 404:**
- Wait 2-3 minutes after enabling Pages (GitHub needs time to process)
- Refresh the page with Ctrl+F5 (hard refresh)
- Check that the `dist/` folder is being deployed

**If the site looks broken:**
- Vite might need base path config
- Check browser console for 404 errors on assets
- This usually works out of the box for Vite projects

---

**Your deployment workflow is already configured and ready to go!**
