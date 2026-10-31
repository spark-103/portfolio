class EducationStrip extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const e = PortfolioUI.escape;
    this.innerHTML = `<div class="education-strip"><div class="education-strip__title">${PortfolioUI.icon('cap', 28)}<span>${e(this.getAttribute('program') || '고양시민 기후테크 아카데미')}</span></div><status-badge tone="success">${e(this.getAttribute('completed') || '초급 수료')}</status-badge><status-badge tone="info">${e(this.getAttribute('ongoing') || '중급 수강 중')}</status-badge></div>`;
  }
}
customElements.define('education-strip', EducationStrip);
