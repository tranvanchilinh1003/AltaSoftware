// video 1
document.addEventListener("DOMContentLoaded", () => {
  const circle = document.querySelector(".circle");
  circle.style.transition = "width 0.1s, height 0.1s, opacity 0.1s";
  let size = 0;
  setInterval(() => {
    size = size >= 500 ? 0 : size + 10;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
  }, 100);
});

//video 2
(function () {
  const shape = document.querySelector(".shape");
  const ctx = shape.getContext("2d");

  function resizeShape() {
    shape.width = window.innerWidth;
    shape.height = window.innerHeight;
  }
  resizeShape();
  window.addEventListener("resize", resizeShape);

  const barWidth = 4;
  const initialLeft = 200;
  const initialTop = 70;
  const verticalOffset = 1;
  const skewAngle = 45;
  const skewFactor = Math.tan((skewAngle * Math.PI) / 180);

  const cycleColors = [
    { r: 196, g: 10, b: 10 },
    { r: 0, g: 0, b: 255 },
    { r: 245, g: 63, b: 250 },
    { r: 255, g: 20, b: 147 },
  ];

  let currentColorIndex = 0;
  let currentBarIndex = 0;
  let lastTime = 0;

  function draw(timestamp) {
    if (!lastTime) lastTime = timestamp;

    if (timestamp - lastTime > 5) {
      const barHeight = shape.height * 0.3;

      let leftPos = initialLeft + currentBarIndex * barWidth;
      let tailX = leftPos + barWidth + skewFactor * barHeight;

      if (tailX >= shape.width) {
        ctx.clearRect(0, 0, shape.width, shape.height);
        currentColorIndex = (currentColorIndex + 1) % cycleColors.length;
        currentBarIndex = 0;
        lastTime = timestamp;
        requestAnimationFrame(draw);
        return;
      }

      let maxRange =
        shape.width - initialLeft - (barWidth + skewFactor * barHeight);
      let t = (currentBarIndex * barWidth) / maxRange;
      if (t > 1) t = 1;

      let bias = 0.001;
      let adjustedT = Math.pow(t, 0.5) + bias;
      if (adjustedT > 1) adjustedT = 1;

      const startColor = cycleColors[currentColorIndex];
      const r = Math.round(startColor.r + adjustedT * (255 - startColor.r));
      const g = Math.round(startColor.g + adjustedT * (255 - startColor.g));
      const b = Math.round(startColor.b + adjustedT * (255 - startColor.b));
      const color = `rgb(${r}, ${g}, ${b})`;

      let topPos = initialTop + currentBarIndex * verticalOffset;

      ctx.save();
      ctx.translate(leftPos, topPos);
      ctx.transform(1, 0, skewFactor, 1, 0, 0);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, barWidth, barHeight);
      ctx.restore();

      currentBarIndex++;
      lastTime = timestamp;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
