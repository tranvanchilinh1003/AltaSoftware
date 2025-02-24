import React, { useEffect, useRef } from "react";

export default function ColorBars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    function resizeCanvas() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

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

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      if (!lastTime) lastTime = timestamp;
      if (timestamp - lastTime > 5) {
        const barHeight = canvas.height * 0.3;
        let leftPos = initialLeft + currentBarIndex * barWidth;
        let tailX = leftPos + barWidth + skewFactor * barHeight;

        if (tailX >= canvas.width) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          currentColorIndex = (currentColorIndex + 1) % cycleColors.length;
          currentBarIndex = 0;
          lastTime = timestamp;
          requestAnimationFrame(draw);
          return;
        }

        let maxRange = canvas.width - initialLeft - (barWidth + skewFactor * barHeight);
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

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full fixed top-0 left-0" />
    
  );
}
