'use client';

import { useEffect, useRef } from 'react';

export function AuthDotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const panel = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !panel || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    let palette: string[] = [];
    let pointerX = 0.78;
    let pointerY = 0.48;
    let targetX = pointerX;
    let targetY = pointerY;
    let pointerActive = false;
    let pointerPresence = 0;

    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      const colors = document.documentElement.classList.contains('dark')
        ? ['--accent', '--chart-5', '--primary', '--chart-1', '--chart-2']
        : ['--chart-5', '--chart-3', '--primary', '--chart-1', '--chart-2'];
      palette = colors.map((token) => styles.getPropertyValue(token).trim());
      draw(lastFrame);
    }

    function draw(time: number) {
      if (!context || !width || !height) return;

      context.clearRect(0, 0, width, height);
      const cell = 9;
      const columns = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const tick = time * 0.001;
      const cursorRadius = Math.min(width, height) * 0.5;
      const elapsed = lastFrame ? Math.min(Math.max(time - lastFrame, 0), 1000) : 1000 / 30;
      const easing = 1 - Math.exp(-elapsed / 180);

      pointerX += (targetX - pointerX) * easing;
      pointerY += (targetY - pointerY) * easing;
      pointerPresence += ((pointerActive ? 1 : 0) - pointerPresence) * easing;

      for (let row = 0; row < rows; row++) {
        const y = (row + 0.5) / rows;

        for (let column = Math.floor((width * 0.3) / cell); column < columns; column++) {
          const x = (((column + 0.5) * cell) / width - 0.35) / 0.65;
          const upper = 1 - Math.hypot((x - 1.04) / 1.12, (y + 0.2) / 0.78);
          const center = 1 - Math.hypot((x - 0.7) / 0.48, (y - 0.48) / 0.28);
          const lower = 1 - Math.hypot((x - 1.06) / 1.02, (y - 1.08) / 0.82);
          const largeFragments = 0.09 * Math.sin(x * 12 + y * 9) * Math.cos(y * 14 - x * 7);
          const smallFragments = 0.045 * Math.sin(x * 27 - y * 19);
          const shape = Math.max(upper, center, lower) + largeFragments + smallFragments;
          const coverage = Math.max(0, Math.min(1, (shape + 0.08) / 0.22));
          if (coverage === 0) continue;

          const grain = Math.sin(column * 127.1 + row * 311.7) * 43758.5453;
          const variation = grain - Math.floor(grain);
          const speedGrain = Math.sin(column * 78.233 + row * 47.12) * 12345.6789;
          const speed = speedGrain - Math.floor(speedGrain);
          const twinkle =
            0.5 + 0.5 * Math.sin(tick * (1.2 + speed * 2.2) + variation * Math.PI * 2);
          const sizeGrain = Math.sin(column * 63.726 + row * 9.184) * 65471.33;
          const baseSize = 0.15 + (sizeGrain - Math.floor(sizeGrain)) * 0.75;
          const pulseTime = tick * (0.35 + speed * 0.4) + variation * 23.7;
          const pulseStep = Math.floor(pulseTime);
          const pulseGrain = Math.sin(column * 91.7 + row * 17.4 + pulseStep * 38.6) * 31415.9;
          const pulse =
            pulseGrain - Math.floor(pulseGrain) > 0.68
              ? Math.sin((pulseTime - pulseStep) * Math.PI) ** 2
              : 0;
          let interaction = 0;
          let offsetX = 0;
          let offsetY = 0;

          if (pointerPresence > 0.001) {
            const dx = (x - pointerX) * width * 0.65;
            const dy = (y - pointerY) * height;
            const distance = Math.hypot(dx, dy);
            interaction = pointerPresence * Math.max(0, 1 - distance / cursorRadius) ** 1.5;
            const push = interaction * 75;
            const angle = variation * Math.PI * 2;
            offsetX = (distance ? dx / distance : Math.cos(angle)) * push;
            offsetY = (distance ? dy / distance : Math.sin(angle)) * push;
          }

          const density = Math.min(1, coverage * (0.75 + twinkle * 0.25) + interaction * 0.2);

          if (density < variation * 0.48 + 0.08) continue;

          const size = cell * (baseSize + (1.2 - baseSize) * pulse);
          const colorIndex = Math.min(4, Math.floor(twinkle * 3.5 + variation + interaction));
          context.globalAlpha = Math.min(1, density * (0.65 + twinkle * 0.3));
          context.fillStyle = palette[colorIndex];
          context.fillRect(
            column * cell + (cell - size) / 2 + offsetX,
            row * cell + (cell - size) / 2 + offsetY,
            size,
            size
          );
        }
      }
      context.globalAlpha = 1;
    }

    function animate(time: number) {
      if (time - lastFrame >= 1000 / 30) {
        draw(time);
        lastFrame = time;
      }
      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!visible) {
        pointerActive = false;
        draw(lastFrame);
      } else {
        frame = requestAnimationFrame(animate);
      }
    }

    function resize() {
      if (!canvas || !panel || !context) return;
      const bounds = panel.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      draw(lastFrame);
    }

    function handlePointerMove(event: PointerEvent) {
      if (!panel) return;
      const bounds = panel.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width;
      if (
        relativeX < 0.3 ||
        relativeX >= 1 ||
        event.clientY < bounds.top ||
        event.clientY >= bounds.bottom
      ) {
        pointerActive = false;
        return;
      }
      targetX = (relativeX - 0.35) / 0.65;
      targetY = (event.clientY - bounds.top) / bounds.height;
      pointerActive = true;
    }

    function handlePointerLeave() {
      pointerActive = false;
    }

    function handleVisibilityChange() {
      if (document.hidden) pointerActive = false;
    }

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    const themeObserver = new MutationObserver(readColors);

    resizeObserver.observe(panel);
    visibilityObserver.observe(panel);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    window.addEventListener('pointermove', handlePointerMove);
    panel.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    readColors();
    resize();
    syncAnimation();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      panel.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden
    />
  );
}
