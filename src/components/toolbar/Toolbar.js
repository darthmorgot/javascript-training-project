import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  static className = 'excel__toolbar toolbar';

  prepare() {
    // const initialState = {
      // textAlign: 'left',
      // fontWeight: 'normal',
      // fontStyle: 'normal',
      // textDecoration: 'none'
    // };

    // this.initState(initialState);
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(evt) {
    const $trg = $(evt.target);

    if ($trg.data.type === 'button') {
      const value = JSON.parse($trg.data.value);
      // const key = Object.keys(value)[0];

      this.$emit('toolbar:applyStyle', value);

      // this.setState({[key]: value[key]});
    }
  }
}
