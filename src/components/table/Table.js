import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

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
    if (evt.target.dataset.resize) {
      const $resizer = $(evt.target);
      // const $parent = $resizer.$el.parentElement; // bad bad
      // const $parent = $resizer.$el.closest('.columns__head'); // bad
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      // console.log($parent.data.column);

      document.onmousemove = e => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';

        document.querySelectorAll(`[data-column="${$parent.data.column}"]`)
          .forEach(el => el.style.width = value + 'px');
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
