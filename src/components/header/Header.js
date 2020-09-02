import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <button class="button button--red" data-button="remove">
          <span class="material-icons" data-button="remove">delete</span>
        </button>
        <button class="button button--red" data-button="exit">
          <span class="material-icons" data-button="exit">exit_to_app</span>
        </button>
      </div>
    `;
  }

  onInput(evt) {
    const $trg = $(evt.target);
    this.$dispatch(actions.changeTitle($trg.text()));
  }

  onClick(evt) {
    const $trg = $(evt.target);

    if ($trg.data.button === 'remove') {
      const decision = confirm('Are you want remove this table?');

      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if ($trg.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
