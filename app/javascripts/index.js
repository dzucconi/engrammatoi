import parameters from 'queryparams';
import draw from './lib/draw';
import step from './lib/step';
import last from './lib/last';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

const STATE = {
  mouse: 'up',
  current: { x: 0, y: 0 },
  last: { x: 0, y: 0 },
};

export default () => {
  const PARAMS = parameters({
    colors: ['black'],
    text: 'the world',
    background: 'white',
    image: null,
    fps: 30,
    snap: false,
    gridsize: 16,
  });

  PARAMS.text = PARAMS.text.split('');

  const round = n =>
    Math.round(n / PARAMS.gridsize) * PARAMS.gridsize;

  const identity = n => n;

  window.addEventListener('mousedown', () =>
    STATE.mouse = 'down');

  window.addEventListener('mouseup', () =>
    STATE.mouse = 'up');

  window.addEventListener('mousemove', e => {
    if (STATE.mouse === 'up') return;

    STATE.current.x = (PARAMS.snap ? round : identity)(e.clientX);
    STATE.current.y = (PARAMS.snap ? round : identity)(e.clientY);
  });

  document.body.style.backgroundColor = PARAMS.background;

  if (PARAMS.image) {
    document.body.style.backgroundImage = `url(${PARAMS.image})`;
  }

  draw(PARAMS.fps, () => {
    if (STATE.last.x === STATE.current.x && STATE.last.y === STATE.current.y) return;

    PARAMS.text = step(PARAMS.text);

    STATE.last.x = STATE.current.x;
    STATE.last.y = STATE.current.y;

    PARAMS.color = last(step(PARAMS.colors));

    DOM.app.innerHTML += `
      <div
        class='point'
        style='top: ${STATE.current.y}px; left: ${STATE.current.x}px; color: ${PARAMS.color}'>
          ${last(PARAMS.text)}
        </div>
    `;
  })();
};
