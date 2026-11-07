// Minimal portfolio: two sheets (projects, about) over a static hero. No libraries.
// Motion is CSS transitions driven by classes; JS only toggles state, reveals on scroll and
// runs the number counters. Deep links: #projects, #projects/<id>, #about.
import { PROJECTS } from './projects.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pad = n => String(n).padStart(2, '0');

// ---------- project list ----------
const list = $('#plist');
$('#pcount').textContent = `(${pad(PROJECTS.length)})`;

// "20M", "+197", "97.9%", "0.18" → animated counter; anything else is shown as written
const counter = (v, unit) => `<span class="stat-v"><span class="n" data-to="${esc(v)}">${esc(v)}</span>${unit ? `<span class="u">${esc(unit)}</span>` : ''}</span>`;

list.innerHTML = PROJECTS.map((p, i) => `
  <li class="prow" id="p-${p.id}" style="--i:${i}">
    <button class="prow-head" type="button" aria-expanded="false" aria-controls="pd-${p.id}">
      <span class="pnum mono">[${pad(i + 1)}]</span>
      <span><span class="ptitle">${esc(p.title)}</span><span class="ptag mono">[${esc(p.field)}]</span></span>
    </button>
    <p class="pmeta mono">${esc(p.year)} · ${esc(p.city || 'Rome')} · ${esc(p.org)}</p>
    <div class="pdetail" id="pd-${p.id}" role="region" aria-label="${esc(p.title)}">
      <div>${detail(p)}</div>
    </div>
  </li>`).join('');

function detail(p) {
  const links = [
    p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">Code ↗</a>` : '<span class="soon">Code coming soon</span>',
    p.paper ? `<a href="${esc(p.paper)}" target="_blank" rel="noopener">Paper ↗</a>` : '',
  ].join('');
  return `
  <div class="pd">
    <p class="pd-lede" data-reveal>${esc(p.desc)}</p>
    <dl class="pd-meta" data-reveal>
      <div><dt>Project</dt><dd>${esc(p.name)}</dd></div>
      <div><dt>Where</dt><dd>${esc(p.place)} · ${esc(p.year)}</dd></div>
    </dl>

    <h3 class="pd-h" data-reveal>Key contributions</h3>
    <ol class="pd-contrib">${p.contributions.map((c, k) => `
      <li data-reveal><span class="n">${pad(k + 1)}</span><p>${esc(c)}</p></li>`).join('')}
    </ol>

    ${p.headline ? `<p class="pd-headline" data-reveal>${esc(p.headline)}</p>` : ''}
    <div class="pd-stats">${p.stats.map(s => `
      <div class="stat" data-reveal>${counter(s.value, s.unit)}<span class="stat-l">${esc(s.label)}</span></div>`).join('')}
    </div>

    <h3 class="pd-h" data-reveal>Technical specifications</h3>
    <dl class="pd-specs">${p.specs.map(s => `
      <div data-reveal><dt>${esc(s.label)}</dt><dd>${esc(s.text)}</dd></div>`).join('')}
    </dl>

    <h3 class="pd-h" data-reveal>Results &amp; outcomes</h3>
    <ul class="pd-out">${p.outcomes.map(o => `<li data-reveal>${esc(o)}</li>`).join('')}</ul>

    <h3 class="pd-h" data-reveal>Tools &amp; methods</h3>
    <div class="pd-tools">${p.tools.map(g => `
      <div class="tool-group"><span>${esc(g.label)}</span>
        <div class="pills" data-reveal>${g.items.map(t => `<span title="${esc(t.use)}">${esc(t.name)}</span>`).join('')}</div>
      </div>`).join('')}
    </div>

    ${p.closing ? `<p class="pd-closing" data-reveal>${esc(p.closing)}</p>` : ''}
    <div class="pd-links" data-reveal>${links}</div>
  </div>`;
}

// stagger index for every pill group (CSS reads --i)
document.querySelectorAll('.pills').forEach(g => [...g.children].forEach((s, k) => s.style.setProperty('--i', k)));

// ---------- counters: count up when a stat enters, back down when it leaves ----------
const parseNum = raw => {
  const m = raw.match(/^([<>+]?)(-?\d+(?:\.\d+)?)(.*)$/);
  return m ? { pre: m[1], to: parseFloat(m[2]), dec: (m[2].split('.')[1] || '').length, suf: m[3] } : null;
};
function run(el, target) {
  const spec = el._spec ||= parseNum(el.dataset.to);
  if (!spec) return;
  cancelAnimationFrame(el._raf);
  const from = el._val ?? 0, t0 = performance.now(), dur = REDUCED ? 0 : (target ? 1400 : 700);
  const step = now => {
    const k = dur ? Math.min(1, (now - t0) / dur) : 1;
    const e = 1 - Math.pow(1 - k, 4);                                   // ease-out quart
    el._val = from + (target - from) * e;
    el.textContent = spec.pre + el._val.toFixed(spec.dec) + spec.suf;
    if (k < 1) el._raf = requestAnimationFrame(step);
  };
  el._raf = requestAnimationFrame(step);
}

