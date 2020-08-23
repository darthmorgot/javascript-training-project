import {$} from '@core/dom';

export function resizeHandler($root, evt) {
  return new Promise(resolve => {
    const $resizer = $(evt.target);
    const type = $resizer.data.resize;
    // const $parent = $resizer.$el.parentElement; // bad bad
    // const $parent = $resizer.$el.closest('.columns__head'); // bad
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    // console.log($parent.data.column);
    const sideProp = type === 'column' ? 'bottom' : 'right';

    $resizer.css({opacity: 1, [sideProp]: '-2000px'});

    let delta = 0;
    let value = 0;

    document.onmousemove = e => {
      if (type === 'column') {
        delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
      } else {
        delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      if (type === 'column') {
        $parent.css({width: value + 'px'});
        $root
          .findAll(`[data-column="${$parent.data.column}"]`)
          .forEach(el => el.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }

      resolve({
        value,
        id: type === 'column' ? $parent.data.column : null
      });

      $resizer.css({opacity: 0, bottom: 0, right: 0});
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}
