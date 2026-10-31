class EmptyState extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const { escape: e, icon } = PortfolioUI;
    this.innerHTML = `<div class="empty-state"><div class="empty-state__icon">${icon(this.getAttribute('icon') || 'folder', 40)}</div><h3>${e(this.getAttribute('heading') || '아직 등록된 내용이 없습니다.')}</h3><p>${e(this.getAttribute('description') || '내용을 준비하고 있습니다.')}</p></div>`;
  }
}
customElements.define('empty-state', EmptyState);
