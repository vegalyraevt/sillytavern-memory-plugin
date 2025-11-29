# SillyTavern Extension: AI Long-Term Journal & Preferences

This extension adds a UI panel to SillyTavern to view and manage AI memory and preferences. The AI can log entries using special commands in its responses:

- `/prefrences "the user likes coffee"` — logs a preference (AI only)
- `/memory "first encounter with user"` — logs a significant memory (AI only)


## Installation

1. Place the `sillytavern-memory-extension` folder inside the `public/extensions/third-party/` directory of your SillyTavern install. The full path should be:
   
	`SillyTavern/public/extensions/third-party/sillytavern-memory-extension/`

2. The folder must contain at least `manifest.json` and `index.js`.
3. Restart SillyTavern completely (not just refresh the browser).
4. Go to the Extensions menu in SillyTavern and enable "AI Long-Term Journal & Preferences" under Third-Party Extensions.
5. A new button will appear in the menu bar. Click it to open the panel and view the AI's journal and preferences.

### Troubleshooting

- If you do not see the extension, double-check the folder path and spelling.
- The folder and files must be readable by the server.
- If you see errors in the browser console mentioning your extension, please report them.

## Data Storage

All entries are saved in your browser's local SillyTavern extension settings. No server or file storage is used.
