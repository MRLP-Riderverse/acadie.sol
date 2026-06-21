/* Global Acadie.sol shell renderer.
   Pages call this one script instead of carrying their own dock/menu markup. The
   script owns only shared chrome state; content pages still own their page data. */
(function () {
  const COPY = {
    en: {
      drawerTitle: 'Extras',
      drawerSubtitle: 'View Everyone, support, about us',
      menuDirectory: 'View Everyone',
      menuSupport: 'Support Acadie.sol',
      menuAbout: 'About us',
      dark: 'Switch to dark mode',
      light: 'Switch to light mode',
      langToFr: 'Switch language to French',
      langToEn: 'Switch language to English',
      langTitleEn: 'English active — switch to French',
      langTitleFr: 'Français actif — passer en anglais',
      headerBanner: (entries, events) => `${entries} Entries - Vive l’Acadie! - ${events} Events`
    },
    fr: {
      drawerTitle: 'Extras',
      drawerSubtitle: 'Voir tout le monde, soutien, à propos de nous',
      menuDirectory: 'Voir tout le monde',
      menuSupport: 'Soutenir Acadie.sol',
      menuAbout: 'À propos de nous',
      dark: 'Passer en mode sombre',
      light: 'Passer en mode clair',
      langToFr: 'Passer en français',
      langToEn: 'Passer en anglais',
      langTitleEn: 'English active — switch to French',
      langTitleFr: 'Français actif — passer en anglais',
      headerBanner: (entries, events) => `${entries} entrées - Vive l’Acadie! - ${events} événements`
    }
  };

  function currentLang() {
    const saved = localStorage.getItem('acadie-lang');
    if (saved === 'fr' || saved === 'en') return saved;
    return /^fr\b/i.test(navigator.language || '') ? 'fr' : 'en';
  }

  const SHELL_DATA = { entryCount: null, eventCount: null, loaded: false };

  function syncShell() {
    const lang = currentLang();
    const copy = COPY[lang] || COPY.en;
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

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
      langButton.setAttribute('aria-label', isFr ? copy.langToEn : copy.langToFr);
      langButton.setAttribute('title', isFr ? copy.langTitleFr : copy.langTitleEn);
    }

    const title = document.getElementById('global-drawer-title');
    const subtitle = document.getElementById('global-drawer-subtitle');
    const directory = document.getElementById('global-menu-directory');
    const support = document.getElementById('global-menu-support');
    const about = document.getElementById('global-menu-about');
    const headerText = document.getElementById('global-header-text');
    if (title) title.textContent = copy.drawerTitle;
    if (subtitle) subtitle.textContent = copy.drawerSubtitle;
    if (directory) directory.textContent = copy.menuDirectory;
    if (support) support.textContent = copy.menuSupport;
    if (about) about.textContent = copy.menuAbout;
    if (headerText) {
      const entries = SHELL_DATA.entryCount;
      const events = SHELL_DATA.eventCount;
      headerText.textContent = Number.isFinite(entries) && Number.isFinite(events)
        ? copy.headerBanner(entries, events)
        : 'Vive l\'Acadie!';
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
    document.documentElement.lang = lang;
    syncShell();
    window.dispatchEvent(new CustomEvent('acadie:languagechange', { detail: { lang } }));
  }

  async function loadShellCounts() {
    if (SHELL_DATA.loaded) return;
    SHELL_DATA.loaded = true;
    try {
      const [directoryResponse, eventsResponse] = await Promise.all([
        fetch('assets/directory-data.json', { cache: 'no-store' }),
        fetch('assets/events-data.json', { cache: 'no-store' })
      ]);
      if (!directoryResponse.ok || !eventsResponse.ok) throw new Error('Failed to load shell counts');
      const [directoryPayload, eventsPayload] = await Promise.all([
        directoryResponse.json(),
        eventsResponse.json()
      ]);
      SHELL_DATA.entryCount = Number(
        directoryPayload.published_count ?? directoryPayload.entry_count ?? (Array.isArray(directoryPayload.items) ? directoryPayload.items.length : 0)
      );
      SHELL_DATA.eventCount = Number(
        eventsPayload.active_count ?? eventsPayload.event_count ?? (Array.isArray(eventsPayload.items) ? eventsPayload.items.length : 0)
      );
      syncShell();
    } catch (error) {
      console.warn('Shell counts unavailable:', error);
    }
  }

  const savedTheme = localStorage.getItem('acadie-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.documentElement.dataset.lang = currentLang();

  document.write(`
    <header class="site-header" aria-label="Acadian banner"><span id="global-header-text">Vive l'Acadie!</span></header>
    <input class="menu-toggle" type="checkbox" id="menu-toggle" aria-hidden="true" />
    <label class="drawer-backdrop" for="menu-toggle" aria-label="Close menu"></label>
    <aside class="drawer" aria-label="Extras menu">
      <div class="drawer-controls" aria-label="Display and language controls">
        <button class="menu-control theme-button" type="button" id="theme-toggle" aria-label="Switch to dark mode" title="Switch to dark mode">☾</button>
        <a class="drawer-close" href="obituaries.html" aria-label="Open obituaries" title="Open obituaries">✟</a>
        <button class="menu-control lang-button" type="button" id="lang-toggle" aria-label="Switch language to French" title="English active — switch to French"><span class="lang-en">EN</span><span class="lang-sep">/</span><span class="lang-fr">FR</span></button>
      </div>
      <div class="drawer-head">
        <div class="drawer-title"><strong id="global-drawer-title">Extras</strong><span id="global-drawer-subtitle">View Everyone, support, about</span></div>
      </div>
      <nav class="drawer-nav">
        <a href="directory.html" id="global-menu-directory">View Everyone</a>
        <a href="support.html" id="global-menu-support">Support Acadie.sol</a>
        <a href="about-us.html" id="global-menu-about">About us</a>
      </nav>
    </aside>
    <nav class="site-dock" aria-label="Primary dock">
      <a href="index.html" aria-label="Home" title="Home"><span aria-hidden="true">⌂</span></a>
      <a href="events.html" aria-label="Events" title="Events"><span aria-hidden="true">◷</span></a>
      <a href="search.html" aria-label="Search" title="Search"><span aria-hidden="true">⌕</span></a>
      <label for="menu-toggle" aria-label="Menu" title="Menu"><span aria-hidden="true">☰</span></label>
    </nav>
  `);

  window.AcadieShell = { currentLang, setTheme, setLang, sync: syncShell };

  document.addEventListener('DOMContentLoaded', () => {
    syncShell();
    loadShellCounts();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
      setLang(currentLang() === 'fr' ? 'en' : 'fr');
    });
  });
})();
