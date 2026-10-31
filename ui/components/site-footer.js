class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const { escape: e, safeUrl } = PortfolioUI;
    const email = this.getAttribute('email') || '';
    const resume = safeUrl(this.getAttribute('resume'));
    this.innerHTML = `<footer class="site-footer"><div class="container site-footer__inner"><span>박세진 · 포트폴리오 UI</span><div class="row">${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `<a href="mailto:${e(email)}">이메일로 연락하기</a>` : ''}${resume ? `<a href="${e(resume)}" download>이력서 PDF 다운로드</a>` : ''}<a href="#main">맨 위로 ↑</a></div></div></footer>`;
  }
}
customElements.define('site-footer', SiteFooter);
