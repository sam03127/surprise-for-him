import { useEffect, useRef, useState } from 'react';
import { memories } from './surprise-data.js';
import styles from './carousel-section.module.css';

/** Props for the photo carousel section. */
export type CarouselSectionProps = {
  /** Advance to the finale. */
  onNext: () => void;
};

/**
 * A 3D rotating ring of our photos. Auto-plays, supports swipe, arrows and dots.
 * @param props - {@link CarouselSectionProps}
 * @returns the carousel section
 */
export function CarouselSection({ onNext }: CarouselSectionProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = memories.length;
  const step = 360 / n;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => i + 1), 3200);
    return () => clearInterval(t);
  }, [paused]);

  const go = (d: number) => {
    setPaused(true);
    setIndex((i) => i + d);
  };
  const active = ((index % n) + n) % n;

  return (
    <section className={styles.section}>
      <p className={styles.kicker}>chapter four</p>
      <h2 className={styles.title}>Us, on repeat</h2>
      <p className={styles.sub}>swipe through our story ✨</p>

      <div
        className={styles.stage}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className={styles.ring} style={{ transform: `translateZ(calc(var(--radius) * -1)) rotateY(${-index * step}deg)` }}>
          {memories.map((m, i) => (
            <figure
              key={m.caption}
              className={`${styles.slide} ${i === active ? styles.active : ''}`}
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--radius))` }}
            >
              <span className={styles.frame}>
                <img
                  src={m.src}
                  alt={m.caption}
                  className={m.imageRotate ? styles.rotated : undefined}
                  style={m.imageRotate ? { transform: `translate(-50%, -50%) rotate(${m.imageRotate}deg)` } : undefined}
                />
              </span>
              <figcaption>{m.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={() => go(-1)} aria-label="Previous photo">‹</button>
        <div className={styles.dots}>
          {memories.map((m, i) => (
            <span key={m.caption} className={i === active ? styles.dotOn : styles.dot} />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next photo">›</button>
      </div>

      <p className={styles.note}>{memories[active].note}</p>

      <button className={styles.next} onClick={onNext}>
        One last thing… 🌹
      </button>
    </section>
  );
}
