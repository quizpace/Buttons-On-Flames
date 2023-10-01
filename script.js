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
    this.weight = Math.random() * 0.5 + 4.5;
    this.directionX = Math.random() * 5;
  }
  update() {
    this.y += this.weight;

    if (this.size >= 0.5) this.size -= 0.4;
  }
  draw() {
    ctx.fillStyle = "rgba(255, 288, 196)";
    // ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0.2, Math.PI * 0.2);
    ctx.fill();
  }
}

let activeButton = 1;
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
    for (let y = i; y < particlesArray.length; y++) {
      let dx = particlesArray[i].x - particlesArray[y].x;
      let dy = particlesArray[i].y - particlesArray[y].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let opacity = particlesArray[i].size / 95 + particlesArray[y].size / 95;
      ctx.strokeStyle = "rgba(198, 231, 106," + opacity;
      if (distance < 80) {
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[y].x, particlesArray[y].y);
        ctx.stroke();
      }
    }

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
