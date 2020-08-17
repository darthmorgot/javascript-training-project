import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    // console.log(this.listeners, this.$root);

    this.listeners.forEach(listener => {
      // console.log(listener, this.$root);
      const method = getMethodName(listener);
      // console.log(method, this);

      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} component`
        );
      }

      // тоже самое, что и addEventListener
      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDOMListeners() {

  }
}

function getMethodName(evtName) {
  return 'on' + capitalize(evtName);
}
