import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table table';

  toHTML() {
    return `
      <div class="table__row row">
        <div class="row__info"></div>
        <div class="row__data columns">
          <div class="columns__head">A</div>
          <div class="columns__head">B</div>
          <div class="columns__head">C</div>
        </div>
      </div>
      <div class="table__row row">
        <div class="row__info">1</div>
        <div class="row__data cells">
          <div class="cell selected" contenteditable>1</div>
          <div class="cell" contenteditable>2</div>
          <div class="cell" contenteditable>3</div>
        </div>
      </div>
      <div class="table__row row">
        <div class="row__info">2</div>
        <div class="row__data cells">
          <div class="cell" contenteditable>4</div>
          <div class="cell" contenteditable>5</div>
          <div class="cell" contenteditable>6</div>
        </div>
      </div>
    `;
  }
}
