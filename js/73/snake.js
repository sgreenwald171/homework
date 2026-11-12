const theCanvas = document.querySelector('#theCanvas');

const context = theCanvas.getContext('2d');

const SNAKE_SIZE = 64;

const gameOverSound = new Audio('crash.mp3');

function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const snakeHead = document.createElement('img');
snakeHead.src = 'snakeHead.png';

let x = -SNAKE_SIZE;
let y = 0;
let direction = 'ArrowRight';
let score = 1000;

snakeHead.onload = () => {
  const gameLoop = setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    switch(direction) {
      case 'ArrowUp':
        y -= SNAKE_SIZE;
        break;
      case 'ArrowDown':
        y += SNAKE_SIZE;
        break;
      case 'ArrowLeft':
        x -= SNAKE_SIZE;
        break;
      case 'ArrowRight':
        x += SNAKE_SIZE;
        break;
    }
    if (x < 0 || (x >= theCanvas.width) || y < 0 || (y >= theCanvas.height)) {
      gameOverSound.play();
      context.fillStyle = 'red';
      context.font = '70px arial';
      const metrics = context.measureText('GAME OVER');
      context.fillText('GAME OVER', theCanvas.width / 2 - (metrics.width / 2), theCanvas.height / 2);
      clearInterval(gameLoop);
    } else {
      context.drawImage(snakeHead, x, y);
    }


    context.fillStyle = 'green';
    context.font = '32px Cursive';
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);
  }, 500);
};

window.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      direction = e.key;
      break;
    default:
      console.log(`${e.key} not processed`);
  }
});
