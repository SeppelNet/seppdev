/* Laufschrift in der blauen Leiste. Ohne JS oder bei reduzierter Bewegung bleibt die feste Meldung stehen. */
(function () {
  var bar = document.querySelector('.beta-bar');
  if (!bar) return;
  var me = document.currentScript;
  var base = me && me.getAttribute('src') ? me.getAttribute('src').replace(/ticker\.js.*$/, '') : '';
  var items = [
    { b: 'Beta-Test:', t: 'Einsatzbuch – Aufträge & Abrechnung sucht neue Tester.', l: 'Jetzt mitmachen', h: base + 'einsatzbuch/#testen' },
    { b: 'In Arbeit:', t: 'StreckenBuch, das Fahrtenbuch mit optionalen Tankpreisen, ist in Entwicklung.', l: 'Mehr erfahren', h: base + 'streckenbuch/' }
  ];
  function seg(list, hidden) {
    var s = document.createElement('div');
    s.className = 'ticker-seg';
    if (hidden) s.setAttribute('aria-hidden', 'true');
    list.forEach(function (i) {
      var p = document.createElement('span');
      p.className = 'ticker-item';
      var b = document.createElement('strong'); b.textContent = i.b + ' ';
      var t = document.createTextNode(i.t + ' ');
      var a = document.createElement('a'); a.href = i.h; a.textContent = i.l;
      if (hidden) a.tabIndex = -1;
      p.appendChild(b); p.appendChild(t); p.appendChild(a);
      s.appendChild(p);
    });
    return s;
  }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var track = document.createElement('div');
  track.className = 'ticker-track';
  var first = seg(items, false);
  track.appendChild(first);
  track.appendChild(seg(items, true));
  bar.className = 'beta-bar ticker';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Neuigkeiten');
  bar.innerHTML = '';
  bar.appendChild(track);
  var w = first.offsetWidth;
  track.style.animationDuration = Math.max(20, Math.round(w / 55)) + 's';
})();
