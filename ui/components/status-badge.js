class StatusBadge extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const tone = ['success', 'info', 'warning', 'danger'].includes(this.getAttribute('tone')) ? this.getAttribute('tone') : 'neutral';
    this.innerHTML = `<span class="badge badge--${tone}">${PortfolioUI.escape(this.textContent.trim())}</span>`;
  }
}
customElements.define('status-badge', StatusBadge);
