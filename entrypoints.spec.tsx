import { render } from '@testing-library/react';
import { render as renderServer } from './server.app-root.js';
import { SurpriseForHim } from './surprise-for-him.js';

describe('entrypoints', () => {
  it('renders the app on the server for SSR', async () => {
    const html = await renderServer({ path: '/' });
    expect(html.length).toBeGreaterThan(0);
  });

  it('mounts into #root when the client entry loads', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    await import('./surprise-for-him.app-root.js');
    await new Promise((r) => setTimeout(r, 50));
    expect(root.innerHTML.length).toBeGreaterThan(0);
  });

  it('renders on its own without a router', () => {
    const { container } = render(<SurpriseForHim />);
    expect(container.firstChild).toBeTruthy();
  });
});
