# Project Structure

## Root Files

- `manifest.json` - Chrome extension manifest (Manifest V3)
- `content-script.js` - Main content script injected into Kaonavi pages
- `styles.css` - Global styles for popup interface
- `package.json` - Project metadata (may be incomplete)
- `README.md` - User documentation in Japanese

## Source Code (`src/`)

```
src/
├── html/
│   └── popup.html     # Extension popup interface
└── js/
    └── popup.js       # Popup logic and Chrome API interactions
```

## Assets

```
icons/
├── .gitkeep
└── icon.png          # Extension icon (16x16, 48x48, 128x128)

screenshot/
└── .gitkeep          # Screenshots for documentation
```

## Build & Scripts (`script/`)

- `build-chrome-extension.sh` - Main build script (copies files to build/)
- `generate-icons.sh` - Icon generation utility
- `resize-to-1280x800.sh` - Screenshot resizing utility

## Development Directories

- `docs/` - Documentation (currently empty)
- `lib/` - Libraries (currently empty, no external deps)
- `build/` - Generated build output (not in repo)

## Configuration

- `.kiro/` - Kiro IDE configuration and steering rules
- `.vscode/` - VS Code settings
- `.gitignore` - Git ignore patterns

## File Naming Conventions

- Kebab-case for directories and script files
- Camelcase for JavaScript variables and functions
- Japanese comments and UI text throughout codebase