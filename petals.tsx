import { useMemo } from 'react';
import styles from './petals.module.css';

/** Props for the floating petals layer. */
export type PetalsProps = {
  /** Number of falling petals. */
  count?: number;
};

/**
 * A full-screen, non-interactive layer of falling rose petals and twinkling sparkles.
 * @param props - {@link PetalsProps}
 * @returns the petals layer
 */
export function Petals({ count = 22 }: PetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 9 + Math.random() * 9,
        size: 10 + Math.random() * 16,
        hue: Math.random() > 0.5 ? 'red' : 'pink',
        sway: 20 + Math.random() * 60,
      })),
    [count]
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className={styles.layer} aria-hidden="true">
      {sparkles.map((s) => (
        <span key={`s${s.id}`} className={styles.sparkle} style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }} />
      ))}
      {petals.map((p) => (
        <span
          key={p.id}
          className={`${styles.petal} ${p.hue === 'red' ? styles.red : styles.pink}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.8,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--sway': `${p.sway}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
