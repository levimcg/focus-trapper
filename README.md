# Focus Trapper
A Web Component wrapper that makes it easier to manage focus trapping.

[🔎 Check out the demo](https://levimcg.github.io/focus-trapper/)

## About
One of the challenging things about building accessible UI components in handling keyboard navigation, especially managing focus in components like [modal dialogs](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal). The goal of Focus Trapper is to abstract some of that functionality into a declarative, easy-to-use Web Component.

## Getting started
Import `FocusTrapper.js` into your project and register it as a `customElement`;

```js
import FocusTrapper from './FocusTrapper.js';

// Define the <focus-trapper></focus-trapper> custom element
customElements.define('focus-trapper', FocusTrapper);
```

After you have define the `<focus-trapper>` custom element you should be able to use it in your HTML.

```html
<focus-trapper>
  <button type="button">Button one</button>
  <button type="button">Button two</button>
  <button type="button">Button three</button>
</focus-trapper>
```

By default the `focus-trapper` custom element won't do anything. To make it trap focus you'll need to add the `trapped` attribute. Once the `trapped` attribute is set in your markup, or the `trapped` property is set programmatically on an instance of an `focus-trapper` element, you'll be able to tab into the focusable content inside, but focus will always be moved from the last focusable element to the first and vice versa.

```html
<focus-trapper trapped>
  <button type="button">Button one</button>
  <button type="button">Button two</button>
  <button type="button">Button three</button>
</focus-trapper>
```

## Inspiration
The idea for this focus trapper component was inspired by the [FocusTrapZone](https://developer.microsoft.com/en-us/fabric#/controls/web/focustrapzone) React component in the the [Microsoft Fabric](https://developer.microsoft.com/en-us/fabric#/) design system.