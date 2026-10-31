class UiAlert extends HTMLElement {
  static observedAttributes = ['message', 'tone'];
  connectedCallback() {
    this.fallbackText = this.textContent.trim();
    this.render();
  }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const tone = ['success', 'warning', 'danger'].includes(this.getAttribute('tone')) ? this.getAttribute('tone') : 'info';
    this.innerHTML = `<div class="alert alert--${tone}" role="${tone === 'danger' ? 'alert' : 'status'}">${PortfolioUI.icon(tone === 'success' ? 'check' : 'info')}<span>${PortfolioUI.escape(this.getAttribute('message') || this.fallbackText || '')}</span></div>`;
  }
}
customElements.define('ui-alert', UiAlert);
