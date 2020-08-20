export function shouldResize(evt) {
  return evt.target.dataset.resize;
}

export function isCell(evt) {
  return evt.target.dataset.type === 'cell';
}
