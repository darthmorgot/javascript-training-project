import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click']
    });
  }

  static className = 'excel__toolbar toolbar';

  toHTML() {
    return `
      <button class="button">
        <span class="material-icons">format_align_left</span>
      </button>
      <button class="button">
        <span class="material-icons">format_align_center</span>
      </button>
      <button class="button">
        <span class="material-icons">format_align_right</span>
      </button>
      <button class="button">
        <span class="material-icons">format_bold</span>
      </button>
      <button class="button">
        <span class="material-icons">format_italic</span>
      </button>
      <button class="button">
        <span class="material-icons">format_underlined</span>
      </button>
    `;
  }

  onClick(evt) {
    console.log(evt.target);
  }
}
