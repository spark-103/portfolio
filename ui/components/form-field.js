class FormField extends HTMLElement {
  static sequence = 0;
  connectedCallback() {
    if (this.control) return;
    const e = PortfolioUI.escape;
    const id = `portfolio-field-${++FormField.sequence}`;
    const multiline = this.hasAttribute('multiline');
    const type = ['email', 'url', 'date', 'password', 'number'].includes(this.getAttribute('type')) ? this.getAttribute('type') : 'text';
    const hint = this.getAttribute('hint') || '';
    const error = this.getAttribute('error') || '';
    const common = `id="${id}" class="field__control" name="${e(this.getAttribute('name') || id)}" placeholder="${e(this.getAttribute('placeholder') || '')}" ${this.hasAttribute('required') ? 'required' : ''} ${this.hasAttribute('disabled') ? 'disabled' : ''} aria-describedby="${id}-help ${id}-error" aria-invalid="${Boolean(error)}"`;
    this.innerHTML = `<div class="field"><label class="field__label" for="${id}">${e(this.getAttribute('label') || '입력 항목')}${this.hasAttribute('required') ? ' (필수)' : ''}</label>${multiline ? `<textarea ${common}>${e(this.getAttribute('value') || '')}</textarea>` : `<input ${common} type="${type}" value="${e(this.getAttribute('value') || '')}">`}<span id="${id}-help" class="field__help" ${hint ? '' : 'hidden'}>${e(hint)}</span><span id="${id}-error" class="field__error" aria-live="polite" ${error ? '' : 'hidden'}>${e(error)}</span></div>`;
    this.control = this.querySelector('input, textarea');
  }
  get value() { return this.control?.value || ''; }
  set value(value) { if (this.control) this.control.value = value; }
  setError(message = '') {
    const error = this.querySelector('.field__error');
    if (!error) return;
    error.textContent = message;
    error.hidden = !message;
    this.control.setAttribute('aria-invalid', String(Boolean(message)));
  }
}
customElements.define('form-field', FormField);
