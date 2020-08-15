import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector);
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    // const $root = document.createElement('div');
    // $root.classList.add('excel');

    const $root = $.create('div', 'excel');

    this.components.forEach(Component => {
      // const $el = document.createElement('div');
      // // $el.classList.add(Component.className);
      // $el.className = Component.className;

      const $el = $.create('div', Component.className);

      const component = new Component($el);

      // $el.innerHTML = component.toHTML();
      $el.html(component.toHTML());

      // $root.insertAdjacentHTML('beforeend', component.toHTML());
      $root.append($el);
    });

    return $root;
  }

  render() {
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`);
    // const node = document.createElement('h1');
    // node.textContent = 'Test';
    // this.$el.append(node);

    this.$el.append(this.getRoot());
  }
}
