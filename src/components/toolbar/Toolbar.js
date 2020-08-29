import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    });
  }

  static className = 'excel__toolbar toolbar';

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
    };

    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(evt) {
    const $trg = $(evt.target);

    if ($trg.data.type === 'button') {
      const value = JSON.parse($trg.data.value);
      const key = Object.keys(value)[0];

      this.setState({[key]: value[key]});
      console.log(this.state);
    }
  }
}
