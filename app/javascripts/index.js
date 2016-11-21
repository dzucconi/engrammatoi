import parameters from 'queryparams';
import draw from './lib/draw';
import step from './lib/step';
import last from './lib/last';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

export default () => {
  const STATE = parameters({
    mouse: 'up',
    current: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    colors: ['black'],
    text: 'the world',
    background: 'white',
    image: null,
    fps: 30,
  });

  STATE.text = STATE.text.split('');

  window.addEventListener('mousedown', () =>
    STATE.mouse = 'down');

  window.addEventListener('mouseup', () =>
    STATE.mouse = 'up');

  window.addEventListener('mousemove', e => {
    if (STATE.mouse === 'up') return;

    STATE.current.x = e.clientX;
    STATE.current.y = e.clientY;
  });

  document.body.style.backgroundColor = STATE.background;

  if (STATE.image) {
    document.body.style.backgroundImage = `url(${STATE.image})`;
  }

  draw(STATE.fps, () => {
    if (STATE.last.x === STATE.current.x && STATE.last.y === STATE.current.y) return;

    STATE.text = step(STATE.text);

    STATE.last.x = STATE.current.x;
    STATE.last.y = STATE.current.y;

    STATE.color = last(step(STATE.colors));

    DOM.app.innerHTML += `
      <div
        class='point'
        style='top: ${STATE.current.y}px; left: ${STATE.current.x}px; color: ${STATE.color}'>
          ${last(STATE.text)}
        </div>
    `;
  })();
};
