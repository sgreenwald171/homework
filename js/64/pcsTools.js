function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function getCss(element, property) {
  // return element.style[property];
  return getComputedStyle(element)[property];
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

function sparkle(element, seconds) {
  const interval = setInterval(() => {
    setCss(element, 'color', `#${Math.floor(Math.random() * 16777217).toString('16').padStart(6, '0')}`);
    seconds--;
    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}

export default function (selector) {
  const element = getElement(selector);

  return {
    css: function (property, value) {
      console.log(arguments);

      if (arguments.length < 2) {
        return getCss(element, property);
      } else {
        setCss(element, property, value);
      }
    },
    on: (eventType, callback) => on(element, eventType, callback),
    click: callback => click(element, callback),
    hide: () => setCss(element, 'display', 'none'),
    show: () => setCss(element, 'display', 'inline-block'),
    sparkle: (seconds) => sparkle(element, seconds)
  };
}

