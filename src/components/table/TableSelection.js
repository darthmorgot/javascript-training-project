export class TableSelection {
  constructor() {
    this.group = [];
  }

  // $el instance Dom === true
  select($el) {
    this.group.push($el);
    $el.addClass('selected');
  }

  selectGroup() {

  }
}
