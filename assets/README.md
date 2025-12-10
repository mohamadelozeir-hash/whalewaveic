# Assets Directory

This directory contains all static assets for the WhaleWaveIC website.

## Directory Structure

```
assets/
├── images/          # Images and photos
│   ├── logo.svg     # Company logo (currently loading from external URL)
│   └── favicon-*.png # Favicon files
└── icons/           # SVG icons for services
```

## Current Setup

### Logo
The website currently loads the logo directly from the original WhaleWaveIC server:
```
https://img1.wsimg.com/isteam/ip/c8a42bc2-dd8a-4d50-a3c0-7f10bfbe77c3/Projet%20Studio%20(1).png
```

For production use, you should:
1. Download the logo from the URL above
2. Optimize it for web (convert to SVG if possible, or use WebP/PNG)
3. Save it to `/assets/images/logo.svg` or `/assets/images/logo.png`
4. Update the references in:
   - [index.html:66](../index.html#L66) - Main navigation logo
   - [index.html:563](../index.html#L563) - Footer logo

### Service Icons
The website uses inline SVG icons for services. These are already embedded in the HTML for performance.

If you want to externalize them:
1. Create individual SVG files in `/assets/icons/`
2. Name them: `transmitter.svg`, `power.svg`, `passive.svg`, `bist.svg`
3. Update the HTML to reference them with `<img>` tags

### Favicon
To add a favicon:

1. Create favicon images in multiple sizes:
   - 16x16, 32x32 (for browsers)
   - 180x180 (for iOS)
   - 192x192, 512x512 (for Android/PWA)

2. Use a favicon generator (e.g., [favicon.io](https://favicon.io/))

3. Place files in `/assets/images/`:
   ```
   favicon-16x16.png
   favicon-32x32.png
   apple-touch-icon.png (180x180)
   favicon.ico
   ```

4. The HTML already has the correct `<link>` tags (lines 31-33)

## Optimization Tips

### Images
- Use WebP format for photos with PNG/JPG fallback
- Compress images with tools like:
  - [TinyPNG](https://tinypng.com/)
  - [Squoosh](https://squoosh.app/)
  - ImageOptim (Mac)
- Target < 500KB per image
- Use responsive images with `srcset` for different screen sizes

### Icons
- Use SVG for icons (infinitely scalable)
- Optimize SVGs with [SVGOMG](https://jakearchibald.github.io/svgomg/)
- Inline critical icons in HTML (already done)
- Lazy-load non-critical icons

### Logo
- SVG is preferred (scalable, small file size)
- If using PNG, create 2x version for retina displays
- Ensure transparent background
- Compress with lossless compression

## Adding New Assets

### Images
```bash
# Add to assets/images/
cp your-image.jpg /Users/projects/Documents/whalewaveic/assets/images/

# Reference in HTML
<img src="assets/images/your-image.jpg" alt="Description">
```

### Icons
```bash
# Add to assets/icons/
cp your-icon.svg /Users/projects/Documents/whalewaveic/assets/icons/

# Reference in HTML
<img src="assets/icons/your-icon.svg" alt="Icon description">
```

## License
All assets should be either:
- Created by/for WhaleWaveIC
- Licensed for commercial use
- Open source/Creative Commons (with attribution if required)
