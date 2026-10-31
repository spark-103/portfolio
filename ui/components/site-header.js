class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const { escape: e, safeUrl } = PortfolioUI;
    const link = (key, fallback) => e(safeUrl(this.getAttribute(key)) || fallback);
    this.innerHTML = `<header class="site-header"><div class="container site-header__inner"><a class="site-logo" href="${link('home-href', '#main')}">${PortfolioUI.icon('leaf', 24)}${e(this.getAttribute('name') || '박세진')}</a><button class="nav-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false">${PortfolioUI.icon('menu')}</button><nav class="site-nav" aria-label="주요 메뉴"><a href="${link('about-href', '#intro')}">소개</a><a href="${link('works-href', '#works')}">${e(this.getAttribute('works-label') || '작업물')}</a><a href="${link('learning-href', '#learning')}">${e(this.getAttribute('learning-label') || '학습·활용')}</a></nav></div></header>`;
    const toggle = this.querySelector('button');
    const nav = this.querySelector('nav');
    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '메뉴 열기');
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    this.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });
  }
}
customElements.define('site-header', SiteHeader);
