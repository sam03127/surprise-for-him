import { forwardRef } from 'react';
import ourSong from './assets/my-song.mp3';
import styles from './music-player.module.css';

/** Props for the floating music toggle. */
export type MusicPlayerProps = {
  /** Whether the song is currently playing. */
  playing: boolean;
  /** Whether the toggle button is shown. */
  visible: boolean;
  /** Toggle play / pause. */
  onToggle: () => void;
};

/**
 * Hidden audio element used for the background song,
 * plus a floating vinyl-style play/pause toggle.
 * @param props - {@link MusicPlayerProps}
 * @returns the hidden media element and the toggle
 */
export const MusicPlayer = forwardRef<HTMLAudioElement, MusicPlayerProps>(function MusicPlayer({ playing, visible, onToggle }, ref) {
  return (
    <>
      <audio ref={ref} src={ourSong} className={styles.media} loop playsInline preload="auto" aria-hidden="true" />
      {visible && (
        <button className={`${styles.toggle} ${playing ? styles.spinning : ''}`} onClick={onToggle} aria-label={playing ? 'Pause our song' : 'Play our song'}>
          <span className={styles.disc}>{playing ? '♫' : '▶'}</span>
          {playing && (
            <span className={styles.bars} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
        </button>
      )}
    </>
  );
});