// ---------- reveal on scroll (both directions) inside the scrolling sheets ----------
const watched = new WeakSet();
function watch(sheet) {
  const io = sheet._io ||= new IntersectionObserver(entries => entries.forEach(en => {
    const el = en.target;
    el.classList.toggle('is-in', en.isIntersecting);
    el.querySelectorAll?.('.n[data-to]').forEach(n => run(n, en.isIntersecting ? n._spec?.to ?? parseNum(n.dataset.to)?.to ?? 0 : 0));
  }), { root: sheet, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  sheet.querySelectorAll('[data-reveal]').forEach(el => {
    if (watched.has(el)) return;
    watched.add(el);
    io.observe(el);
  });
}
document.querySelectorAll('.n[data-to]').forEach(n => { const s = parseNum(n.dataset.to); if (s) { n._spec = s; n._val = 0; n.textContent = s.pre + (0).toFixed(s.dec) + s.suf; } });

// ---------- sheets ----------
const sheets = { projects: $('#projects'), about: $('#about') };
const orb = $('.orb');
const aboutBtn = $('[data-open="about"]');
let current = null;
// About opened while reading a project slides in on top of Projects, which stays open
// underneath: closing About uncovers the same project at the same scroll position, with no
// stop on the home page in between.
let back = null;

function setOrb(state) {
  orb.setAttribute('aria-expanded', String(state !== 'home'));
  orb.querySelector('.orb-label').textContent = { home: 'Projects', open: 'Close', back: 'Back' }[state];
  orb.classList.toggle('is-back', state === 'back');
}

function open(name, { focus = true } = {}) {
  if (current === name) return;
  if (name === 'projects' && back) return close();
  if (current === 'projects' && name === 'about') {
    back = { hash: location.hash || '#projects' };
    sheets.projects.inert = true;
  } else if (current) close({ keepHash: true, instant: true });
  const s = sheets[name];
  s.hidden = false;
  s.scrollTop = 0;
  requestAnimationFrame(() => requestAnimationFrame(() => s.classList.add('is-open')));
  current = name;
  watch(s);
  setOrb(back ? 'back' : 'open');
  aboutBtn.setAttribute('aria-expanded', String(name === 'about'));
  if (focus) setTimeout(() => s.querySelector('button, a')?.focus({ preventScroll: true }), 500);
}
function hide(s, instant) {
  s.classList.remove('is-open');
  setTimeout(() => { if (!s.classList.contains('is-open')) s.hidden = true; }, instant ? 0 : 800);
}
function close({ keepHash = false, instant = false } = {}) {
  if (!current) return;
  if (back) {
    // peel About off; Projects is still there, untouched
    hide(sheets.about, instant);
    sheets.projects.inert = false;
    current = 'projects';
    if (!keepHash) history.replaceState(null, '', back.hash);
    back = null;
    setOrb('open');
    aboutBtn.setAttribute('aria-expanded', 'false');
    orb.focus({ preventScroll: true });
    return;
  }
  hide(sheets[current], instant);
  current = null;
  setOrb('home');
  aboutBtn.setAttribute('aria-expanded', 'false');
  if (!keepHash) history.replaceState(null, '', location.pathname + location.search);
  orb.focus({ preventScroll: true });
}

orb.addEventListener('click', () => {
  if (current) close();
  else { open('projects'); history.replaceState(null, '', '#projects'); }
});
aboutBtn.addEventListener('click', () => {
  if (current === 'about') close();
  else { open('about'); history.replaceState(null, '', '#about'); }
});
addEventListener('keydown', e => { if (e.key === 'Escape' && current) close(); });

// ---------- expand a project in place (one at a time) ----------
function setOpen(row, on, { instant = false } = {}) {
  const d = row.querySelector('.pdetail');
  if (instant) d.style.transition = 'none';
  row.classList.toggle('is-open', on);
  row.querySelector('.prow-head').setAttribute('aria-expanded', String(on));
  if (instant) { void d.offsetHeight; d.style.transition = ''; }
}
function toggle(row, force) {
  const on = force ?? !row.classList.contains('is-open');
  const sheet = sheets.projects;
  if (on) {
    // Another project open? Collapse it at once (it is usually off screen), keeping the clicked
    // row exactly where it was under the pointer. An animated collapse moved the content up
    // while we scrolled, and the reader landed at the end of the project they had just opened.
    const others = [...list.querySelectorAll('.prow.is-open')].filter(r => r !== row);
    if (others.length) {
      const before = row.getBoundingClientRect().top;
      others.forEach(r => setOpen(r, false, { instant: true }));
      sheet.scrollTop += row.getBoundingClientRect().top - before;
    }
    setOpen(row, true);
    history.replaceState(null, '', '#projects/' + row.id.slice(2));
    // the row's own position no longer moves: bring its title under the top bar
    requestAnimationFrame(() => sheet.scrollTo({ top: row.offsetTop - 90, behavior: REDUCED ? 'auto' : 'smooth' }));
  } else {
    setOpen(row, false);
    if (current === 'projects') history.replaceState(null, '', '#projects');
  }
}
list.addEventListener('click', e => {
  const head = e.target.closest('.prow-head');
  if (head) toggle(head.closest('.prow'));
});

// ---------- deep links ----------
function route() {
  const h = location.hash.slice(1);
  if (h === 'about') return open('about', { focus: false });
  if (h.startsWith('projects')) {
    open('projects', { focus: false });
    const row = h.split('/')[1] && document.getElementById('p-' + h.split('/')[1]);
    if (row) setTimeout(() => toggle(row, true), 700);
  }
}
addEventListener('hashchange', route);


// Step response of an underdamped second-order system, drawn across the hero: it rises,
// overshoots a little and settles on the setpoint. One SVG path, recomputed on resize.
function stepLine() {
  const hero = $('.hero');
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'step');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<line class="set"/><path class="resp"/><circle class="dot" r="3.5"/>';
  hero.prepend(svg);
  const set = svg.querySelector('.set'), path = svg.querySelector('.resp'), dot = svg.querySelector('.dot');
  const Z = 0.38, WD = Math.sqrt(1 - Z * Z), T = 15;
  const y = t => 1 - Math.exp(-Z * t) * (Math.cos(WD * t) + (Z / WD) * Math.sin(WD * t));
  let drawn = false;
  function build() {
    const { width: W, height: H } = hero.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const gx = parseFloat(getComputedStyle(hero).paddingLeft);
    const x0 = gx, x1 = W - gx;
    let yb = H * 0.86, ys = H * 0.4;
    // on phones the name sits low and narrow, so tie the curve to it: rise through both lines,
    // settle on the cap line of the first one (the same reading as on desktop)
    const name = $('.name');
    if (W <= 520 && name) {
      const r = name.getBoundingClientRect(), top = hero.getBoundingClientRect().top;
      const fs = parseFloat(getComputedStyle(name).fontSize);
      ys = r.top - top + fs * 0.22;
      const foot = $('.hero-foot');
      yb = (foot ? foot.getBoundingClientRect().top : r.bottom) - top;
    }
    const pts = [];
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * T;
      pts.push(`${(x0 + (t / T) * (x1 - x0)).toFixed(1)},${(yb - y(t) * (yb - ys)).toFixed(1)}`);
    }
    path.setAttribute('d', 'M' + pts.join(' L'));
    set.setAttribute('x1', x0); set.setAttribute('x2', x1); set.setAttribute('y1', ys); set.setAttribute('y2', ys);
    dot.setAttribute('cx', x1); dot.setAttribute('cy', ys);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    if (!drawn) {
      path.style.strokeDashoffset = len;
      dot.style.opacity = 0; set.style.opacity = 0;
    }
  }
  build();
  document.fonts?.ready.then(build);
  addEventListener('resize', () => { drawn = true; build(); });
  return () => {
    if (REDUCED) { path.style.strokeDashoffset = 0; dot.style.opacity = 1; set.style.opacity = ''; drawn = true; return; }
    path.animate([{ strokeDashoffset: path.style.strokeDasharray }, { strokeDashoffset: 0 }], { duration: 2600, easing: 'cubic-bezier(.45,0,.2,1)', fill: 'forwards' })
      .finished.then(() => { path.style.strokeDashoffset = 0; drawn = true; });
    set.animate([{ opacity: 0 }, { opacity: .35 }], { duration: 900, delay: 1400, fill: 'forwards' });
    dot.animate([{ opacity: 0, transform: 'scale(.3)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 500, delay: 2500, fill: 'forwards', easing: 'cubic-bezier(.23,1,.32,1)' });
    dot.style.transformBox = 'fill-box'; dot.style.transformOrigin = 'center';
  };
}
const drawStep = stepLine();

// ---------- hero entrance + the motto resolving like a readout ----------
function scramble(el, dur = 900) {
  if (REDUCED) return;
  const final = el.textContent, G = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const t0 = performance.now();
  const step = now => {
    const k = Math.min(1, (now - t0) / dur), n = Math.floor(k * final.length);
    el.textContent = final.slice(0, n) + [...final.slice(n)].map(c => (c === ' ' ? ' ' : G[(Math.random() * G.length) | 0])).join('');
    if (k < 1) requestAnimationFrame(step); else el.textContent = final;
  };
  requestAnimationFrame(step);
}
Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]).then(() => {
  document.documentElement.classList.add('is-ready');
  setTimeout(() => scramble($('.motto span')), 900);
  setTimeout(drawStep, 500);
  route();
});
