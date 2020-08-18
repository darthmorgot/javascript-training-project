const CODES = {
  A: 65,
  Z: 90
};

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toColumn(heading, index) {
  return `
    <div class="columns__head">
      ${heading}
      <div class="columns__resize"></div>
    </div>
  `;
}

function createRow(className, content, number) {
  const resize = number ? '<div class="row__resize"></div>' : '';
  return `
    <div class="table__row row">
      <div class="row__info">
        ${number ? number : ''}
        ${resize}
      </div>
      <div class="row__data ${className ? className : ''}">
        ${content ? content : ''}
      </div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 10) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    // .map((el, index) => {
    //   return String.fromCharCode(CODES.A + index);
    // })
    .map(toChar)
    // .map(el => toColumn(el))
    .map(toColumn)
    .join('');

  const cells = new Array(colsCount)
    .fill('')
    .map(toCell)
    .join('');

  rows.push(createRow('columns', cols));

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(null, cells, i));
  }

  return rows.join('');
}
