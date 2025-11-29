# SillyTavern Extension: AI Long-Term Journal & Preferences

This extension adds a UI panel to SillyTavern to view and manage AI memory and preferences. The AI can log entries using special commands in its responses:

- `/prefrences "the user likes coffee"` — logs a preference (AI only)
- `/memory "first encounter with user"` — logs a significant memory (AI only)

## Installation

1. Copy the `sillytavern-memory-extension` folder into your SillyTavern `public/extensions/` directory.
2. Restart SillyTavern.
3. Go to the Extensions menu in SillyTavern and enable "AI Long-Term Journal & Preferences".
4. A new button will appear in the menu bar. Click it to open the panel and view the AI's journal and preferences.

## Data Storage

All entries are saved in your browser's local SillyTavern extension settings. No server or file storage is used.
