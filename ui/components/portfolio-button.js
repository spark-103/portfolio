class PortfolioButton extends HTMLElement {
  static observedAttributes = ['disabled', 'loading'];
  connectedCallback() {
    if (this.control) return;
    const { escape: e, safeUrl, icon } = PortfolioUI;
    const label = this.textContent.trim();
    const href = safeUrl(this.getAttribute('href'));
    const variant = ['primary', 'secondary', 'text', 'danger'].includes(this.getAttribute('variant')) ? this.getAttribute('variant') : 'primary';
    const size = ['small', 'large'].includes(this.getAttribute('size')) ? this.getAttribute('size') : 'default';
    const tag = href ? 'a' : 'button';
    const type = ['submit', 'reset'].includes(this.getAttribute('type')) ? this.getAttribute('type') : 'button';
    this.innerHTML = `<${tag} class="ui-button ui-button--${variant} ui-button--${size}" ${href ? `href="${e(href)}"` : `type="${type}"`}>${e(label)}${this.hasAttribute('icon') ? icon(this.getAttribute('icon')) : ''}</${tag}>`;
    this.control = this.firstElementChild;
    this.originalLabel = this.control.innerHTML;
    this.addEventListener('click', event => {
      if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    this.sync();
  }
  attributeChangedCallback() { if (this.control) this.sync(); }
  sync() {
    const loading = this.hasAttribute('loading');
    const disabled = this.hasAttribute('disabled') || loading;
    if (loading && !this.wasLoading) {
      this.control.style.minWidth = `${this.control.getBoundingClientRect().width}px`;
    } else if (!loading) {
      this.control.style.removeProperty('min-width');
    }
    this.wasLoading = loading;
    this.control.innerHTML = loading ? '처리 중…' : this.originalLabel;
    this.control.setAttribute('aria-busy', String(loading));
    if (this.control.tagName === 'BUTTON') this.control.disabled = disabled;
    else {
      this.control.setAttribute('aria-disabled', String(disabled));
      if (disabled) this.control.setAttribute('tabindex', '-1');
      else this.control.removeAttribute('tabindex');
    }
  }
}
customElements.define('portfolio-button', PortfolioButton);
