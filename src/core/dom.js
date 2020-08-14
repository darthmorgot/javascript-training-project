class Dom {
}

export function $() {
  return new Dom();
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  if (classes) {
    // el.classList.add(classes);
    el.className = classes;
  }

  return el;
};
