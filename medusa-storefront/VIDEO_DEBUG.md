# Video Background Debugging Guide

## Current Status

The video background component has been implemented, but there are important browser compatibility issues to be aware of.

## File Location

The video file should be located at:
```
medusa-storefront/public/videos/granola-manufacturing.mov
```

## Browser Compatibility Issue

**CRITICAL**: `.mov` files (QuickTime format) are **NOT supported** by:
- ❌ Google Chrome
- ❌ Mozilla Firefox  
- ❌ Microsoft Edge
- ✅ Safari (macOS/iOS) - **ONLY browser that supports .mov**

## Testing the Video

### Option 1: Test Page
Visit: `http://localhost:8000/[countryCode]/contract-manufacturing/video-test`

This test page will show:
- Whether the file exists (HTTP check)
- Video loading status
- Browser format support
- Error messages
- Manual play/pause controls

### Option 2: Browser Console
1. Open the contract manufacturing page
2. Open browser DevTools (F12)
3. Check the Console tab for:
   - "Video loaded successfully" - File found and loaded
   - "Video failed to load or format not supported" - Format issue
   - Video error codes and messages

### Option 3: Network Tab
1. Open DevTools → Network tab
2. Filter by "Media" or search for "granola-manufacturing"
3. Check if the file loads (200 status) or fails (404/403)

## Solution: Convert to MP4

To make the video work in **all browsers**, convert the `.mov` file to `.mp4`:

### Using FFmpeg (Command Line)
```bash
ffmpeg -i "granola movie.mov" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k "granola-manufacturing.mp4"
```

### Using HandBrake (GUI)
1. Download HandBrake (free)
2. Open the .mov file
3. Select "Fast 1080p30" preset
4. Export as .mp4

### After Conversion
1. Place the MP4 file in: `medusa-storefront/public/videos/granola-manufacturing.mp4`
2. Update the video component to include both formats:
```tsx
<source src="/videos/granola-manufacturing.mp4" type="video/mp4" />
<source src="/videos/granola-manufacturing.mov" type="video/quicktime" />
```

## Current Component Features

The video background component:
- ✅ Automatically plays on load (if browser allows)
- ✅ Loops continuously
- ✅ Muted (required for autoplay)
- ✅ Handles errors gracefully
- ✅ Shows gradient overlay even if video fails
- ✅ Logs diagnostic information to console

## Z-Index Layers

The hero section has these layers (bottom to top):
1. **Video** (z-index: 0) - Background video
2. **Gradient Overlay** (z-index: 1) - Orange gradient for text readability
3. **Decorative Elements** (z-index: 0, opacity: 10%) - Blur circles
4. **Content** (z-index: 10) - Text and buttons

## Troubleshooting

### Video not visible
1. Check browser console for errors
2. Verify file exists at `/videos/granola-manufacturing.mov`
3. Check if browser supports QuickTime format (Safari only)
4. Try the test page to see detailed diagnostics

### Video loads but doesn't play
- Browser may have blocked autoplay
- Try clicking anywhere on the page (triggers play on interaction)
- Check browser autoplay settings

### 404 Error
- File not found in public/videos directory
- Restart Next.js dev server after adding file
- Check file name matches exactly (case-sensitive)

## Next Steps

1. **Immediate**: Test in Safari to confirm video works
2. **Recommended**: Convert video to MP4 for cross-browser support
3. **Optional**: Add WebM format for even better compression










