/* SeppDev – Darstellung: gespeicherte Einstellungen anwenden. Die Einstellungsseite (settings.js) ändert sie. */
(function () {
  /* Farbtabelle aus der App (Accents.kt). Je Ton: [hell, dunkel] mit [strong, onStrong, deep, onDeep, soft]. */
  var TABLE = {"BLUE":{"PASTEL":[["#2F6B93","#FFFFFF","#26516D","#B8D6EA","#E4ECF1"],["#B5D1E3","#091D2A","#1F3747","#B8D6EA","#333D45"]],"STRONG":[["#07619D","#FFFFFF","#074873","#B8D6EA","#DFEAF2"],["#84C2EB","#091D2A","#0E344E","#B8D6EA","#2A3A46"]],"DARK":[["#153F5B","#B8D6EA","#0B2C41","#B8D6EA","#E1E6EA"],["#86AFCB","#091D2A","#09263A","#B8D6EA","#2A3740"]],"NEON":[["#0081D6","#0A0F14","#0065A8","#FFFFFF","#DEEFFA"],["#47B6FF","#091D2A","#034977","#B8D6EA","#1F384A"]]},"TURQUOISE":{"PASTEL":[["#2F9387","#0A0F14","#266D65","#B8EAE4","#E4F1EF"],["#B5E3DD","#092A26","#1F4742","#B8EAE4","#334044"]],"STRONG":[["#079D8A","#092A26","#077366","#FFFFFF","#DFF2F0"],["#84EBDE","#092A26","#0E4E46","#B8EAE4","#2A4144"]],"DARK":[["#155B52","#B8EAE4","#0B413A","#B8EAE4","#E1EAE9"],["#86CBC2","#092A26","#093A34","#B8EAE4","#2A3B3F"]],"NEON":[["#00D6BC","#092A26","#00A893","#092A26","#DEFAF6"],["#47FFE8","#092A26","#037769","#FFFFFF","#1F4546"]]},"GREEN":{"PASTEL":[["#2F9358","#0A0F14","#266D44","#B8EACD","#E4F1E9"],["#B5E3C8","#092A17","#1F4730","#B8EACD","#334040"]],"STRONG":[["#079D45","#0A0F14","#077334","#FFFFFF","#DFF2E7"],["#84EBAF","#092A17","#0E4E28","#B8EACD","#2A413B"]],"DARK":[["#155B32","#B8EACD","#0B4122","#B8EACD","#E1EAE4"],["#86CBA2","#092A17","#093A1D","#B8EACD","#2A3B39"]],"NEON":[["#00D659","#092A17","#00A846","#092A17","#DEFAE9"],["#47FF93","#092A17","#037733","#FFFFFF","#1F4536"]]},"ORANGE":{"PASTEL":[["#93562F","#FFFFFF","#6D4226","#EACCB8","#F1E9E4"],["#E3C7B5","#2A1609","#472F1F","#EACCB8","#3B3B3C"]],"STRONG":[["#9D4207","#FFFFFF","#733207","#EACCB8","#F2E6DF"],["#EBAD84","#2A1609","#4E270E","#EACCB8","#3C3634"]],"DARK":[["#5B3115","#EACCB8","#41210B","#EACCB8","#EAE4E1"],["#CBA186","#2A1609","#3A1C09","#EACCB8","#373434"]],"NEON":[["#D65400","#0A0F14","#A84200","#FFFFFF","#FAE9DE"],["#FF9047","#2A1609","#773103","#EACCB8","#403129"]]},"RED":{"PASTEL":[["#932F2F","#FFFFFF","#6D2626","#EAB8B8","#F1E4E4"],["#E3B5B5","#2A0909","#471F1F","#EAB8B8","#3B383C"]],"STRONG":[["#9D0707","#EAB8B8","#730707","#EAB8B8","#F2DFDF"],["#EB8484","#2A0909","#4E0E0E","#EAB8B8","#3C2F34"]],"DARK":[["#5B1515","#EAB8B8","#410B0B","#EAB8B8","#EAE1E1"],["#CB8686","#2A0909","#3A0909","#EAB8B8","#372F34"]],"NEON":[["#D60000","#FFFFFF","#A80000","#EAB8B8","#FADEDE"],["#FF4747","#2A0909","#770303","#EAB8B8","#402429"]]},"PINK":{"PASTEL":[["#932F56","#FFFFFF","#6D2642","#EAB8CC","#F1E4E9"],["#E3B5C7","#2A0916","#471F2F","#EAB8CC","#3B3840"]],"STRONG":[["#9D0742","#EAB8CC","#730732","#EAB8CC","#F2DFE6"],["#EB84AD","#2A0916","#4E0E27","#EAB8CC","#3C2F3B"]],"DARK":[["#5B1531","#EAB8CC","#410B21","#EAB8CC","#EAE1E4"],["#CB86A1","#2A0916","#3A091C","#EAB8CC","#372F39"]],"NEON":[["#D60054","#FFFFFF","#A80042","#FFFFFF","#FADEE9"],["#FF4790","#2A0916","#770331","#EAB8CC","#402436"]]},"VIOLET":{"PASTEL":[["#4C2F93","#C7B8EA","#3B266D","#C7B8EA","#E8E4F1"],["#C2B5E3","#13092A","#2B1F47","#C7B8EA","#353845"]],"STRONG":[["#32079D","#C7B8EA","#270773","#C7B8EA","#E4DFF2"],["#A284EB","#13092A","#210E4E","#C7B8EA","#2F2F46"]],"DARK":[["#2A155B","#C7B8EA","#1B0B41","#C7B8EA","#E3E1EA"],["#9A86CB","#13092A","#17093A","#C7B8EA","#2E2F40"]],"NEON":[["#3F00D6","#C7B8EA","#3100A8","#C7B8EA","#E6DEFA"],["#7D47FF","#FFFFFF","#250377","#C7B8EA","#29244A"]]},"GREY":{"PASTEL":[["#5A6368","#FFFFFF","#454C4F","#CED2D5","#EAEBEB"],["#C9CDCF","#171A1C","#303436","#CED2D5","#363C41"]],"STRONG":[["#47555C","#CED2D5","#364045","#CED2D5","#E7E9EA"],["#B0BABF","#171A1C","#292F32","#CED2D5","#32383E"]],"DARK":[["#333A3D","#CED2D5","#23272A","#CED2D5","#E5E5E6"],["#A3AAAD","#171A1C","#1E2225","#CED2D5","#2F363B"]],"NEON":[["#5C707A","#FFFFFF","#485860","#CED2D5","#EAECEE"],["#96A7B0","#171A1C","#354045","#CED2D5","#2D353C"]]}};
  var FAMILIES = [["BLUE","Blau"],["TURQUOISE","Türkis"],["GREEN","Grün"],["ORANGE","Orange"],["RED","Rot"],["PINK","Pink"],["VIOLET","Violett"],["GREY","Grau"]];
  var TONES = [['PASTEL', 'Pastell'], ['STRONG', 'Kräftig'], ['DARK', 'Dunkel'], ['NEON', 'Neon']];
  var BASE = {
    light: { bg: '#F4F6F8', surface: '#FFFFFF', ink: '#17202A', muted: '#5C6974', line: '#D3DBE2' },
    dark:  { bg: '#111820', surface: '#161C22', ink: '#E8EDF2', muted: '#9AA7B2', line: '#323D47' }
  };
  var DEFAULTS = { mode: 'auto', family: 'BLUE', tone: 'STRONG', size: 'm', font: 'default', radius: 'm', space: 'm', contrast: 'normal' };
  var SIZES = { s: '93.75%', m: '100%', l: '112.5%', xl: '125%' };
  var RADII = { s: '0', m: '1', l: '1.8' };
  var SPACES = { s: '0.7', m: '1', l: '1.4' };
  var KEY = 'sd-settings';
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function load() {
    var s = {}, k;
    try { s = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { s = {}; }
    var out = {};
    for (k in DEFAULTS) out[k] = s[k] != null ? s[k] : DEFAULTS[k];
    if (!TABLE[out.family]) out.family = DEFAULTS.family;
    if (!TABLE[out.family][out.tone]) out.tone = DEFAULTS.tone;
    return out;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  var state = load();

  function apply() {
    var dark = state.mode === 'dark' || (state.mode === 'auto' && mq && mq.matches);
    var pair = TABLE[state.family][state.tone];
    var cur = pair[dark ? 1 : 0], fill = pair[0];
    var b = BASE[dark ? 'dark' : 'light'];
    var hi = state.contrast === 'high';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.setAttribute('data-font', state.font);
    var s = root.style;
    s.setProperty('--paper', b.bg); s.setProperty('--card', b.surface); s.setProperty('--ink', b.ink);
    s.setProperty('--ink-soft', hi ? b.ink : b.muted);
    s.setProperty('--rule', hi ? 'color-mix(in srgb, ' + b.ink + ' 55%, ' + b.bg + ')' : b.line);
    s.setProperty('--accent', fill[0]); s.setProperty('--on-accent', fill[1]);
    s.setProperty('--accent-ink', cur[0]);
    s.setProperty('--accent-deep', cur[2]); s.setProperty('--on-deep', cur[3]); s.setProperty('--accent-soft', cur[4]);
    s.setProperty('--rs', RADII[state.radius] || '1');
    s.setProperty('--sp', SPACES[state.space] || '1');
    root.style.fontSize = SIZES[state.size] || '100%';
  }
  apply();
  if (mq && mq.addEventListener) mq.addEventListener('change', apply);

  window.SD = {
    TABLE: TABLE, FAMILIES: FAMILIES, TONES: TONES, DEFAULTS: DEFAULTS,
    get: function () { return JSON.parse(JSON.stringify(state)); },
    set: function (key, value) { state[key] = value; if (!TABLE[state.family][state.tone]) state.tone = 'STRONG'; save(state); apply(); },
    reset: function () { state = JSON.parse(JSON.stringify(DEFAULTS)); try { localStorage.removeItem(KEY); } catch (e) {} apply(); }
  };
})();
