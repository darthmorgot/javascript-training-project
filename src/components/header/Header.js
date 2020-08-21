import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options
    });
  }

  static className = 'excel__header header';

  toHTML() {
    return `
      <input type="text" class="header__input" value="New table">
      <div class="header__buttons">
        <button class="button button--red">
          <span class="material-icons">delete</span>
        </button>
        <button class="button button--red">
          <span class="material-icons">exit_to_app</span>
        </button>
      </div>
    `;
  }
}
