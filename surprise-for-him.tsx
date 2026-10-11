import { useCallback, useRef, useState } from 'react';
import { Petals } from './petals.js';
import { MusicPlayer } from './music-player.js';
import { IntroSection } from './intro-section.js';
import { MemoriesSection } from './memories-section.js';
import { PromisesSection } from './promises-section.js';
import { LetterSection } from './letter-section.js';
import { CarouselSection } from './carousel-section.js';
import { FinaleSection } from './finale-section.js';
import styles from './surprise-for-him.module.css';

/** The ordered chapters of the surprise. */
const stages = ['intro', 'memories', 'promises', 'letter', 'carousel', 'finale'] as const;

/** Props for the surprise experience. */
export type SurpriseForHimProps = {
  /** Chapter to start on (useful for previews). Defaults to the intro. */
  initialStage?: number;
};

/**
 * A romantic, chaptered digital surprise: intro gift → memories → promises →
 * love letter → 3D photo carousel → blooming-roses finale, with our song playing.
 * @param props - {@link SurpriseForHimProps}
 * @returns the full surprise experience
 */
export function SurpriseForHim({ initialStage = 0 }: SurpriseForHimProps) {
  const [stage, setStage] = useState(initialStage);
  const [playing, setPlaying] = useState(false);
  const media = useRef<HTMLMediaElement>(null);

  const play = useCallback(() => {
    const el = media.current;
    if (!el) return;
    el.volume = 0.8;
    el.play().then(
      () => setPlaying(true),
      () => setPlaying(false)
    );
  }, []);

  const toggle = () => {
    const el = media.current;
    if (!el) return;
    if (el.paused) play();
    else {
      el.pause();
      setPlaying(false);
    }
  };

  const goTo = (s: number) => {
    setStage(s);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const next = () => goTo(Math.min(stage + 1, stages.length - 1));

  return (
    <main className={styles.app}>
      <div className={styles.aurora} aria-hidden="true" />
      <Petals />
      <MusicPlayer ref={media} playing={playing} visible={stage > 0} onToggle={toggle} />

      {stage > 0 && (
        <nav className={styles.progress} aria-label="Chapters">
          {stages.slice(1).map((s, i) => (
            <button key={s} className={i + 1 <= stage ? styles.dotOn : styles.dot} onClick={() => goTo(i + 1)} aria-label={`Go to ${s}`}>
              ❤
            </button>
          ))}
        </nav>
      )}

      <div key={stage} className={styles.stage}>
        {stage === 0 && (
          <IntroSection onStart={play} onOpen={() => goTo(1)} />
        )}
        {stage === 1 && <MemoriesSection onNext={next} />}
        {stage === 2 && <PromisesSection onNext={next} />}
        {stage === 3 && <LetterSection onNext={next} />}
        {stage === 4 && <CarouselSection onNext={next} />}
        {stage === 5 && <FinaleSection onReplay={() => goTo(0)} />}
      </div>

    </main>
  );
}
