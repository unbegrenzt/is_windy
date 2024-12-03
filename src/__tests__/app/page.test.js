// __tests__/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('Home', () => {
  it('renders the Next.js logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the Vercel logomark', () => {
    render(<Home />);
    const vercelLogo = screen.getByAltText('Vercel logomark');
    expect(vercelLogo).toBeInTheDocument();
  });

  it('renders the heading "Get started by editing src/app/page.tsx."', () => {
    render(<Home />);
    const heading = screen.getByText(/Get started by editing/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the "Deploy now" link', () => {
    render(<Home />);
    const deployLink = screen.getByRole('link', { name: /Deploy now/i });
    expect(deployLink).toBeInTheDocument();
  });

  it('renders the "Read our docs" link', () => {
    render(<Home />);
    const docsLink = screen.getByRole('link', { name: /Read our docs/i });
    expect(docsLink).toBeInTheDocument();
  });

  it('renders the footer links', () => {
    render(<Home />);
    const learnLink = screen.getByRole('link', { name: /Learn/i });
    const examplesLink = screen.getByRole('link', { name: /Examples/i });
    const nextjsLink = screen.getByRole('link', { name: /Go to nextjs.org/i });

    expect(learnLink).toBeInTheDocument();
    expect(examplesLink).toBeInTheDocument();
    expect(nextjsLink).toBeInTheDocument();
  });
});