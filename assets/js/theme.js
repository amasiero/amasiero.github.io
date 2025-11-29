(function () {
    var light = document.getElementById('mm-light');
    var dark = document.getElementById('mm-dark');
    if (!light || !dark) return;

    // persisted: 'light' | 'dark' | null (system default = light here)
    var pref = localStorage.getItem('theme');

    function apply(t) {
        if (t === 'dark') { dark.disabled = false; light.disabled = true; }
        else { dark.disabled = true; light.disabled = false; }
    }

    if (pref === 'dark') apply('dark');
    else if (pref === 'light') apply('light');
    // else keep default (light). If you want system default, see note below.
    window.__applyTheme = apply; // expose for footer toggle
})();

(function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn || !window.__applyTheme) return;

    function systemPrefersDark() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function activeTheme() {
        var saved = localStorage.getItem('theme');           // 'dark' | 'light' | null
        return saved ? saved : (systemPrefersDark() ? 'dark' : 'light');
    }

    function updateLabel(theme) {
        btn.textContent = theme === 'dark' ? '🌙' : '🔆';
    }

    // ---- Utterances sync (works on first load too)
    function syncUtterances(theme) {
        var send = function () {
            var iframe = document.querySelector('iframe.utterances-frame');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(
                    { type: 'set-theme', theme: theme === 'dark' ? 'github-dark' : 'github-light' },
                    'https://utteranc.es'
                );
                return true;
            }
            return false;
        };

        // Try immediately
        if (send()) return;

        // If not ready yet, observe until iframe appears, then send once
        var obs = new MutationObserver(function () {
            if (send()) obs.disconnect();
        });
        obs.observe(document.body, { childList: true, subtree: true });
    }

    // ---- Initial apply + FIRST-LOAD SYNC
    var initial = activeTheme();
    window.__applyTheme(initial);   // make sure CSS links flip appropriately
    updateLabel(initial);
    syncUtterances(initial);        // 🔁 sync Utterances on first load

    // ---- Manual toggle
    btn.addEventListener('click', function () {
        var next = activeTheme() === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        window.__applyTheme(next);
        updateLabel(next);
        syncUtterances(next);         // 🔁 sync on user change
    });

    // Optional: keep in sync with OS if user never set a preference
    if (!localStorage.getItem('theme')) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
            var t = e.matches ? 'dark' : 'light';
            window.__applyTheme(t);
            updateLabel(t);
            syncUtterances(t);
        });
    }
})();