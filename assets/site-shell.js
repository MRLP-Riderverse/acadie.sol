/* Global Acadie.sol shell renderer.
   One route model renders the mobile dock, desktop navigation, and floating menu.
   Pages own their content; this file owns only shared navigation, theme, language,
   and lightweight public counts. */
(function () {
  const CACHE_KEY = 'acadie-shell-counts';
  const SCRIPT_URL = new URL(document.currentScript?.src || 'assets/site-shell.js', document.baseURI);
  const SITE_ROOT = new URL('../', SCRIPT_URL);

  const COPY = {
    en: {
      menu: 'Menu',
      closeMenu: 'Close menu',
      dark: 'Switch to dark mode',
      light: 'Switch to light mode',
      langToFr: 'Switch language to French',
      langToEn: 'Switch language to English',
      remembrance: 'Remembrance',
      headerBanner: (entries, events) => `${entries} Entries · Vive l'Acadie! · ${events} Events`,
      routes: {
        home: 'Home', directory: 'Directory', events: 'Events', search: 'Search',
        photos: 'Photos', community: 'Community', updates: 'Updates',
        support: 'Support', about: 'About'
      }
    },
    fr: {
      menu: 'Menu',
      closeMenu: 'Fermer le menu',
      dark: 'Passer en mode sombre',
      light: 'Passer en mode clair',
      langToFr: 'Passer en français',
      langToEn: 'Passer en anglais',
      remembrance: 'Souvenirs',
      headerBanner: (entries, events) => `${entries} entrées · Vive l'Acadie! · ${events} événements`,
      routes: {
        home: 'Accueil', directory: 'Répertoire', events: 'Événements', search: 'Recherche',
        photos: 'Photos', community: 'Communauté', updates: 'Mises à jour',
        support: 'Soutien', about: 'À propos'
      }
    }
  };

  const ROUTES = {
    home: { href: 'index.html', icon: '⌂' },
    directory: { href: 'directory.html#browse', icon: '⌕' },
    events: { href: 'events.html', icon: '◷' },
    search: { href: 'search.html', icon: '⌕' },
    photos: { href: 'photos/index.html', icon: '▧' },
    community: { href: 'community.html', icon: '✦' },
    updates: { href: 'home-feed.html', icon: '↻' },
    support: { href: 'support.html', icon: '◇' },
    about: { href: 'about-us.html', icon: '⁜' }
  };

  const MOBILE_KEYS = ['home', 'events', 'search'];
  const DESKTOP_KEYS = ['home', 'directory', 'events', 'photos', 'community'];
  const MENU_KEYS = ['directory', 'events', 'photos', 'community', 'updates', 'support', 'about'];
  const SHELL_DATA = { entryCount: null, eventCount: null };

  function siteUrl(path = '') {
    return new URL(path, SITE_ROOT).href;
  }

  function currentLang() {
    const saved = localStorage.getItem('acadie-lang');
    if (saved === 'fr' || saved === 'en') return saved;
    return /^fr\b/i.test(navigator.language || '') ? 'fr' : 'en';
  }

  function routeLink(key, className = '') {
    const route = ROUTES[key];
    return `<a class="${className}" href="${siteUrl(route.href)}" data-route-key="${key}">
      <span class="route-icon" aria-hidden="true">${route.icon}</span>
      <span class="route-label">${key}</span>
    </a>`;
  }

  function activeRouteKey() {
    const path = location.pathname;
    if (/\/photos\//.test(path)) return 'photos';
    if (/community\.html$/.test(path)) return 'community';
    if (/events\.html$/.test(path)) return 'events';
    if (/search\.html$/.test(path)) return 'search';
    if (/directory\.html$/.test(path) || /entry\.html$/.test(path)) return 'directory';
    if (/home-feed\.html$/.test(path) || /recents\.html$/.test(path)) return 'updates';
    if (/support\.html$/.test(path)) return 'support';
    if (/about-us\.html$/.test(path)) return 'about';
    return 'home';
  }

  function readCachedCounts() {
    try {
      const data = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      return Number.isFinite(data?.entryCount) && Number.isFinite(data?.eventCount) ? data : null;
    } catch (_) { return null; }
  }

  function writeCachedCounts(entryCount, eventCount) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ entryCount, eventCount, ts: Date.now() })); }
    catch (_) { /* storage unavailable */ }
  }

  function syncShell() {
    const lang = currentLang();
    const copy = COPY[lang] || COPY.en;
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    document.querySelectorAll('[data-route-key]').forEach(link => {
      const key = link.dataset.routeKey;
      const label = copy.routes[key] || key;
      const text = link.querySelector('.route-label');
      if (text) text.textContent = label;
      link.setAttribute('aria-label', label);
      link.setAttribute('title', label);
      const active = key === activeRouteKey() || (key === 'directory' && activeRouteKey() === 'search');
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    document.querySelectorAll('[data-menu-label]').forEach(el => {
      el.setAttribute('aria-label', copy.menu);
      el.setAttribute('title', copy.menu);
      const text = el.querySelector('.route-label');
      if (text) text.textContent = copy.menu;
    });

    const themeButton = document.getElementById('theme-toggle');
    if (themeButton) {
      const label = isDark ? copy.light : copy.dark;
      themeButton.textContent = isDark ? '☼' : '☾';
      themeButton.setAttribute('aria-label', label);
      themeButton.setAttribute('title', label);
    }

    const langButton = document.getElementById('lang-toggle');
    if (langButton) {
      const isFr = lang === 'fr';
      const label = isFr ? copy.langToEn : copy.langToFr;
      langButton.setAttribute('aria-label', label);
      langButton.setAttribute('title', label);
    }

    const close = document.querySelector('.drawer-backdrop');
    if (close) close.setAttribute('aria-label', copy.closeMenu);
    const remembrance = document.querySelector('.drawer-close');
    if (remembrance) {
      remembrance.setAttribute('aria-label', copy.remembrance);
      remembrance.setAttribute('title', copy.remembrance);
    }

    const headerText = document.getElementById('global-header-text');
    if (headerText) {
      const { entryCount, eventCount } = SHELL_DATA;
      headerText.textContent = Number.isFinite(entryCount) && Number.isFinite(eventCount)
        ? copy.headerBanner(entryCount, eventCount)
        : "Vive l'Acadie!";
    }
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('acadie-theme', theme);
    syncShell();
    window.dispatchEvent(new CustomEvent('acadie:themechange', { detail: { theme } }));
  }

  function setLang(lang) {
    localStorage.setItem('acadie-lang', lang);
    syncShell();
    window.dispatchEvent(new CustomEvent('acadie:languagechange', { detail: { lang } }));
  }

  async function loadShellCounts() {
    const cached = readCachedCounts();
    if (cached) Object.assign(SHELL_DATA, cached);
    syncShell();
    try {
      const [directoryResponse, eventsResponse] = await Promise.all([
        fetch(siteUrl('assets/directory-data.json'), { cache: 'no-cache' }),
        fetch(siteUrl('assets/events-data.json'), { cache: 'no-cache' })
      ]);
      if (!directoryResponse.ok || !eventsResponse.ok) throw new Error('Failed to load shell counts');
      const [directoryPayload, eventsPayload] = await Promise.all([directoryResponse.json(), eventsResponse.json()]);
      const entryCount = Number(directoryPayload.published_count ?? directoryPayload.entry_count ?? directoryPayload.items?.length ?? 0);
      const eventCount = Number(eventsPayload.active_count ?? eventsPayload.event_count ?? eventsPayload.items?.length ?? 0);
      if (SHELL_DATA.entryCount !== entryCount || SHELL_DATA.eventCount !== eventCount) {
        SHELL_DATA.entryCount = entryCount;
        SHELL_DATA.eventCount = eventCount;
        writeCachedCounts(entryCount, eventCount);
        syncShell();
      }
    } catch (error) {
      console.warn('Shell counts unavailable:', error);
    }
  }

  const savedTheme = localStorage.getItem('acadie-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.documentElement.dataset.lang = currentLang();

  document.body.insertAdjacentHTML('afterbegin', `
    <header class="site-header" aria-label="Acadian banner"><span id="global-header-text">Vive l'Acadie!</span></header>
    <nav class="site-desktop-nav" aria-label="Primary navigation">
      <a class="desktop-wordmark" href="${siteUrl('index.html')}" aria-label="Acadie.sol home">ACADIE.SOL</a>
      <div class="desktop-route-list">${DESKTOP_KEYS.map(key => routeLink(key, 'desktop-route')).join('')}</div>
      <label class="desktop-menu-launch" for="menu-toggle" data-menu-label>
        <span class="route-icon" aria-hidden="true">☰</span><span class="route-label">Menu</span>
      </label>
    </nav>
    <input class="menu-toggle" type="checkbox" id="menu-toggle" aria-hidden="true" />
    <label class="drawer-backdrop" for="menu-toggle" aria-label="Close menu"></label>
    <aside class="drawer" aria-label="Menu">
      <div class="drawer-controls" aria-label="Display and language controls">
        <button class="menu-control theme-button" type="button" id="theme-toggle">☾</button>
        <a class="drawer-close" href="${siteUrl('obituaries.html')}">✟</a>
        <button class="menu-control lang-button" type="button" id="lang-toggle"><span class="lang-en">EN</span><span class="lang-sep">/</span><span class="lang-fr">FR</span></button>
      </div>
      <nav class="drawer-nav">${MENU_KEYS.map(key => routeLink(key, 'drawer-route')).join('')}</nav>
    </aside>
    <nav class="site-dock" aria-label="Primary dock">
      ${MOBILE_KEYS.map(key => routeLink(key, 'dock-route')).join('')}
      <label for="menu-toggle" data-menu-label><span class="route-icon" aria-hidden="true">☰</span><span class="route-label">Menu</span></label>
    </nav>
  `);

  window.AcadieShell = { currentLang, setTheme, setLang, sync: syncShell, loadShellCounts, url: siteUrl };

  document.addEventListener('DOMContentLoaded', () => {
    syncShell();
    loadShellCounts();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
      setLang(currentLang() === 'fr' ? 'en' : 'fr');
    });
    document.querySelectorAll('.drawer-nav a').forEach(link => link.addEventListener('click', () => {
      const toggle = document.getElementById('menu-toggle');
      if (toggle) toggle.checked = false;
    }));
  });
})();
