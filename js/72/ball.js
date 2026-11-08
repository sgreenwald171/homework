const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');

function sizeCanvas() {
  theCanvas.width = window.innerWidth;
  theCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const inputs = document.querySelector('#inputs');
const rect = inputs.getBoundingClientRect();
const sizeInput = document.querySelector('#sizeInput');
const colorInput = document.querySelector('#colorInput');
const ballButton = document.querySelector('#addBall');
const ballArray = [];

ballButton.addEventListener('click', () => {
  let radius;
  if (sizeInput) {
    radius = sizeInput.valueAsNumber;
  } else {
    radius = 50;
  }
  const ball = new Ball(radius, colorInput.value, radius + 1, radius + 1, 1, 2);
  ballArray.push(ball);
});

class Ball {
  constructor(radius, color, x, y, dx, dy) {
    this.size = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  drawBall() {
    context.fillStyle = this.color;
    context.beginPath();
    this.x += this.dx;
    this.y += this.dy;


    if (this.x < (this.radius + 1) || this.x >= window.innerWidth - (this.radius + 1)) {
      this.dx = -this.dx;
    }
    if (this.y < (this.radius + 1) || this.y >= window.innerHeight - (this.radius + 1) - rect.height) {
      this.dy = -this.dy;
    }
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

setInterval(() => {
  context.clearRect(0, 0, theCanvas.width, theCanvas.height);
  ballArray.forEach(ball => {
    ball.drawBall();
  });
}, 1);
