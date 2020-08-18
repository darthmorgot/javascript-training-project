import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  static className = 'excel__table table';

  toHTML() {
    return createTable(20);
  }

  onMousedown(evt) {
    // console.log(evt.target.getAttribute('data-resize'));
    if (evt.target.dataset.resize) {
      console.log('Start resizing', evt.target.dataset.resize);
    }
  }
}
