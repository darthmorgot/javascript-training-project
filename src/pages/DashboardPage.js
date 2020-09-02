import {Page} from '@core/Page';
import {$} from '@core/dom';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel dashboard</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#" class="db__create">New table</a>
        </div>
      </div>

      <div class="db__table db__view list">
        <div class="list__header">
          <span class="list__title">Name table</span>
          <span class="list__date">Opening date</span>
        </div>

        <ul class="list__table">
          <li class="list__record">
            <a href="#">Table 1</a>
            <span>13.08.2020</span>
          </li>
          <li class="list__record">
            <a href="#">Table 2</a>
            <span>13.08.2020</span>
          </li>
          <li class="list__record">
            <a href="#">Table 3</a>
            <span>13.08.2020</span>
          </li>
        </ul>
      </div>
    `);
  }
}
