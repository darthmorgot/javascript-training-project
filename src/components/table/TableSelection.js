export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  static className = 'selected';

  clear() {
    this.group.forEach($cell => $cell.removeClass(TableSelection.className));
    this.group = [];
  }

  // $el instance Dom === true
  select($el) {
    this.clear();

    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  selectMultiple($el) {
    this.group.push($el);
    this.group.forEach($cell => $cell.addClass(TableSelection.className));
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style));
  }

  get selectedIds() {
    return this.group.map($el => $el.id());
  }
}
