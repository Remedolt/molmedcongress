import re, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent

HEAD_TMPL = '''<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="XI. International Congress of Molecular Medicine &amp; I. Multidisciplinary Wellness and Longevity Symposium — 23–27 December 2026, Istanbul Nişantaşı University.">
<link rel="icon" href="assets/img/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<header class="site-header">
  <div class="container">
    <a href="index.html" class="brand" aria-label="MolMed Congress — Home">
      <img src="assets/img/logo.png" alt="Turkish Society of Molecular Medicine">
      <span class="brand-text">
        <strong data-i18n="brand_title"></strong>
        <span>23–27 Aralık / December 2026</span>
      </span>
    </a>
    <div class="mobile-actions">
      <div class="lang-switch lang-switch--mobile">
        <button data-lang-btn="tr" onclick="setLang('tr')">TR</button>
        <button data-lang-btn="en" onclick="setLang('en')">EN</button>
      </div>
      <button class="nav-toggle" type="button" aria-label="Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
    <nav class="main-nav">
      <a href="index.html" class="navlink{home}" data-route="home" data-i18n="nav_home"></a>
      <div class="nav-dropdown">
        <button type="button" class="navlink navlink--dropdown{kongre}" data-dropdown-toggle aria-haspopup="true" aria-expanded="false">
          <span data-i18n="nav_kongre"></span>
          <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="nav-dropdown-menu" role="menu">
          <a href="davet.html" class="navlink{davet}" data-route="davet" data-i18n="nav_davet"></a>
          <a href="kurullar.html" class="navlink{kurullar}" data-route="kurullar" data-i18n="nav_kurullar"></a>
          <a href="genel-bilgiler.html" class="navlink{genel}" data-route="genel" data-i18n="nav_genel"></a>
        </div>
      </div>
      <a href="program.html" class="navlink{program}" data-route="program" data-i18n="nav_program"></a>
      <a href="bildiri.html" class="navlink{bildiri}" data-route="bildiri" data-i18n="nav_bildiri"></a>
      <a href="kayit.html" class="navlink{kayit}" data-route="kayit" data-i18n="nav_kayit"></a>
      <a href="iletisim.html" class="navlink{iletisim}" data-route="iletisim" data-i18n="nav_iletisim"></a>
      <div class="lang-switch">
        <button data-lang-btn="tr" onclick="setLang('tr')">TR</button>
        <button data-lang-btn="en" onclick="setLang('en')">EN</button>
      </div>
      <a href="kayit.html" class="cta">
        <span class="ic" data-icon="ticket" data-size="16"></span>
        <span data-i18n="nav_register_cta"></span>
      </a>
    </nav>
  </div>
</header>
<main id="pages">
'''

FOOTER = '''</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <img src="assets/img/logo.png" alt="Turkish Society of Molecular Medicine">
          <div><strong data-i18n="brand_title"></strong><span>Turkish Society of Molecular Medicine · 1999</span></div>
        </div>
        <p data-i18n-html="footer_line1"></p>
      </div>
      <div>
        <h4 data-i18n="nav_iletisim"></h4>
        <ul>
          <li><span class="ic" data-icon="phone" data-size="16"></span><span>+90 5XX XXX XX XX</span></li>
          <li><span class="ic" data-icon="mail" data-size="16"></span><a href="mailto:info@molmedcongress.com">info@molmedcongress.com</a></li>
          <li><span class="ic" data-icon="globe" data-size="16"></span><span>molmedcongress.com</span></li>
          <li><span class="ic" data-icon="building" data-size="16"></span><span data-i18n="venue_full"></span></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer_quicklinks"></h4>
        <ul>
          <li><a href="davet.html" data-i18n="nav_davet"></a></li>
          <li><a href="kurullar.html" data-i18n="nav_kurullar"></a></li>
          <li><a href="program.html" data-i18n="nav_program"></a></li>
          <li><a href="bildiri.html" data-i18n="nav_bildiri"></a></li>
          <li><a href="kayit.html" data-i18n="nav_kayit"></a></li>
          <li><a href="genel-bilgiler.html" data-i18n="nav_genel"></a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer_follow"></h4>
        <div class="social">
          <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.4 0h4.4v1.9h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 6.9V22h-4.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22H7.6V8z"/></svg></a>
          <a href="#" aria-label="X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h7l4.8 6.3L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.5 3.6 12 3.6 12 3.6s-4.5 0-7.8.3c-.5.1-1.5.1-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.5 0 7.8-.3c.5-.1 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15V8.4l6.1 3.3-6.1 3.3z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span data-i18n="footer_copy"></span>
      <span data-i18n="footer_privacy"></span>
    </div>
  </div>
</footer>
<script src="assets/js/i18n.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>
'''

PAGES = {
  'index': ('MolMed Congress 2026', 'home'),
  'davet': ('Davet — MolMed Congress 2026', 'davet'),
  'kurullar': ('Kurullar — MolMed Congress 2026', 'kurullar'),
  'genel-bilgiler': ('Genel Bilgiler — MolMed Congress 2026', 'genel'),
  'program': ('Bilimsel Program — MolMed Congress 2026', 'program'),
  'bildiri': ('Bildiri Gönderimi — MolMed Congress 2026', 'bildiri'),
  'kayit': ('Kayıt & Konaklama — MolMed Congress 2026', 'kayit'),
  'iletisim': ('İletişim — MolMed Congress 2026', 'iletisim'),
}
ROUTES = ['home','kongre','davet','kurullar','genel','program','bildiri','kayit','iletisim']

for name,(title,route) in PAGES.items():
    src = ROOT / f'{name}.html'
    body = (ROOT / 'pages_body' / f'{name}.html').read_text()
    flags = {r:'' for r in ROUTES}
    flags[route] = ' active'
    if route in ('davet','kurullar','genel'): flags['kongre'] = ' active'
    head = HEAD_TMPL.format(title=title, **flags)
    src.write_text(head + body + FOOTER)
    print('wrote', src)
