# Technical Stack

## Core Technologies

- **Platform**: Chrome Extension (Manifest V3)
- **Languages**: Vanilla JavaScript, HTML5, CSS3
- **No Frameworks**: Pure DOM manipulation, no React/Vue/Angular
- **No Build Tools**: No webpack, rollup, or bundlers

## Architecture

- **Content Script**: Injected into Kaonavi pages for DOM interaction
- **Popup**: Extension popup interface for user controls
- **Background**: No background script (stateless design)

## Build System

Simple file copying approach - no compilation or bundling required.

### Common Commands

```bash
# Build extension for distribution
./script/build-chrome-extension.sh

# Generate icons (if needed)
./script/generate-icons.sh

# Resize screenshots
./script/resize-to-1280x800.sh
```

### Development Workflow

1. Make changes to source files
2. Run build script to copy files to `build/` directory
3. Load unpacked extension in Chrome from `build/` folder
4. Test on Kaonavi evaluation pages

## Key Dependencies

- Chrome Extensions API (scripting, activeTab permissions)
- Native browser APIs (clipboard, file download)
- No external JavaScript libraries

## Browser Compatibility

- Chrome/Chromium only (Manifest V3)
- Requires scripting and activeTab permissions