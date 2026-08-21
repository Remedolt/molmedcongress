/* Congress site — shared page behavior (countdown, reveal animation,
   theme toggle, mobile nav, form preview handling). Loads after i18n.js. */

/* =========================================================
   Program days (bilingual, built at runtime) — used on program.html
   ========================================================= */
var PROGRAM_DAYS = [
  {tr:'1. Gün',en:'Day 1',date:'23 Aralık 2026 / 23 December 2026'},
  {tr:'2. Gün',en:'Day 2',date:'24 Aralık 2026 / 24 December 2026'},
  {tr:'3. Gün',en:'Day 3',date:'25 Aralık 2026 / 25 December 2026'},
  {tr:'4. Gün',en:'Day 4',date:'26 Aralık 2026 / 26 December 2026'},
  {tr:'5. Gün',en:'Day 5',date:'27 Aralık 2026 / 27 December 2026'}
];
function renderProgramDays(){
  var wrap = document.getElementById('programDays');
  if(!wrap) return;
  wrap.innerHTML = PROGRAM_DAYS.map(function(d){
    return '<div class="card"><div class="icon">'+iconSvg('calendar',23)+'</div><h3>'+(currentLang==='tr'?d.tr:d.en)+' — '+d.date+'</h3><p>10.00 - 17.00</p><p style="color:var(--ink-soft);">'+(I18N.program_session_note[currentLang])+'</p></div>';
  }).join('');
}

/* =========================================================
   Countdown
   ========================================================= */
(function(){
  var el = document.querySelector('[data-countdown]');
  if(!el) return;
  var target = new Date(el.getAttribute('data-countdown')).getTime();
  var prev = { d: null, h: null, m: null, s: null };
  function bump(node){
    if(!node) return;
    node.classList.remove('bump');
    void node.offsetWidth; // restart the CSS animation
    node.classList.add('bump');
  }
  function tick(){
    var diff = target - Date.now();
    var d = Math.max(0,Math.floor(diff/86400000));
    var h = Math.max(0,Math.floor((diff/3600000)%24));
    var m = Math.max(0,Math.floor((diff/60000)%60));
    var s = Math.max(0,Math.floor((diff/1000)%60));
    var dd=el.querySelector('[data-cd-days]'), hh=el.querySelector('[data-cd-hours]'), mm=el.querySelector('[data-cd-minutes]'), ss=el.querySelector('[data-cd-seconds]');
    if(dd && prev.d!==d){ dd.textContent=d; bump(dd); prev.d=d; }
    if(hh && prev.h!==h){ hh.textContent=h; bump(hh); prev.h=h; }
    if(mm && prev.m!==m){ mm.textContent=m; bump(mm); prev.m=m; }
    if(ss && prev.s!==s){ ss.textContent=s; bump(ss); prev.s=s; }
  }
  tick();
  setInterval(tick,1000);
})();

/* =========================================================
   Scroll reveal
   ========================================================= */
function initReveals(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });
}

/* =========================================================
   Theme toggle (light/dark), persisted per-viewer
   ========================================================= */
function currentTheme(){
  var stored = null;
  try{ stored = localStorage.getItem('mm_theme'); }catch(e){}
  return stored;
}
function applyTheme(theme){
  if(theme === 'dark' || theme === 'light'){
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  var isDark = theme === 'dark' || (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var btn = document.getElementById('themeToggle');
  if(btn) btn.innerHTML = iconSvg(isDark ? 'sun' : 'moon', 17);
}
function toggleTheme(){
  var isDarkNow = document.documentElement.getAttribute('data-theme') === 'dark' ||
    (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var next = isDarkNow ? 'light' : 'dark';
  try{ localStorage.setItem('mm_theme', next); }catch(e){}
  applyTheme(next);
}

/* =========================================================
   Mobile nav toggle
   ========================================================= */
function initMobileNav(){
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', function(){ nav.classList.toggle('open'); });
  nav.querySelectorAll('a,button').forEach(function(el){
    if(el.hasAttribute('data-dropdown-toggle')) return; // handled by initNavDropdowns
    el.addEventListener('click', function(){ nav.classList.remove('open'); });
  });
}

/* =========================================================
   Header "Congress" dropdown (Davet / Kurullar / Genel Bilgiler)
   Click-to-open so it works the same on touch and desktop; closes
   on outside click, Escape, or when another dropdown opens.
   ========================================================= */
function initNavDropdowns(){
  var dropdowns = Array.prototype.slice.call(document.querySelectorAll('.nav-dropdown'));
  if(!dropdowns.length) return;

  function closeAll(){
    dropdowns.forEach(function(dd){
      dd.classList.remove('open');
      var t = dd.querySelector('[data-dropdown-toggle]');
      if(t) t.setAttribute('aria-expanded','false');
    });
  }

  dropdowns.forEach(function(dd){
    var toggle = dd.querySelector('[data-dropdown-toggle]');
    if(!toggle) return;
    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      var isOpen = dd.classList.contains('open');
      closeAll();
      if(!isOpen){
        dd.classList.add('open');
        toggle.setAttribute('aria-expanded','true');
      }
    });
  });

  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeAll();
  });
}

/* =========================================================
   Forms (preview-only: client-side validation + success panel).
   No backend is wired in this static bundle — see the note under
   each form. Hook these forms up to your own endpoint to go live.
   ========================================================= */
function wireForm(formId, wrapId, thanksTitleKey, thanksBodyKey){
  var form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var required = form.querySelectorAll('[required]');
    var ok = true;
    required.forEach(function(field){
      if(field.type === 'checkbox' || field.type === 'radio'){
        var group = form.querySelectorAll('[name="'+field.name+'"]');
        var checked = Array.prototype.some.call(group, function(g){ return g.checked; });
        if(!checked) ok = false;
      } else if(!field.value.trim()){
        ok = false;
      }
    });
    var emailField = form.querySelector('input[type=email]');
    if(emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) ok = false;

    if(!ok){
      var existing = form.querySelector('.alert--error');
      if(!existing){
        existing = document.createElement('div');
        existing.className = 'alert alert--error';
        form.prepend(existing);
      }
      existing.textContent = I18N.error_required_fields[currentLang];
      return;
    }

    var wrap = document.getElementById(wrapId);
    wrap.innerHTML = '<div class="success-panel">' +
      '<div class="tick">' + iconSvg('shield',28) + '</div>' +
      '<h2>' + I18N[thanksTitleKey][currentLang] + '</h2>' +
      '<p>' + I18N[thanksBodyKey][currentLang] + '</p>' +
      '<a class="btn btn--primary" href="index.html">' + I18N.back_home[currentLang] + '</a>' +
      '</div>';
  });
}

/* =========================================================
   Boot
   ========================================================= */
document.addEventListener('DOMContentLoaded', function(){
  renderIcons();
  applyTheme(currentTheme());
  applyLang();
  initMobileNav();
  initNavDropdowns();
  initReveals();
  wireForm('kayitForm','kayitFormWrap','thanks_registration_title','thanks_registration_body');
  wireForm('bildiriForm','bildiriFormWrap','thanks_abstract_title','thanks_abstract_body');

  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(){
      if(!currentTheme()) applyTheme(null);
    });
  }
});
