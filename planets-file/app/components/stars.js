"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ⭐ DIMINUA A QUANTIDADE DE ESTRELAS AQUI
    const numStars = 50;

    const stars = [];

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Criar estrelas fixas
    function createStars() {
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: rand(0.6, 1.8),
          alpha: rand(0.2, 1),
          fadeSpeed: rand(0.02, 0.01), // velocidade pequena para piscar DEVAGAR
          fadingOut: Math.random() > 0.5,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let s of stars) {
        // Lógica de piscar lentamente
        if (s.fadingOut) {
          s.alpha -= s.fadeSpeed;
          if (s.alpha <= 0.2) s.fadingOut = false;
        } else {
          s.alpha += s.fadeSpeed;
          if (s.alpha >= 1) s.fadingOut = true;
        }

        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    createStars();
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} id="starfield" />;
}
