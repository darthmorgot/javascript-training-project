import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions.js';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown']
    });
  }

  static className = 'excel__table table';

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      resizeHandler(this.$root, evt);
    } else if (isCell(evt)) {
      const $trg = $(evt.target);

      if (evt.shiftKey) {
        const $cells = matrix($trg, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else if (evt.ctrlKey) {
        this.selection.selectMultiple($trg);
      } else {
        this.selection.select($trg);
      }
    }
  }

  onKeydown(evt) {
    const keys = [
      'Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'
    ];
    const {key} = evt;

    if (keys.includes(key) && !evt.shiftKey) {
      evt.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}
