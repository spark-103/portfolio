class LearningCard extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const { escape: e, safeUrl } = PortfolioUI;
    const href = safeUrl(this.getAttribute('href'));
    const tag = href ? 'a' : 'article';
    this.innerHTML = `<${tag} class="learning-card" ${href ? `href="${e(href)}"` : ''}><div class="row"><status-badge>${e(this.getAttribute('course') || '기타')}</status-badge><span class="learning-card__date">${e(this.getAttribute('date') || '')}</span></div><h3>${e(this.getAttribute('heading') || '학습 주제')}</h3><p>${e(this.getAttribute('summary') || '')}</p><div class="tags"><status-badge tone="success">${e(this.getAttribute('stage') || '개념 학습')}</status-badge></div></${tag}>`;
  }
}
customElements.define('learning-card', LearningCard);
