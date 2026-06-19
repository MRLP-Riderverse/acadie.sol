/* Global Acadie.sol shell renderer.
   Pages call this one script instead of carrying their own dock/menu markup. The
   script owns only shared chrome state; content pages still own their page data. */
(function () {
  const COPY = {
    en: {
      drawerTitle: 'Extras',
      drawerSubtitle: 'Directory, about, display',
      menuDirectory: 'Full directory',
      menuAbout: 'About Acadie.sol',
      dark: 'Switch to dark mode',
      light: 'Switch to light mode',
      langToFr: 'Switch language to French',
      langToEn: 'Switch language to English',
      langTitleEn: 'English active — switch to French',
      langTitleFr: 'Français actif — passer en anglais'
    },
    fr: {
      drawerTitle: 'Extras',
      drawerSubtitle: 'Répertoire, à propos, affichage',
      menuDirectory: 'Répertoire complet',
      menuAbout: 'À propos d’Acadie.sol',
      dark: 'Passer en mode sombre',
      light: 'Passer en mode clair',
      langToFr: 'Passer en français',
      langToEn: 'Passer en anglais',
      langTitleEn: 'English active — switch to French',
      langTitleFr: 'Français actif — passer en anglais'
    }
  };

  function currentLang() {
    const saved = localStorage.getItem('acadie-lang');
    if (saved === 'fr' || saved === 'en') return saved;
    return /^fr\b/i.test(navigator.language || '') ? 'fr' : 'en';
  }

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
    const about = document.getElementById('global-menu-about');
    if (title) title.textContent = copy.drawerTitle;
    if (subtitle) subtitle.textContent = copy.drawerSubtitle;
    if (directory) directory.textContent = copy.menuDirectory;
    if (about) about.textContent = copy.menuAbout;
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

  const savedTheme = localStorage.getItem('acadie-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.documentElement.dataset.lang = currentLang();

  document.write(`
    <input class="menu-toggle" type="checkbox" id="menu-toggle" aria-hidden="true" />
    <label class="drawer-backdrop" for="menu-toggle" aria-label="Close menu"></label>
    <aside class="drawer" aria-label="Extras menu">
      <div class="drawer-controls" aria-label="Display and language controls">
        <button class="menu-control theme-button" type="button" id="theme-toggle" aria-label="Switch to dark mode" title="Switch to dark mode">☾</button>
        <a class="drawer-close" href="obituaries.html" aria-label="Open obituaries" title="Open obituaries">✟</a>
        <button class="menu-control lang-button" type="button" id="lang-toggle" aria-label="Switch language to French" title="English active — switch to French"><span class="lang-en">EN</span><span class="lang-sep">/</span><span class="lang-fr">FR</span></button>
      </div>
      <div class="drawer-head">
        <div class="drawer-title"><strong id="global-drawer-title">Extras</strong><span id="global-drawer-subtitle">Directory, about, display</span></div>
      </div>
      <nav class="drawer-nav">
        <a href="directory.html" id="global-menu-directory">Full directory</a>
        <a href="index.html#about" id="global-menu-about">About Acadie.sol</a>
      </nav>
    </aside>
    <nav class="site-dock" aria-label="Primary dock">
      <a href="index.html" aria-label="Home" title="Home"><span aria-hidden="true">⌂</span></a>
      <a href="events.html" aria-label="Events" title="Events"><span aria-hidden="true">◷</span></a>
      <a href="directory.html#search" aria-label="Search" title="Search"><span aria-hidden="true">⌕</span></a>
      <label for="menu-toggle" aria-label="Menu" title="Menu"><span aria-hidden="true">☰</span></label>
    </nav>
  `);

  window.AcadieShell = { currentLang, setTheme, setLang, sync: syncShell };

  document.addEventListener('DOMContentLoaded', () => {
    syncShell();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
      setLang(currentLang() === 'fr' ? 'en' : 'fr');
    });
  });
})();
