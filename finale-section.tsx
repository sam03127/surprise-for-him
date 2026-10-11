import { useState } from 'react';
import roseRed from './assets/rose-red.png';
import rosePink from './assets/rose-pink.png';
import roseHeart from './assets/rose-heart.png';
import styles from './finale-section.module.css';

/** Props for the finale. */
export type FinaleSectionProps = {
  /** Restart the whole experience. */
  onReplay: () => void;
};

const blooms = [
  { src: roseRed, x: 8, y: 14, s: 110, d: 0.2 },
  { src: rosePink, x: 80, y: 10, s: 95, d: 0.5 },
  { src: rosePink, x: 4, y: 68, s: 90, d: 0.8 },
  { src: roseRed, x: 84, y: 66, s: 120, d: 1.1 },
  { src: roseRed, x: 46, y: 88, s: 80, d: 1.4 },
  { src: rosePink, x: 62, y: 2, s: 70, d: 1.7 },
  { src: roseRed, x: 26, y: 2, s: 64, d: 2 },
];

/**
 * The finale: roses bloom around a heart of flowers and a playful question —
 * the "no" button runs away, the "yes" triggers a shower of hearts.
 * @param props - {@link FinaleSectionProps}
 * @returns the finale section
 */
export function FinaleSection({ onReplay }: FinaleSectionProps) {
  const [said, setSaid] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noTries, setNoTries] = useState(0);
  const noLabels = ['No', 'Are you sure?', 'Think again 🥺', 'Nope, not allowed', 'Try the other one 😌'];

  const dodge = () => {
    setNoTries((t) => t + 1);
    setNoPos({ x: (Math.random() - 0.5) * 220, y: (Math.random() - 0.5) * 160 });
  };

  return (
    <section className={styles.section}>
      <div className={styles.garden} aria-hidden="true">
        {blooms.map((b, i) => (
          <img
            key={i}
            src={b.src}
            alt=""
            className={styles.bloom}
            style={{ left: `${b.x}%`, top: `${b.y}%`, width: `clamp(${b.s * 0.55}px, ${b.s / 9}vw, ${b.s * 1.2}px)`, animationDelay: `${b.d}s` }}
          />
        ))}
      </div>

      <div className={styles.heartWrap}>
        <img src={roseHeart} alt="A heart made of roses" className={styles.heart} />
      </div>

      {!said ? (
        <div className={styles.ask}>
          <h2 className={styles.question}>Will you keep being my forever?</h2>
          <div className={styles.buttons}>
            <button className={styles.yes} style={{ transform: `scale(${1 + noTries * 0.12})` }} onClick={() => setSaid(true)}>
              Yes, always 💍
            </button>
            <button
              className={styles.no}
              style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
              onMouseEnter={dodge}
              onClick={dodge}
            >
              {noLabels[Math.min(noTries, noLabels.length - 1)]}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.answer}>
          <h2 className={styles.question}>I knew it. 💖</h2>
          <p className={styles.love}>
            Every day with you is my favourite day.
            <br />
            I love you — today, tomorrow, and every forever after.
          </p>
          <button className={styles.replay} onClick={onReplay}>
            ↺ Relive it again
          </button>
          <div className={styles.shower} aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${14 + Math.random() * 26}px`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                }}
              >
                {['❤', '💖', '🌹', '💕', '✨'][i % 5]}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
