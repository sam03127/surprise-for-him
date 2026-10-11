import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { SurpriseForHim } from './surprise-for-him.js';

/** Advances fake timers in small steps so chained effects re-run between ticks. */
async function tick(steps: number, ms = 2000) {
  for (let i = 0; i < steps; i++) {
    await act(async () => {
      vi.advanceTimersByTime(ms);
    });
  }
}

describe('SurpriseForHim flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
    // jsdom does not implement media playback; emulate the `paused` state.
    let paused = true;
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', { configurable: true, get: () => paused });
    HTMLMediaElement.prototype.play = vi.fn(() => {
      paused = false;
      return Promise.resolve();
    });
    HTMLMediaElement.prototype.pause = vi.fn(() => {
      paused = true;
    });
  });
  afterEach(() => vi.useRealTimers());

  it('opens the gift, plays the song, walks the chapters and toggles the music', async () => {
    render(<SurpriseForHim />);
    await tick(6);
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Open your surprise'));
    });
    await tick(2);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(screen.getByText('The moments that made us')).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Pause our song'));
    });
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Play our song'));
    });

    fireEvent.click(screen.getByText(/my promises to you/));
    expect(screen.getByText('These are my promises')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Go to letter'));
    expect(screen.getByText('A letter, just for you')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Open the letter'));
    fireEvent.click(screen.getByText(/Let me show you us/));
    fireEvent.click(screen.getByText(/One last thing/));
    fireEvent.click(screen.getByText(/Yes, always/));
    fireEvent.click(screen.getByText(/Relive it again/));
    expect(screen.getByLabelText('Open your surprise')).toBeTruthy();
  });

  it('survives a blocked autoplay', async () => {
    HTMLMediaElement.prototype.play = vi.fn(() => Promise.reject(new Error('blocked')));
    render(<SurpriseForHim />);
    expect(screen.queryByLabelText('Play our song')).toBeNull();
    await tick(6);
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Open your surprise'));
    });
    await tick(2);
    expect(screen.getByLabelText('Play our song')).toBeTruthy();
  });
});
