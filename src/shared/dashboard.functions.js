import {storage} from '@core/utils';

function toHTML(key) {
  const id = key.split(':')[1];
  const model = storage(key);

  return `
    <li class="list__record">
      <a href="#excel/${id}">${model.title}</a>
      <span>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </span>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }

  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>You haven't created any tables yet</p>`;
  }

  return `
    <div class="list__header">
      <span class="list__title">Name table</span>
      <span class="list__date">Opening date</span>
    </div>

    <ul class="list__table">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
