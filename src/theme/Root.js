import React, { useEffect } from 'react';

export default function Root({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    let themeColor = document.querySelector('meta[name="theme-color"]');
    const createdThemeColor = !themeColor;

    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      document.head.appendChild(themeColor);
    }

    const syncBrowserChrome = () => {
      const isDark = root.dataset.theme === 'dark';
      const isLandingPage = Boolean(document.querySelector('.landingPage'));

      themeColor.content = isLandingPage
        ? (isDark ? '#11161d' : '#F9FAFB')
        : (isDark ? '#090C10' : '#ffffff');
    };

    const observer = new MutationObserver(syncBrowserChrome);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
      childList: true,
      subtree: true,
    });

    syncBrowserChrome();

    return () => {
      observer.disconnect();
      if (createdThemeColor) {
        themeColor.remove();
      }
    };
  }, []);

  return <>{children}</>;
}
