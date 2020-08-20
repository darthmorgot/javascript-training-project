import {range} from '@core/utils';

export function shouldResize(evt) {
  return evt.target.dataset.resize;
}

export function isCell(evt) {
  return evt.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);

  return ids;
}
