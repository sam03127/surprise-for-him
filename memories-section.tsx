import { useState } from 'react';
import { memories, type Memory } from './surprise-data.js';
import styles from './memories-section.module.css';

/** Props for the memories section. */
export type MemoriesSectionProps = {
  /** Advance to the next part of the surprise. */
  onNext: () => void;
};

/**
 * Polaroid memories that drop onto a string of fairy lights; tap one to open it.
 * @param props - {@link MemoriesSectionProps}
 * @returns the memories section
 */
export function MemoriesSection({ onNext }: MemoriesSectionProps) {
  const [open, setOpen] = useState<Memory | null>(null);

  return (
    <section className={styles.section}>
      <p className={styles.kicker}>chapter one</p>
      <h2 className={styles.title}>The moments that made us</h2>
      <p className={styles.sub}>tap a memory 📸</p>

      <div className={styles.lights} aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>

      <div className={styles.wall}>
        {memories.map((m, i) => (
          <button
            key={m.caption}
            className={styles.polaroid}
            style={{ '--r': `${(i % 2 ? 1 : -1) * (3 + (i % 3) * 2)}deg`, animationDelay: `${0.3 + i * 0.25}s` } as React.CSSProperties}
            onClick={() => setOpen(m)}
          >
            <span className={styles.pin} />
            <span className={styles.photo}>
              <img src={m.src} alt={m.caption} style={m.imageRotate ? { transform: `rotate(${m.imageRotate}deg) scale(1.8)` } : undefined} />
            </span>
            <span className={styles.caption}>{m.caption}</span>
          </button>
        ))}
      </div>

      <button className={styles.next} onClick={onNext}>
        Now, my promises to you →
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(null)} role="dialog" aria-label={open.caption}>
          <div className={styles.big} onClick={(e) => e.stopPropagation()}>
            <span className={styles.bigPhoto}>
              <img src={open.src} alt={open.caption} style={open.imageRotate ? { transform: `rotate(${open.imageRotate}deg) scale(1.75)` } : undefined} />
            </span>
            <h3>{open.caption}</h3>
            <p>{open.note}</p>
            <button className={styles.close} onClick={() => setOpen(null)} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
