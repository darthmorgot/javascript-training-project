import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  static className = 'excel__formula formula';

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div
        id="formula"
        class="formula__input"
        contenteditable
        spellcheck="false"
      ></div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text());
    });

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text());
    });
  }

  onInput(evt) {
    const text = $(evt.target).text();
    this.$emit('formula:input', text);
  }

  onKeydown(evt) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(evt.key)) {
      evt.preventDefault();
      this.$emit('formula:done');
    }
  }
}
