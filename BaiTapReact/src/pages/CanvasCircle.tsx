import React, { useEffect, useRef, useState } from "react";

const CanvasCircle = () => {
  const [size, setSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let animationFrameId: number;

    const animate = () => {
      setSize((prev) => {
        return prev >= 150 ? 0 : prev + 1;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate); 

    return () => cancelAnimationFrame(animationFrameId); 
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  }, [size]);

  return (
    <div className="Container">
      <canvas ref={canvasRef} className="w-full h-full fixed top-0 left-0" />
    </div>
  );
};

export default CanvasCircle;
