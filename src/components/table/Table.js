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

      const cols = this.$root.findAll(`[data-column="${$parent.data.column}"]`);

      let delta = 0;
      let value = 0;

      document.onmousemove = e => {
        delta = e.pageX - coords.right;
        value = coords.width + delta;
        $parent.$el.style.width = value + 'px';

        cols.forEach(el => el.style.width = value + 'px');
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}

// Scripting 317 ms  287 ms
// Rendering 5081 ms 6444 ms
// Painting  612 ms  895 ms
// System    543 ms  924 ms
// Idle      2786 ms 2268 ms
// Total     9339 ms 10819 ms
