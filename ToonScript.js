const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// measure buttons
const buttonElements = document.querySelectorAll(".button");
let buttonMeasurements = [];
function measureButtons() {
  buttonMeasurements = [];
  buttonElements.forEach((button) => {
    buttonMeasurements.push(button.getBoundingClientRect());
  });
}
measureButtons();
console.log(buttonMeasurements);

// creat particles
let particlesArray = [];
class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = Math.random() * 10.5 + 3.5;
    this.directionX = Math.random() * 15;
  }
  update() {
    this.y -= this.weight;
    this.x += this.directionX;
    if (this.size >= 0.3) this.size -= 0.05;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
  }
}

let activeButton = -1;
buttonElements.forEach((button) =>
  button.addEventListener("mouseenter", function () {
    activeButton = button.dataset.number;
  })
);
buttonElements.forEach((button) =>
  button.addEventListener("mouseleave", function () {
    activeButton = -1;
  })
);

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 1) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function creatParticle() {
  if (activeButton > -1) {
    let size = Math.random() * 40 + 10;
    let x =
      Math.random() * (buttonMeasurements[activeButton].width - size * 2) +
      buttonMeasurements[activeButton].x +
      size;
    let y = buttonMeasurements[activeButton].y + 40;
    particlesArray.push(new Particle(x, y, size));
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  creatParticle();
  handleParticles();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  measureButtons();
});
