// A helper for this beast of a selector
const focusableSelectors = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  [tabindex="0"]
`;

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
`;

class FocusTrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    // Bind the callback for our MO to the instance
    this._childrenChangedCallback = this._childrenChangedCallback.bind(this);
    
    // Set up our MutationObserver
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true
    };
    this.observer = new MutationObserver(this._childrenChangedCallback);
    this.observer.observe(this, observerOptions);
  }

  connectedCallback() {
    this._findAllChildNodes();
    this.addEventListener('keydown', this._handleKeydown);
  }
  
  disconnectedCallback() {
    // Clean up event listener and MutationObserver
    this.removeEventListener('keydown', this._handleKeydown);
    this.observer.disconnect();
  }
  
  // Add getter and setter for 'disabled' attribute here.
  set disabled(value) {
    const isDisabled = new Boolean(value);
    if (isDisabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get disabled() {
    return this.getAttribute('disabled');
  }
  
  _childrenChangedCallback(mutationList) {
    for (let mutation of mutationList) {
      if (mutation.type === 'childList') {
        this._findAllChildNodes();
      }
    }
  }

  _findAllChildNodes() {
    this.focusableElements = this.querySelectorAll(focusableSelectors);
    this.first = this.focusableElements[0];
    this.last = this.focusableElements[this.focusableElements.length - 1];
  }

  _handleForwardTab(first, last, event) {
    if (document.activeElement == last) {
      event.preventDefault();
      first.focus();
    }
  }

  _handleBackwardTab(first, last, event) {
    if (document.activeElement == first) {
      event.preventDefault();
      last.focus();
    }
  }

  _handleKeydown(event) {
    if (event.keyCode !== 9 || this.disabled == '') return;

    event.shiftKey
      ? this._handleBackwardTab(this.first, this.last, event)
      : this._handleForwardTab(this.first, this.last, event);
  }
}

export default FocusTrapper;