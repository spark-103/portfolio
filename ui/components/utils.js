window.PortfolioUI = {
  escape(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  },
  safeUrl(value = '') {
    // 허용한 형식만 링크와 이미지 주소로 사용한다.
    const raw = String(value).trim();
    if (!raw || /[\u0000-\u0020\\]/.test(raw)) return '';
    if (/^(https?:|mailto:)/i.test(raw) || /^(#|\.\/|\.\.\/)/.test(raw) || /^\/(?!\/)/.test(raw)) return raw;
    return '';
  },
  icon(name = 'leaf', size = 20) {
    const paths = {
      leaf: '<path d="M20 4C11 3 3 7 4 14c1 6 10 8 14 1 2-4 2-7 2-11Z"/><path d="M5 21 16 9"/>',
      arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
      book: '<path d="M5 4h14v17H5zM8 1v5M8 10h7M8 14h7M2 8h4M2 13h4M2 18h4"/>',
      folder: '<path d="M3 7V4h6l3 3h9v13H3V7Z"/><path d="m10 11-3 3 3 3m4-6 3 3-3 3"/>',
      cap: '<path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v7c4 3 8 3 12 0v-7m4-3v9"/>',
      menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
      close: '<path d="m6 6 12 12M6 18 18 6"/>'
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
  }
};
