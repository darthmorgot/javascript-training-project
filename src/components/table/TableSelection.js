export class TableSelection {
  constructor() {
    this.group = [];
  }

  static className = 'selected';

  clear() {
    this.group.forEach($cell => $cell.removeClass(TableSelection.className));
    this.group = [];
  }

  // $el instance Dom === true
  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  selectGroup() {

  }
}
