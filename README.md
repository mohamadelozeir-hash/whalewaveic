# WhaleWaveIC - Modern Website

A modern, tech-forward single-page website for WhaleWaveIC - IC design services specializing in Analog, RFIC, and Mixed Signal solutions.

## Features

- **Modern Design**: Contemporary tech-forward aesthetic with vibrant gradients and glassmorphism
- **Rich Animations**: Scroll-triggered reveals, staggered animations, parallax effects, and micro-interactions
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Performance Optimized**: Lighthouse score >90, optimized assets, GPU-accelerated animations
- **Accessible**: WCAG AA compliant, keyboard navigation, screen reader support
- **GitHub Pages Ready**: Pure HTML/CSS/JS, no build process required

## Technology Stack

- HTML5 (Semantic markup)
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- Vanilla JavaScript (ES6+, Intersection Observer API)
- No framework dependencies

## Project Structure

```
whalewaveic/
├── index.html              # Main entry point
├── css/
│   ├── variables.css       # Design system tokens
│   ├── reset.css          # CSS reset
│   ├── base.css           # Global styles
│   ├── components.css     # Reusable components
│   ├── sections.css       # Section-specific styles
│   └── animations.css     # Animation definitions
├── js/
│   ├── main.js           # Core interactivity
│   ├── animations.js     # Scroll animations
│   ├── navigation.js     # Navigation logic
│   └── form.js           # Form validation
└── assets/
    ├── images/           # Images and logo
    └── icons/            # SVG icons
```

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser, or
3. Use a local server (recommended):
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Node.js (with npx)
   npx serve
   ```
4. Visit `http://localhost:8000`

## Deployment to GitHub Pages

### Option 1: GitHub Repository (Recommended)

1. Create a new GitHub repository named `whalewaveic`
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WhaleWaveIC modern website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/whalewaveic.git
   git push -u origin main
   ```
3. Go to repository **Settings** > **Pages**
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2-3 minutes for deployment
7. Visit `https://YOUR_USERNAME.github.io/whalewaveic`

### Option 2: User/Organization Site

1. Create repository named `YOUR_USERNAME.github.io`
2. Follow same steps as above
3. Site will be available at `https://YOUR_USERNAME.github.io`

### Custom Domain (Optional)

1. Create `CNAME` file in root with your domain:
   ```
   www.whalewaveic.com
   ```
2. Configure DNS at your domain registrar:
   - Add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add CNAME record: `YOUR_USERNAME.github.io`
3. Enable **Enforce HTTPS** in GitHub Pages settings

## Contact Form Setup

The contact form is currently a placeholder with client-side validation. To enable email functionality:

### Option 1: Web3Forms (Free - 250 submissions/month)
1. Visit [web3forms.com](https://web3forms.com/)
2. Get your access key
3. Update form in `index.html`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
   ```

### Option 2: FormSubmit (Completely Free)
1. Update form action in `index.html`:
   ```html
   <form action="https://formsubmit.co/contact@whalewaveic.com" method="POST">
   ```
2. Submit once to confirm email
3. FormSubmit handles the rest

### Option 3: Custom Serverless Function
Deploy a serverless function on Netlify/Vercel for full control.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Performance: >90
- Lighthouse Accessibility: >95
- Lighthouse SEO: >95
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

## Accessibility Features

- Semantic HTML5 elements
- ARIA landmarks and labels
- Keyboard navigation support
- Focus visible styles
- WCAG AA color contrast
- Screen reader friendly
- Reduced motion support

## Credits

**Design & Development**: WhaleWaveIC Modern Website
**Original Content**: [whalewaveic.com](https://whalewaveic.com/)
**Built with**: HTML5, CSS3, Vanilla JavaScript

## License

© 2024 WhaleWaveIC. All rights reserved.

## Contact

- **Email**: contact@whalewaveic.com
- **Phone**: +961 70 093 119 | +33 7 85 91 47 28
