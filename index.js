// SillyTavern UI Extension: AI Long-Term Journal & Preferences
// This extension adds a UI panel to view and manage AI memory and preferences.

let extensionSettings = {
    preferences: [],
    memories: []
};

function saveSettings() {
    SillyTavern.getContext().extensionSettings['sillytavern-memory-extension'] = extensionSettings;
    SillyTavern.getContext().saveSettingsDebounced();
}

function loadSettings() {
    const ctx = SillyTavern.getContext();
    if (ctx.extensionSettings['sillytavern-memory-extension']) {
        extensionSettings = ctx.extensionSettings['sillytavern-memory-extension'];
    }
}

function addEntry(type, entry) {
    const date = new Date().toISOString();
    if (type === 'preferences') {
        extensionSettings.preferences.push({ date, entry });
    } else if (type === 'memories') {
        extensionSettings.memories.push({ date, entry });
    }
    saveSettings();
    renderPanel();
}

function renderPanel() {
    const panel = document.getElementById('memory-extension-panel');
    if (!panel) return;
    panel.innerHTML = `
      <h2>AI Journal & Preferences</h2>
      <div style="margin-bottom:1em;">
        <strong>Preferences</strong>
        <ul>${extensionSettings.preferences.map(e => `<li><span style='color:#888;'>${e.date}:</span> ${e.entry}</li>`).join('') || '<li><em>No preferences yet.</em></li>'}</ul>
      </div>
      <div>
        <strong>Memories</strong>
        <ul>${extensionSettings.memories.map(e => `<li><span style='color:#888;'>${e.date}:</span> ${e.entry}</li>`).join('') || '<li><em>No memories yet.</em></li>'}</ul>
      </div>
    `;
}

function openPanel() {
    let panel = document.getElementById('memory-extension-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'memory-extension-panel';
        panel.style = 'position:fixed;top:10%;right:10px;width:350px;max-width:90vw;z-index:9999;background:#fff;border:1px solid #aaa;padding:1em;border-radius:8px;box-shadow:0 2px 12px #0002;max-height:80vh;overflow:auto;';
        document.body.appendChild(panel);
    }
    renderPanel();
}

function closePanel() {
    const panel = document.getElementById('memory-extension-panel');
    if (panel) panel.remove();
}

function hookAIResponses() {
    const ctx = SillyTavern.getContext();
    ctx.eventSource.on(ctx.event_types.CHARACTER_MESSAGE_RENDERED, (data) => {
        const message = data?.mes || '';
        // Only let the AI add entries
        const prefMatch = message.match(/\/prefrences\s+"([^"]+)"/i);
        if (prefMatch) addEntry('preferences', prefMatch[1]);
        const memMatch = message.match(/\/memory\s+"([^"]+)"/i);
        if (memMatch) addEntry('memories', memMatch[1]);
    });
}

function addMenuButton() {
    const btn = document.createElement('button');
    btn.innerText = 'AI Journal & Preferences';
    btn.style = 'margin-left:8px;';
    btn.onclick = openPanel;
    document.querySelector('#menu-bar')?.appendChild(btn);
}

(function() {
    loadSettings();
    hookAIResponses();
    addMenuButton();
})();
