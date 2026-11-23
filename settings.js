/* SeppDev – Einstellungsseite: baut die Bedienelemente und schreibt über window.SD */
(function () {
  var SD = window.SD;
  if (!SD) return;
  var host = document.getElementById('settings');
  if (!host) return;

  var GROUPS = [
    { key: 'mode', title: 'Hell oder dunkel', opts: [['light', 'Hell'], ['dark', 'Dunkel'], ['auto', 'Wie Gerät']] },
    { key: 'family', title: 'Farbe', swatches: true },
    { key: 'tone', title: 'Ton der Farbe', opts: SD.TONES },
    { key: 'size', title: 'Schriftgröße', opts: [['s', 'Klein'], ['m', 'Normal'], ['l', 'Groß'], ['xl', 'Sehr groß']] },
    { key: 'font', title: 'Schriftart', opts: [['default', 'Standard'], ['system', 'System'], ['serif', 'Mit Serifen']] },
    { key: 'radius', title: 'Ecken', opts: [['s', 'Eckig'], ['m', 'Normal'], ['l', 'Rund']] },
    { key: 'space', title: 'Abstände', opts: [['s', 'Kompakt'], ['m', 'Normal'], ['l', 'Luftig']] },
    { key: 'contrast', title: 'Kontrast', opts: [['normal', 'Normal'], ['high', 'Hoch']] }
  ];

  function mark() {
    var st = SD.get();
    host.querySelectorAll('button[data-key]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(st[b.dataset.key] === b.dataset.v));
      if (b.dataset.key === 'family') b.style.background = SD.TABLE[b.dataset.v][st.tone][0][0];
    });
  }

  GROUPS.forEach(function (g) {
    var fs = document.createElement('fieldset');
    fs.className = 'set-group';
    var lg = document.createElement('legend'); lg.textContent = g.title; fs.appendChild(lg);
    var row = document.createElement('div'); row.className = g.swatches ? 'swatches' : 'seg';
    (g.swatches ? SD.FAMILIES : g.opts).forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button'; b.dataset.key = g.key; b.dataset.v = o[0];
      if (g.swatches) { b.setAttribute('aria-label', o[1]); b.title = o[1]; } else { b.textContent = o[1]; }
      b.addEventListener('click', function () { SD.set(g.key, o[0]); mark(); });
      row.appendChild(b);
    });
    fs.appendChild(row);
    host.appendChild(fs);
  });

  var reset = document.getElementById('reset');
  if (reset) reset.addEventListener('click', function () { SD.reset(); mark(); });
  mark();
})();
