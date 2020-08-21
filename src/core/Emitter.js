export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // уведомляем слушателей, если они есть
  // eventName string 'formula:done', 'make-it-work', ...
  // table.emit('table:select', {a: 1})
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }

    this.listeners[eventName].forEach(listener => {
      listener(...args);
    });

    return true;
  }

  // on, listen
  // подписываемся на уведомления
  // добавляем нового слушателя
  // formula.subscribe('formula:done', () => {})
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);

    return () => {
      this.listeners[eventName] =
        this.listeners[eventName].filter(listener => listener !== fn);
    };
  }
}

// Example
// const emitter = new Emitter();

// const unsub = emitter.subscribe('vova', data => console.log('Sub', data));
// emitter.emit('vova', 5454);
// emitter.emit('djfhgdj', 5454);

// setTimeout(() => {
//   emitter.emit('vova', 'after 2 sec');
// }, 2000);

// setTimeout(() => {
//   unsub();
// }, 3000);

// setTimeout(() => {
//   emitter.emit('vova', 'after 4 sec');
// }, 4000);
