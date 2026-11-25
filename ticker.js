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
    s.style.cssText = 'display:flex;flex:none;';
    if (hidden) s.setAttribute('aria-hidden', 'true');
    list.forEach(function (i) {
      var p = document.createElement('span');
      p.className = 'ticker-item';
      p.style.cssText = 'flex:none;white-space:nowrap;padding-right:4rem;';
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
  var st = document.createElement('style');
  st.textContent = '@keyframes ticker-run{to{transform:translateX(-50%)}}';
  document.head.appendChild(st);
  var track = document.createElement('div');
  track.className = 'ticker-track';
  track.style.cssText = 'display:flex;width:max-content;';
  var first = seg(items, false);
  track.appendChild(first);
  track.appendChild(seg(items, true));
  bar.className = 'beta-bar ticker';
  bar.style.cssText = 'overflow:hidden;padding-inline:0;';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Neuigkeiten');
  bar.innerHTML = '';
  bar.appendChild(track);
  var w = first.offsetWidth;
  track.style.animation = 'ticker-run ' + Math.max(20, Math.round(w / 55)) + 's linear infinite';
  bar.addEventListener('mouseenter', function () { track.style.animationPlayState = 'paused'; });
  bar.addEventListener('mouseleave', function () { track.style.animationPlayState = 'running'; });
  bar.addEventListener('focusin', function () { track.style.animationPlayState = 'paused'; });
  bar.addEventListener('focusout', function () { track.style.animationPlayState = 'running'; });
})();
