class WorkCard extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const { escape: e, safeUrl, icon } = PortfolioUI;
    const href = safeUrl(this.getAttribute('href'));
    const cover = safeUrl(this.getAttribute('cover'));
    const tags = (this.getAttribute('tags') || '').split(',').map(x => x.trim()).filter(Boolean);
    const tag = href ? 'a' : 'article';
    this.innerHTML = `<${tag} class="work-card" ${href ? `href="${e(href)}"` : ''}><div class="work-card__cover">${cover ? `<img src="${e(cover)}" alt="${e(this.getAttribute('cover-alt') || '')}" loading="lazy">` : icon('folder', 44)}</div><div class="work-card__body"><div class="row"><status-badge>${e(this.getAttribute('kind') || '개별 작업물')}</status-badge><status-badge tone="info">${e(this.getAttribute('state') || '진행 중')}</status-badge></div><h3>${e(this.getAttribute('heading') || '제목을 입력해주세요')}</h3><p class="work-card__summary">${e(this.getAttribute('summary') || '')}</p><div class="tags">${tags.slice(0, 3).map(text => `<span class="tag">${e(text)}</span>`).join('')}${tags.length > 3 ? `<span class="tag">+${tags.length - 3}</span>` : ''}</div></div></${tag}>`;
  }
}
customElements.define('work-card', WorkCard);
