import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions.js';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  static className = 'excel__table table';

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', value => {
      // this.selection.current.text(value);
      this.selection.current.attr('data-value', value).text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    // this.$subscribe(state => {
    //   console.log('TableState', state);
    // });

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));
    // console.log('Styles to dispatch', styles);
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(evt) {
    try {
      const data = await resizeHandler(this.$root, evt);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('ResizeError', e.message);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }));
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      // resizeHandler(this.$root, evt);
      this.resizeTable(evt);
    } else if (isCell(evt)) {
      const $trg = $(evt.target);

      if (evt.shiftKey) {
        const $cells = matrix($trg, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else if (evt.ctrlKey) {
        this.selection.selectMultiple($trg);
      } else {
        this.selectCell($trg);
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
      this.selectCell($next);
    }
  }

  onInput(evt) {
    // this.$emit('table:input', $(evt.target));
    this.updateTextInStore($(evt.target).text());
  }
}
