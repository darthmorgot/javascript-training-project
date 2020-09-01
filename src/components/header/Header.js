import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  static className = 'excel__header header';

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `
      <input type="text" class="header__input" value="${title}">
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

  onInput(evt) {
    const $trg = $(evt.target);
    this.$dispatch(actions.changeTitle($trg.text()));
  }
}
