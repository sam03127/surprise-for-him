import { render, screen, fireEvent } from '@testing-library/react';
import { SurpriseForHim } from './surprise-for-him.js';

describe('SurpriseForHim', () => {
  it('flips a promise card and counts it as unwrapped', () => {
    render(<SurpriseForHim initialStage={2} />);
    const card = screen.getAllByRole('button', { pressed: false })[0];
    fireEvent.click(card);
    expect(card.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText(/1\/6 unwrapped/)).toBeTruthy();
  });

  it('shows the answer after saying yes in the finale', () => {
    render(<SurpriseForHim initialStage={5} />);
    fireEvent.click(screen.getByText(/Yes, always/));
    expect(screen.getByText(/I knew it/)).toBeTruthy();
  });
});
