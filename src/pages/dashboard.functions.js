function toHTML() {
  return `
    <li class="list__record">
      <a href="#">Table 1</a>
      <span>13.08.2020</span>
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
