'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'motion/react';
import type { PointerEvent } from 'react';
import dashboardImage from '@/assets/images/landing/dashboard.png';

const MAX_TILT = 7;

export function LandingHeroPreview() {
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 22, mass: 0.6 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const horizontalPosition = (event.clientX - left) / width - 0.5;
    const verticalPosition = (event.clientY - top) / height - 0.5;

    rotateXValue.set(verticalPosition * -MAX_TILT * 2);
    rotateYValue.set(horizontalPosition * MAX_TILT * 2);
  }

  function handlePointerLeave() {
    rotateXValue.set(0);
    rotateYValue.set(0);
  }

  return (
    <div className="landing-shot-glow relative [perspective:1200px]">
      <motion.div
        className="landing-shot border-border bg-card relative overflow-hidden rounded-2xl border will-change-transform [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <Image
          src={dashboardImage}
          alt="Пустой главный экран кабинета Delo"
          className="block h-auto w-full"
          sizes="(min-width: 1280px) 50vw, 100vw"
          priority
        />
        <div
          aria-hidden
          className="from-background/40 to-foreground/5 bg-linear-to-t pointer-events-none absolute inset-0 via-transparent"
        />
      </motion.div>
    </div>
  );
}
