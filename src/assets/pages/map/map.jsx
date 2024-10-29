import Header from "../../../components/Header/Header";
import "./map.css";
import React, { useEffect, useRef } from 'react';

const FallingLeavesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    let spawnTimer = 0;
    const spawnInterval = 10;
    const maxParticles = 700;
    const gravityStrength = 10;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, out: false };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY, out: false };
    };

    const onMouseOut = () => {
      mouse.out = true;
    };

    const createParticle = () => {
      const isBright = Math.random() > 0.5;
      particles.push({
        x: mouse.x,
        y: mouse.y,
        xv: isBright ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
        yv: isBright ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
        color: isBright
          ? `rgb(255, ${Math.floor(200 * Math.random())}, ${Math.floor(80 * Math.random())})`
          : 'rgb(255, 255, 255)',
        size: isBright ? 5 + 10 * Math.random() : 1,
        alpha: 1,
      });
    };

    const updateParticles = () => {
      particles.forEach((p, index) => {
        if (!mouse.out) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.max(100, dx * dx + dy * dy);
          const attraction = gravityStrength / distance;
          p.xv = (p.xv + attraction * dx) * 0.99;
          p.yv = (p.yv + attraction * dy) * 0.99;
        }
        p.x += p.xv;
        p.y += p.yv;
        p.alpha *= 0.99;

        if (p.alpha <= 0.01) particles.splice(index, 1);
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    const animate = (timestamp) => {
      if (!mouse.out) {
        spawnTimer += timestamp ? timestamp / 16 : 0;
        while (spawnTimer > spawnInterval) {
          createParticle();
          spawnTimer -= spawnInterval;
        }
      }

      if (particles.length > maxParticles) particles.splice(0, particles.length - maxParticles);

      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', onMouseMove); // Cambiado a `document`
    document.addEventListener('mouseout', onMouseOut); // Cambiado a `document`
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Permite que los eventos pasen a través del lienzo
      }}
    />
  );
};

const Map = () => {
  return (
    <>
      <Header />
      <div className="App">
        <h1>MAPA</h1>
        <div className="scroll-box">
          <p>
            Desarrollo de una aplicación web interactiva que busca concientizar sobre problemáticas ambientales en Yumbo, utilizando un entorno virtual con un NPC de diálogos predeterminados. El proyecto se enfocará en la implementación de funcionalidades que permitan la interacción del usuario y la simulación de escenarios que reflejen el impacto ambiental.
          </p>
          <p>Aquí puedes añadir más texto para que el cuadro necesite desplazarse.</p>
          <p>Puedes seguir añadiendo más texto para demostrar cómo funciona el desplazamiento dentro del cuadro.</p>
          <p>Continuar agregando más contenido aquí.</p>
        </div>
      </div>
      <FallingLeavesCanvas />
    </>
  );
};

export default Map;
