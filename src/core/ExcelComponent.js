import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  // настраиваем наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // инициализируем компонент
  // добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // удаляем компонент
  // чистим слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }

  // уведомляем слушателя о событии eventName
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  // подписываемся на событие eventName
  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }
}
