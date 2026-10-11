import { useState } from 'react';
import { letter } from './surprise-data.js';
import styles from './letter-section.module.css';

/** Props for the letter section. */
export type LetterSectionProps = {
  /** Advance to the next part of the surprise. */
  onNext: () => void;
};

/**
 * A sealed envelope that opens on tap; the letter slides out and its paragraphs
 * appear one after another like they are being written.
 * @param props - {@link LetterSectionProps}
 * @returns the letter section
 */
export function LetterSection({ onNext }: LetterSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <p className={styles.kicker}>chapter three</p>
      <h2 className={styles.title}>A letter, just for you</h2>
      <p className={styles.sub}>{open ? 'read it slowly… 💗' : 'break the seal 💌'}</p>

      {!open ? (
        <button className={styles.envelope} onClick={() => setOpen(true)} aria-label="Open the letter">
          <span className={styles.envBack} />
          <span className={styles.peek} />
          <span className={styles.envFront} />
          <span className={styles.flap} />
          <span className={styles.seal}>❤</span>
          <span className={styles.to}>For my husband</span>
        </button>
      ) : (
        <article className={styles.paper}>
          {letter.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? styles.greeting : i === letter.length - 1 ? styles.signoff : styles.para}
              style={{ animationDelay: `${0.6 + i * 1.1}s` }}
            >
              {p}
            </p>
          ))}
          <p className={styles.signature} style={{ animationDelay: `${0.6 + letter.length * 1.1}s` }}>
            Your wife, Mrs. Chenna 💋
          </p>
        </article>
      )}

      {open && (
        <button className={styles.next} style={{ animationDelay: `${1 + letter.length * 1.1}s` }} onClick={onNext}>
          Let me show you us →
        </button>
      )}
    </section>
  );
}
