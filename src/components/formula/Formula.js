import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options
    });
  }

  static className = 'excel__formula formula';

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(evt) {
    const text = $(evt.target).text();
    this.$emit('formula:input', text);
  }
}
