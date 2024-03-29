const canvas = document.querySelectorAll("#canvas1");

canvas.forEach(function (el) {
  const ctx = el.getContext("2d");

  el.width = window.innerWidth;
  let heightRation = 1.5;
  el.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.font = "1rem Verdana";
  if (el.getAttribute("data-canva") === "true") {
    console.log("coco");
    ctx.fillText("ROBOTICS", 0, 20);
    ctx.fillText("X AI DEMO", 0, 40);
    ctx.fillText("DAY", 0, 60);
  } else {
    ctx.fillText("ROBOTICS", 0, 20);
    ctx.fillText("coco AI DEMO", 0, 40);
  }

  // ctx.strokeStyle = "white";
  // ctx.strokeRect(0, 0, 100, 100);
  let textCoordinats = ctx.getImageData(0, 0, 100, 100);

  let particleArray = [];
  let adjustX = 0;
  let adjustY = 0;

  const mouse = {
    x: null,
    y: null,
    radius: 150,
  };

  el.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 4;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 40 + 5;
    }
    draw() {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;
      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        // this.size = 3;
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 10;
        }

        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }
    }
  }

  // console.log(textCoordinats);
  function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinats.height; y < y2; y++) {
      for (let x = 0, x2 = textCoordinats.width; x < x2; x++) {
        if (textCoordinats.data[y * 4 * textCoordinats.width + x * 4 + 3] > 5) {
          let positionX = x;
          let positionY = y;
          particleArray.push(new Particle(positionX * 10, positionY * 10));
        }
      }
    }
    // particleArray.push(new Particle(80, 50));
  }
  init();
  // console.log(particleArray);

  function animate() {
    ctx.clearRect(0, 0, el.width, el.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
