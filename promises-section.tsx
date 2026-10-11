import { useState } from 'react';
import { promises } from './surprise-data.js';
import styles from './promises-section.module.css';

/** Props for the promises section. */
export type PromisesSectionProps = {
  /** Advance to the next part of the surprise. */
  onNext: () => void;
};

/**
 * "These are my promises" — flip cards that reveal each promise. The next button
 * glows once every promise has been read.
 * @param props - {@link PromisesSectionProps}
 * @returns the promises section
 */
export function PromisesSection({ onNext }: PromisesSectionProps) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const allRead = flipped.size === promises.length;

  const flip = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className={styles.section}>
      <p className={styles.kicker}>chapter two</p>
      <h2 className={styles.title}>These are my promises</h2>
      <p className={styles.sub}>
        tap each card to unwrap it 💝 &nbsp;·&nbsp; {flipped.size}/{promises.length} unwrapped
      </p>

      <div className={styles.grid}>
        {promises.map((p, i) => (
          <button
            key={p.title}
            className={`${styles.card} ${flipped.has(i) ? styles.flipped : ''}`}
            style={{ animationDelay: `${i * 0.15}s` }}
            onClick={() => flip(i)}
            aria-pressed={flipped.has(i)}
          >
            <span className={styles.inner}>
              <span className={styles.front}>
                <span className={styles.icon}>{p.icon}</span>
                <span className={styles.cardTitle}>{p.title}</span>
                <span className={styles.tap}>tap to open</span>
              </span>
              <span className={styles.back}>
                <span className={styles.num}>Promise #{i + 1}</span>
                <span className={styles.text}>{p.text}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <button className={`${styles.next} ${allRead ? styles.ready : ''}`} onClick={onNext}>
        {allRead ? 'I wrote you a letter too… 💌' : 'Read my letter →'}
      </button>
    </section>
  );
}
