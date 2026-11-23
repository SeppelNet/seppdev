/* SeppDev – Darstellung: Hell/Dunkel/Auto und Akzentfarbe, gespeichert im Browser */
(function () {
  var ACCENTS = [
    ['Blau', '#167CE0'], ['Grün', '#1f9d6b'], ['Orange', '#e0701a'], ['Rot', '#d64545'],
    ['Violett', '#7c5cd6'], ['Pink', '#d6479a'], ['Türkis', '#12a3b4'], ['Gold', '#b98a0a']
  ];
  var root = document.documentElement;
  function get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var mode = get('sd-mode', 'auto');
  var accent = get('sd-accent', ACCENTS[0][1]);
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function apply() {
    var dark = mode === 'dark' || (mode === 'auto' && mq && mq.matches);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.style.setProperty('--accent', accent);
  }
  apply();
  if (mq && mq.addEventListener) mq.addEventListener('change', apply);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.className = 'look-toggle'; btn.type = 'button';
    btn.setAttribute('aria-label', 'Darstellung ändern'); btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '◐';

    var panel = document.createElement('div');
    panel.className = 'look-panel'; panel.hidden = true;
    panel.innerHTML = '<h2>Darstellung</h2><div class="row"></div><h2>Farbe</h2><div class="swatches"></div>';

    var row = panel.querySelector('.row'), sw = panel.querySelector('.swatches');
    [['light', 'Hell'], ['dark', 'Dunkel'], ['auto', 'Wie Gerät']].forEach(function (m) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = m[1]; b.dataset.mode = m[0];
      b.addEventListener('click', function () { mode = m[0]; set('sd-mode', mode); apply(); mark(); });
      row.appendChild(b);
    });
    ACCENTS.forEach(function (a) {
      var b = document.createElement('button'); b.type = 'button'; b.style.background = a[1];
      b.setAttribute('aria-label', a[0]); b.dataset.color = a[1];
      b.addEventListener('click', function () { accent = a[1]; set('sd-accent', accent); apply(); mark(); });
      sw.appendChild(b);
    });
    function mark() {
      row.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === mode)); });
      sw.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.color === accent)); });
    }
    mark();
    btn.addEventListener('click', function () {
      panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', String(!panel.hidden));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
    document.body.appendChild(panel); document.body.appendChild(btn);
  });
})();
