import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { IntroSection } from './intro-section.js';
import { MemoriesSection } from './memories-section.js';
import { LetterSection } from './letter-section.js';
import { CarouselSection } from './carousel-section.js';
import { FinaleSection } from './finale-section.js';
import { PromisesSection } from './promises-section.js';

/** Advances fake timers in small steps so chained effects re-run between ticks. */
function tick(steps: number, ms = 2000) {
  for (let i = 0; i < steps; i++) {
    act(() => {
      vi.advanceTimersByTime(ms);
    });
  }
}

describe('IntroSection', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('reveals the gift after the lines, then opens it on tap', () => {
    const onStart = vi.fn();
    const onOpen = vi.fn();
    render(<IntroSection onStart={onStart} onOpen={onOpen} />);
    const gift = screen.getByLabelText('Open your surprise') as HTMLButtonElement;
    expect(gift.disabled).toBe(true);
    tick(6);
    expect(gift.disabled).toBe(false);
    expect(screen.getByText('Happy 3 months, my love!')).toBeTruthy();
    expect(screen.getByText('Here’s something just for you, my love.')).toBeTruthy();
    expect(screen.queryByText(/Close your eyes/)).toBeNull();
    fireEvent.click(gift);
    fireEvent.click(gift);
    expect(onStart).toHaveBeenCalledTimes(1);
    tick(2);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});

describe('MemoriesSection', () => {
  it('opens and closes a memory, and goes next', () => {
    const onNext = vi.fn();
    render(<MemoriesSection onNext={onNext} />);
    fireEvent.click(screen.getAllByRole('button').find((b) => b.textContent?.includes('Our forever selfie'))!);
    expect(screen.getByRole('dialog')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByText(/my promises to you/));
    expect(onNext).toHaveBeenCalled();
  });

  it('closes the memory when the backdrop is tapped', () => {
    render(<MemoriesSection onNext={vi.fn()} />);
    fireEvent.click(screen.getAllByRole('button').find((b) => b.textContent?.includes('That smile of yours'))!);
    fireEvent.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('PromisesSection', () => {
  it('lights up the next button after every promise is read', () => {
    const onNext = vi.fn();
    render(<PromisesSection onNext={onNext} />);
    screen.getAllByRole('button', { pressed: false }).forEach((b) => fireEvent.click(b));
    const next = screen.getByText(/I wrote you a letter too/);
    fireEvent.click(next);
    expect(onNext).toHaveBeenCalled();
  });
});

describe('LetterSection', () => {
  it('opens the envelope to show the letter', () => {
    const onNext = vi.fn();
    render(<LetterSection onNext={onNext} />);
    fireEvent.click(screen.getByLabelText('Open the letter'));
    expect(screen.getByText('Mere Chenna,')).toBeTruthy();
    expect(screen.getByText('Your wife, Mrs. Chenna 💋')).toBeTruthy();
    expect(screen.getByText(/These past two months/)).toBeTruthy();
    expect(screen.queryByText(/endless cups of chai/)).toBeNull();
    fireEvent.click(screen.getByText(/Let me show you us/));
    expect(onNext).toHaveBeenCalled();
  });
});

describe('CarouselSection', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('auto-plays, navigates with arrows and swipe, and goes next', () => {
    const onNext = vi.fn();
    const { container } = render(<CarouselSection onNext={onNext} />);
    const rotatedPhoto = container.querySelector<HTMLImageElement>('img[alt="That smile of yours"]');
    expect(rotatedPhoto?.className).toContain('rotated');
    expect(rotatedPhoto?.style.transform).toBe('translate(-50%, -50%) rotate(-90deg)');
    act(() => {
      vi.advanceTimersByTime(3300);
    });
    fireEvent.click(screen.getByLabelText('Next photo'));
    fireEvent.click(screen.getByLabelText('Previous photo'));
    const stage = container.querySelector('figure')!.parentElement!.parentElement!;
    fireEvent.touchStart(stage, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 100 }] });
    fireEvent.touchStart(stage, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 200 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 200 }] });
    fireEvent.click(screen.getByText(/One last thing/));
    expect(onNext).toHaveBeenCalled();
  });
});

describe('FinaleSection', () => {
  it('makes the "no" button dodge, then shows the answer and can replay', () => {
    const onReplay = vi.fn();
    render(<FinaleSection onReplay={onReplay} />);
    fireEvent.mouseEnter(screen.getByText('No'));
    expect(screen.getByText('Are you sure?')).toBeTruthy();
    fireEvent.click(screen.getByText('Are you sure?'));
    fireEvent.click(screen.getByText(/Yes, always/));
    fireEvent.click(screen.getByText(/Relive it again/));
    expect(onReplay).toHaveBeenCalled();
  });
});
