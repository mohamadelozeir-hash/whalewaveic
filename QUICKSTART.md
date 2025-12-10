# 🚀 Quick Start Guide

Get your WhaleWaveIC website live in 5 minutes!

## Step 1: Preview Locally (30 seconds)

Open Terminal and run:

```bash
cd /Users/projects/Documents/whalewaveic
python3 -m http.server 8000
```

Then visit: **http://localhost:8000**

✅ Check that everything looks good!

## Step 2: Deploy to GitHub Pages (3 minutes)

### Option A: Use the Deployment Script (Easiest)

```bash
cd /Users/projects/Documents/whalewaveic
./deploy.sh
```

Follow the prompts!

### Option B: Manual Deployment

```bash
cd /Users/projects/Documents/whalewaveic

# Initialize Git
git init
git add .
git commit -m "Initial commit: WhaleWaveIC modern website"
git branch -M main

# Create repository on GitHub
# Visit: https://github.com/new
# Name: whalewaveic
# Make it public
# Don't initialize with anything

# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/whalewaveic.git
git push -u origin main
```

### Enable GitHub Pages

1. Go to: `https://github.com/YOUR_USERNAME/whalewaveic/settings/pages`
2. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **Save**
4. Wait 2-3 minutes ⏱️

Your site will be live at:
```
https://YOUR_USERNAME.github.io/whalewaveic
```

## Step 3: Configure Contact Form (1 minute)

### Option 1: FormSubmit (Easiest - Free Forever)

1. Open [index.html](index.html) in a text editor
2. Find line ~374: `<form id="contact-form"`
3. Update to:
   ```html
   <form id="contact-form" action="https://formsubmit.co/contact@whalewaveic.com" method="POST">
   ```
4. Save and push changes:
   ```bash
   git add index.html
   git commit -m "Configure contact form"
   git push
   ```
5. Submit the form once to confirm your email
6. Done! ✅

### Option 2: Web3Forms (250 submissions/month free)

1. Visit [web3forms.com](https://web3forms.com/)
2. Sign up and get your access key
3. Open [js/form.js](js/form.js)
4. Update config (around line 15):
   ```javascript
   const config = {
     enableSubmission: true,
     submitEndpoint: 'https://api.web3forms.com/submit',
     // ...
   };
   ```
5. Open [index.html](index.html)
6. Add after line 379 (inside the form):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
7. Save and push changes

## That's It! 🎉

Your modern website is now live!

## Optional: Add Your Logo

1. Download your logo (currently loading from external URL)
2. Optimize it (convert to SVG or compress PNG)
3. Save to `/assets/images/logo.svg` or `logo.png`
4. Update references in [index.html](index.html):
   - Line 66: Navigation logo
   - Line 563: Footer logo

## Need Help?

- 📖 **Full Documentation**: See [IMPLEMENTATION.md](IMPLEMENTATION.md)
- 📝 **Project Info**: See [README.md](README.md)
- 📧 **Contact**: contact@whalewaveic.com

## Customization

### Change Colors
Edit [css/variables.css](css/variables.css):
```css
--color-primary: #0066FF;  /* Change to your brand color */
```

### Update Content
Edit [index.html](index.html):
- Company information
- Service descriptions
- Contact details

### Adjust Animations
Edit [css/animations.css](css/animations.css) or [js/animations.js](js/animations.js)

## Checklist

Before going live, verify:

- [ ] Website works locally
- [ ] All animations smooth
- [ ] Mobile responsive
- [ ] Contact form configured
- [ ] Logo added (optional)
- [ ] Content reviewed
- [ ] Links work
- [ ] No console errors

## Performance Tips

Run Lighthouse audit in Chrome DevTools:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Target: 90+ on all metrics ✅

---

**Questions?** Check [IMPLEMENTATION.md](IMPLEMENTATION.md) for detailed instructions!
