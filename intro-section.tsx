import { useEffect, useState } from 'react';
import roseHeart from './assets/rose-heart.png';
import styles from './intro-section.module.css';

/** Props for the opening intro. */
export type IntroSectionProps = {
  /** Called synchronously on the tap (a user gesture) — used to start the music. */
  onStart?: () => void;
  /** Called once the opening animation finishes. */
  onOpen: () => void;
};

const lines = ['Happy 3 months, my love!', 'Here’s something just for you, my love.'];

/**
 * The cinematic intro: typed lines, then a glowing gift box that blooms into a heart of roses.
 * @param props - {@link IntroSectionProps}
 * @returns the intro screen
 */
export function IntroSection({ onStart, onOpen }: IntroSectionProps) {
  const [line, setLine] = useState(0);
  const [opening, setOpening] = useState(false);
  const ready = line >= lines.length;

  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => setLine((l) => l + 1), line === 0 ? 900 : 1900);
    return () => clearTimeout(t);
  }, [line, ready]);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onStart?.();
    setTimeout(onOpen, 2600);
  };

  return (
    <section className={`${styles.intro} ${opening ? styles.opening : ''}`}>
      <div className={styles.lines}>
        {lines.slice(0, Math.min(line, lines.length)).map((l, i) => (
          <p key={l} className={`${styles.line} ${i === Math.min(line, lines.length) - 1 ? styles.current : styles.past}`}>
            {l}
          </p>
        ))}
      </div>

      <button className={`${styles.gift} ${ready ? styles.giftReady : ''}`} onClick={open} disabled={!ready} aria-label="Open your surprise">
        <span className={styles.glow} />
        <span className={styles.box}>
          <span className={styles.lid}>
            <span className={styles.bow} />
          </span>
          <span className={styles.base} />
        </span>
        <img src={roseHeart} alt="" className={styles.bloom} />
      </button>

      <p className={`${styles.hint} ${ready && !opening ? styles.hintVisible : ''}`}>tap the gift, my love 🎁 (turn your sound on)</p>

      {opening && (
        <div className={styles.burst} aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{ '--a': `${i * 20}deg` } as React.CSSProperties}>
              ❤
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
