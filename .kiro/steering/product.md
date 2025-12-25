# Product Overview

Kao-Saver is a Chrome extension that helps users backup and restore evaluation data from Kaonavi (Japanese HR evaluation system).

## Core Functionality

- **Export**: Extract evaluation form data as JSON (clipboard or file download)
- **Import**: Bulk populate evaluation forms from JSON data
- **React Compatibility**: Properly triggers React state updates during import

## Target Use Case

- Backup evaluation data before submission
- Bulk edit evaluations in external editors
- Restore data if browser crashes or session expires
- Transfer evaluation data between different sessions

## Technical Approach

- Content script injection to interact with Kaonavi web pages
- DOM manipulation to extract/populate textarea elements
- JSON-based data format with element IDs as keys
- Popup interface for user interactions