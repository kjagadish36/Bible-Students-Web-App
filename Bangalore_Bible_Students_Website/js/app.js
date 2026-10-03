/* =====================================================================
   THE BANGALORE BIBLE STUDENTS — SITE LOGIC
   ---------------------------------------------------------------------
   You normally do NOT need to edit this file. Content is in content.js,
   looks are in style.css. This file is split into numbered sections:

     1. Setup & helpers          7. Announcements
     2. Draft preview (admin)    8. Site search
     3. Language switching       9. Light / dark mode
     4. Tabs (page switching)   10. Header, loader, scroll effects
     5. Books                   11. Start-up
     6. Sermons (filters, pages, auto-limit to 100, video player)
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. SETUP & HELPERS ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = document.documentElement;
  root.classList.add('js');                         // enables fade-in animations

  // Language codes used everywhere: en, kn (Kannada), ta (Tamil), hi (Hindi)
  const LANGS = ['en', 'kn', 'ta', 'hi'];
  const T_INDEX = { kn: 0, ta: 1, hi: 2 };          // position inside translations.js arrays
  let lang = localStorage.getItem('bbs_lang') || 'en';

  // Escape text before putting it into HTML (protects against broken/unsafe input)
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));


  /* ---------- 2. DRAFT PREVIEW ----------
     The admin page can save unpublished edits in this browser. If a draft
     exists we show it (with a gold bar at the bottom) – visitors on other
     computers always see the published content.js. */
  if (Array.isArray(window.NEW_SERMONS) && window.CONTENT) window.CONTENT.sermons = window.NEW_SERMONS.concat(window.CONTENT.sermons);
  let DATA = window.CONTENT;
  try {
    const draft = JSON.parse(localStorage.getItem('bbs_draft') || 'null');
    if (draft) {
      DATA = draft;
      const bar = document.createElement('div');
      bar.className = 'draft-bar';
      bar.innerHTML = 'Previewing unpublished admin changes. <a href="admin/index.html">Open admin</a><a href="#" id="exitDraft">Exit preview</a>';
      document.body.appendChild(bar);
      $('#exitDraft').onclick = e => { e.preventDefault(); localStorage.removeItem('bbs_draft'); location.reload(); };
    }
  } catch (e) { console.warn('Draft could not be read', e); }
  const S = DATA.settings;


  /* ---------- 3. LANGUAGE SWITCHING ----------
     t("English sentence") → translated sentence from translations.js
     pick({en,kn,ta,hi})   → the right language from a content.js item   */
  const TR = window.TRANSLATIONS || {};
  const t = s => (lang === 'en' || !TR[s]) ? s : (TR[s][T_INDEX[lang]] || s);
  const pick = obj => (obj && typeof obj === 'object') ? (obj[lang] || obj.en || '') : (obj || '');

  // Remember every piece of fixed English text on the page so it can be swapped
  const textNodes = [];
  function collectText() {
    const skip = 'script,style,svg,#bookList,#sermonGrid,#newsList,#results,#tagline,.hero h1,[data-set],.wordmark,.time-langs b';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.parentNode.closest(skip) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    let n;
    while ((n = walker.nextNode())) {
      const key = n.textContent.trim().replace(/\s+/g, ' ');
      if (key && TR[key]) textNodes.push({ node: n, original: n.textContent, key });
    }
    $$('[placeholder]').forEach(el => el.dataset.ph = el.placeholder);
    $$('select option').forEach(o => { if (TR[o.textContent.trim()]) o.dataset.tx = o.textContent.trim(); });
  }

  // Fill in values that come from content.js → settings (times, address, email …)
  function applySettings() {
    $$('[data-set]').forEach(el => {
      const [key, sub] = el.dataset.set.split('.');
      const v = S[key];
      el.textContent = sub ? (v?.[sub] || '') : pick(v);
    });
    $$('[data-map]').forEach(a => { a.href = S.mapLink; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-playlist]').forEach(a => { a.href = S.youtubePlaylist || '#'; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-mapembed]').forEach(f => { if (f.src !== S.mapEmbed) f.src = S.mapEmbed; });
  }

  function applyLanguage() {
    root.lang = lang;
    textNodes.forEach(({ node, original, key }) => {
      node.textContent = lang === 'en' ? original : original.replace(original.trim(), t(key));
    });
    $$('[data-ph]').forEach(el => el.placeholder = t(el.dataset.ph));
    $$('option[data-tx]').forEach(o => o.textContent = t(o.dataset.tx));
    applySettings();
    renderBooks(); renderSpeakers(); renderSermons(); renderNews(); showTagline(); runSearch();
  }


  /* ---------- 4. TABS (PAGE SWITCHING) ----------
     The address bar shows #about, #sermons … and the matching
     <div id="page-about"> is shown. Back/forward buttons work too. */
  const revealer = new IntersectionObserver(entries =>
    entries.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .1 });

  function showPage() {
    const name = (location.hash || '#home').slice(1);
    const page = $('#page-' + name) || $('#page-home');
    $$('.page').forEach(p => p.classList.remove('active'));
    page.classList.add('active');
    document.body.classList.toggle('home', page.id === 'page-home');
    $$('.menu a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + page.id.slice(5)));
    $('#menu').classList.remove('open');
    window.scrollTo(0, 0);
    $$('.reveal', page).forEach(el => { el.classList.remove('in'); revealer.observe(el); });
    setTimeout(() => $$('.reveal', page).forEach(el => el.classList.add('in')), 2500); // safety net
  }


  /* ---------- 5. BOOKS (Studies in the Scriptures) ----------
     Covers are drawn in code (black & gold), so titles are always exact. */
  function cover(b, i) {
    const special = i === 4
      ? '<text x="157" y="150" font-family="Cinzel" font-size="11" fill="url(#gg)" text-anchor="middle" letter-spacing="3">BETWEEN</text>'
      : (/TABERNACLE/.test(b.coverLine1) ? '<text x="157" y="182" font-family="Cormorant Garamond" font-style="italic" font-size="15" fill="url(#gg)" text-anchor="middle">of the “Better Sacrifices”</text>' : '');
    const y2 = i === 4 ? 178 : 163;
    const size = s => s.length > 11 ? 20 : 24;
    const corners = [[37, 25], [277, 25], [37, 425], [277, 425]]
      .map(([x, y]) => `<path d="M${x - 6} ${y}L${x} ${y - 6}L${x + 6} ${y}L${x} ${y + 6}Z" fill="url(#gg)"/>`).join('');
    return `<svg viewBox="0 0 300 450" role="img" aria-label="${esc(b.coverLine1 + ' ' + b.coverLine2)}">
      <rect width="300" height="450" fill="url(#bl)"/><rect width="300" height="450" fill="url(#tx)"/>
      <rect width="16" height="450" fill="#000" opacity=".55"/><rect x="16" width="1" height="450" fill="#D4AE5C" opacity=".5"/>
      <rect x="30" y="18" width="254" height="414" fill="none" stroke="url(#gg)" stroke-width="1.6"/>
      <rect x="37" y="25" width="240" height="400" fill="none" stroke="url(#gg)" stroke-width=".6"/>${corners}
      <text x="157" y="66" font-family="Cinzel" font-size="12" letter-spacing="5" fill="url(#gg)" text-anchor="middle">${esc(b.coverTop)}</text>
      <path d="M107 80h100" stroke="url(#gg)" stroke-width=".8"/>
      <text x="157" y="${i === 4 ? 128 : 132}" font-family="Cinzel" font-weight="600" font-size="${size(b.coverLine1)}" fill="url(#gg)" text-anchor="middle">${esc(b.coverLine1)}</text>${special}
      <text x="157" y="${y2}" font-family="Cinzel" font-weight="600" font-size="${size(b.coverLine2)}" fill="url(#gg)" text-anchor="middle">${esc(b.coverLine2)}</text>
      <g transform="translate(157 262)" fill="none" stroke="url(#gg)" stroke-width="1.2"><circle r="38"/><circle r="31" stroke-width=".6"/>
        <path d="M0-22v44M-14-8h28" stroke-width="3"/><path d="M-60 0h18M42 0h18"/></g>
      <text x="157" y="352" font-family="Cinzel" font-size="10.5" letter-spacing="3" fill="url(#gg)" text-anchor="middle">A HELPING HAND</text>
      <text x="157" y="370" font-family="Cinzel" font-size="10.5" letter-spacing="3" fill="url(#gg)" text-anchor="middle">FOR BIBLE STUDENTS</text>
      <path d="M97 392h120" stroke="url(#gg)" stroke-width=".6"/>
      <text x="157" y="410" font-family="Cormorant Garamond" font-style="italic" font-size="12" fill="#D4AE5C" text-anchor="middle">Studies in the Scriptures</text></svg>`;
  }
  function renderBooks() {
    $('#bookList').innerHTML = DATA.books.map((b, i) => `
      <div class="book reveal in">
        <div class="cover">${cover(b, i)}</div>
        <h4>${esc(pick(b.title))}</h4><small>${esc(pick(b.description))}</small>
        <div class="actions">
          <a href="pdfs/${encodeURI(b.pdf)}" target="_blank" rel="noopener">${t('Read')}</a>
          <a href="pdfs/${encodeURI(b.pdf)}" download>${t('Download')}</a>
        </div>
      </div>`).join('');
  }


  /* ---------- 6. SERMONS ----------
     • Sorted newest first; only the newest settings.maxSermons (100) are kept
       – older ones drop off automatically.
     • Search by title, filter by speaker and type, 9 per page with numbers. */
  const IMAGES = ['images/sermon-thumb-1.jpg', 'images/sermon-thumb-2.jpg', 'images/sermon-thumb-3.jpg'];
  const youtubeId = url => (String(url || '').match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/) || [])[1] || '';

  function buildSermonList() {
    let list = DATA.sermons.slice();
    if (S.demoSermons) {                      // sample data so you can see page numbers
      const base = list.slice();
      for (let i = list.length; i < 130; i++) {
        const s = base[i % base.length], d = new Date(s.date); d.setDate(d.getDate() - 70 * Math.ceil((i + 1) / base.length));
        list.push({ ...s, part: Math.floor(i / base.length) + 1, date: d.toISOString().slice(0, 10) });
      }
    }
    list.sort((a, b) => b.date.localeCompare(a.date));
    return list.slice(0, S.maxSermons || 100);           // ← the 100-sermon limit
  }
  const SERMONS = buildSermonList();
  let filtered = SERMONS, page = 1;

  const sermonTitle = s => pick(s.title) + (s.part ? ` — ${t('Part')} ${s.part}` : '');
  const niceDate = d => new Date(d).toLocaleDateString({ en: 'en-IN', kn: 'kn-IN', ta: 'ta-IN', hi: 'hi-IN' }[lang], { day: 'numeric', month: 'short', year: 'numeric' });

  function renderSpeakers() {
    const sel = $('#speakerFilter'), keep = sel.value;
    const names = [...new Map(SERMONS.map(s => [s.speaker.en, s.speaker])).entries()];   // unique speakers
    sel.innerHTML = `<option value="">${t('All Speakers')}</option>` +
      names.map(([en, sp]) => `<option value="${esc(en)}">${esc(pick(sp))}</option>`).join('');
    sel.value = keep;
  }
  function filterSermons() {
    const q = $('#sermonSearch').value.toLowerCase().trim(), sp = $('#speakerFilter').value, ty = $('#typeFilter').value;
    filtered = SERMONS.filter(s =>
      (!q || sermonTitle(s).toLowerCase().includes(q) || LANGS.some(l => (s.title[l] || '').toLowerCase().includes(q)) || (s.scripture || '').toLowerCase().includes(q)) &&
      (!sp || s.speaker.en === sp) && (!ty || s.type === ty));
    page = 1; renderSermons();
  }
  function renderSermons() {
    const per = S.sermonsPerPage || 9, pages = Math.ceil(filtered.length / per);
    const items = filtered.slice((page - 1) * per, page * per);
    $('#sermonGrid').innerHTML = items.map((s, i) => {
      const id = youtubeId(s.youtube);
      const img = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : IMAGES[(i + page) % 3];
      return `<div class="sermon" data-yt="${id}" data-slides="${esc(s.slides || '')}">
        <div class="thumb" style="background-image:url('${img}')"><span class="date">${niceDate(s.date)}</span></div>
        <div class="body"><h3>${esc(sermonTitle(s))}</h3>${s.scripture ? `<div class="scripture">📖 ${esc(s.scripture)}</div>` : ''}<div class="speaker">${esc(pick(s.speaker))}</div>
          <div class="chips"><span>${t(s.type)}</span><span>${t('Sunday Service')}</span></div>
          <div class="sermon-actions">
            ${id ? `<a href="${esc(s.youtube)}" target="_blank" rel="noopener" data-media="video">▶ ${t('Watch Video')}</a>` : ''}
            ${s.slides ? `<a href="${esc(s.slides)}" target="_blank" rel="noopener" data-media="slides">▣ ${t('PowerPoint Slides')}</a>`: ''}
          </div></div></div>`;
    }).join('') || `<p style="grid-column:1/-1;text-align:center;color:var(--muted)">${t('No sermons found.')}</p>`;

    // Page numbers: ‹ 1 2 3 4 5 … 12 ›
    let h = '';
    if (pages > 1) {
      h += `<a data-p="${Math.max(1, page - 1)}">‹</a>`;
      let gap = false;                                    // show "…" once per skipped run
      for (let i = 1; i <= pages; i++) {
        if (i <= 5 || i === pages || Math.abs(i - page) <= 1) { h += `<a data-p="${i}" class="${i === page ? 'on' : ''}">${i}</a>`; gap = false; }
        else if (!gap) { h += '<a>…</a>'; gap = true; }
      }
      h += `<a data-p="${Math.min(pages, page + 1)}">›</a>`;
    }
    $('#pager').innerHTML = h;
  }
  function openSermon(card) {
    const id = card.dataset.yt;
    if (id) window.open('https://www.youtube.com/watch?v=' + id, '_blank', 'noopener');
    else alert(t('Video link coming soon.'));
  }



  /* ---------- 7. ANNOUNCEMENTS ---------- */
  function renderNews() {
    const list = DATA.announcements.slice().sort((a, b) => a.date.localeCompare(b.date));
    $('#newsList').innerHTML = list.map(a => {
      const d = new Date(a.date);
      const mon = d.toLocaleDateString({ en: 'en-IN', kn: 'kn-IN', ta: 'ta-IN', hi: 'hi-IN' }[lang], { month: 'short', year: 'numeric' });
      return `<div class="news-item reveal in"><div class="news-date"><b>${d.getDate()}</b><span>${mon}</span></div>
        <div><h3>${esc(pick(a.title))}</h3><p>${esc(pick(a.text))}</p></div></div>`;
    }).join('');
  }


  /* ---------- 8. SITE SEARCH (the ⌕ button) ---------- */
  function runSearch() {
    const q = $('#searchInput').value.toLowerCase().trim(), out = $('#results');
    if (!q) { out.innerHTML = ''; return; }
    const hit = obj => LANGS.some(l => (obj?.[l] || '').toLowerCase().includes(q));
    const res = [
      ...DATA.books.filter(b => hit(b.title)).map(b => [t('Book'), pick(b.title), 'studies']),
      ...SERMONS.filter(s => hit(s.title) || hit(s.speaker) || (s.scripture || '').toLowerCase().includes(q)).slice(0, 8).map(s => [t('Sermon'), sermonTitle(s) + ' · ' + pick(s.speaker), 'messages']),
      ...DATA.announcements.filter(a => hit(a.title) || hit(a.text)).map(a => [t('News'), pick(a.title), 'events'])
    ];
    out.innerHTML = res.map(r => `<a data-go="${r[2]}"><small>${esc(r[0])}</small>${esc(r[1])}</a>`).join('')
      || `<p style="color:var(--muted)">${t('No results.')}</p>`;
  }


  /* ---------- 9. LIGHT / DARK MODE ---------- */
  const savedTheme = localStorage.getItem('bbs_theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  $('#themeSwitch').onclick = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('bbs_theme', root.dataset.theme);
  };


  /* ---------- 10. HEADER, LOADER, SCROLL EFFECTS ---------- */
  // Home title: letters rise one by one, but each WORD is kept together
  const h1 = $('.hero h1');
  let n = 0;
  h1.innerHTML = h1.textContent.trim().split(' ').map(w =>
    `<span class="word">${[...w].map(c => `<span class="ch" style="animation-delay:${(.35 + n++ * .035).toFixed(2)}s">${c}</span>`).join('')}</span>`
  ).join(' ');

  // Rotating taglines under the church name
  let tagIndex = 0;
  function showTagline() { $('#tagline').innerHTML = `<span>${esc(pick(DATA.taglines[tagIndex]))}</span>`; }
  setInterval(() => { tagIndex = (tagIndex + 1) % DATA.taglines.length; showTagline(); }, 5000);

  window.addEventListener('scroll', () => {
    $('#header').classList.toggle('solid', scrollY > 60);
    const max = document.documentElement.scrollHeight - innerHeight;
    $('#progress').style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    $('#toTop').classList.toggle('show', scrollY > 600);
  });
  $('#toTop').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('hide'), 400));
  setTimeout(() => $('#loader').classList.add('hide'), 2500);


  /* ---------- 11. START-UP: connect buttons and draw everything ---------- */
  $('#burger').onclick = () => $('#menu').classList.toggle('open');
  $('#searchBtn').onclick = () => { $('#search').classList.add('open'); $('#searchInput').focus(); };
  $('#searchClose').onclick = () => $('#search').classList.remove('open');
  $('#searchInput').oninput = runSearch;
  $('#results').onclick = e => { const a = e.target.closest('[data-go]'); if (a) { $('#search').classList.remove('open'); location.hash = a.dataset.go; } };
  $('#sermonSearch').oninput = filterSermons;
  $('#speakerFilter').onchange = filterSermons;
  $('#typeFilter').onchange = filterSermons;
  $('#pager').onclick = e => { const a = e.target.closest('[data-p]'); if (a) { page = +a.dataset.p; renderSermons(); $('#sermonGrid').scrollIntoView({ behavior: 'smooth', block: 'center' }); } };
  $('#sermonGrid').onclick = e => { if (e.target.closest('[data-media]')) return; const c = e.target.closest('.sermon'); if (c) openSermon(c); };
  $('#playerClose').onclick = () => { $('#player').classList.remove('open'); $('#playerFrame').innerHTML = ''; };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('#search').classList.remove('open'); $('#playerClose').click(); } });
  $('#contactForm').onsubmit = e => {
    e.preventDefault();
    // NOTE: to receive messages by email, connect a free form service (see README → "Contact form").
    e.target.innerHTML = `<h3 style="font-size:2.3rem">${t('Thank you.')}</h3><p style="color:var(--muted)">${t('We will be in touch soon.')}</p>`;
  };
  $$('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });   // outside links open in a new tab

  const langSel = $('#lang');
  langSel.value = lang;
  langSel.onchange = () => { lang = langSel.value; localStorage.setItem('bbs_lang', lang); applyLanguage(); };

  collectText();
  applyLanguage();
  window.addEventListener('hashchange', showPage);
  showPage();
})();
