const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;

// function toCell(row, index) {
//   return `
//     <div
//       class="cell"
//       data-column="${index}"
//       data-row="${row}"
//       contenteditable>
//       </div>
//   `;
// }

function toCell(state, rowNum) {
  return function(_, col) {
    const width = getWidth(state.colState, col);
    return `
      <div
        class="cell"
        data-type="cell"
        data-column="${col}"
        data-id="${rowNum}:${col}"
        contenteditable
        style="width: ${width}"
      ></div>
    `;
  };
}

function toColumn({heading, index, width}) {
  return `
    <div
      class="columns__head"
      data-type="resizable"
      data-column="${index}"
      style="width: ${width}"
    >
      ${heading}
      <div class="columns__resize" data-resize="column"></div>
    </div>
  `;
}

function createRow(className, content, number) {
  const resize = number
    ? '<div class="row__resize" data-resize="row"></div>'
    : '';

  return `
    <div class="table__row row" data-type="resizable">
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

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function withWidthFrom(state) {
  return function(heading, index) {
    return {
      heading, index, width: getWidth(state.colState, index)
    };
  };
}

export function createTable(rowsCount = 10, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  let cells = '';

  const cols = new Array(colsCount)
    .fill('')
    // .map((el, index) => {
    //   return String.fromCharCode(CODES.A + index);
    // })
    .map(toChar)
    .map(withWidthFrom(state))
    // .map(el => toColumn(el))
    .map(toColumn)
    // .map((heading, index) => {
    //   const width = getWidth(state.colState, index);
    //   return toColumn(heading, index, width);
    // })
    .join('');

  rows.push(createRow('columns', cols));

  for (let row = 0; row < rowsCount; row++) {
    cells = new Array(colsCount)
      .fill('')
      // .map((_, col) => toCell(row, col))
      .map(toCell(state, row))
      .join('');

    rows.push(createRow(null, cells, row + 1));
  }

  return rows.join('');
}
