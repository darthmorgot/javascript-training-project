import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    });
  }

  static className = 'excel__table table';

  toHTML() {
    return createTable(20);
  }

  onClick() {
    console.log('click');
  }

  onMousedown(evt) {
    console.log('mousedown', evt.target.textContent);
  }

  onMousemove() {
    console.log('mousemove');
  }

  onMouseup() {
    console.log('mouseup');
  }
}
