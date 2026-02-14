import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/constants/marketing', () => ({
  HERO_CONTENT: {
    badge: 'Test Badge',
    title: 'Test Hero Title',
    description: 'Test Hero Description',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Try Demo',
  },
  APP_URL: 'https://app.test.com',
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, viewport, initial, animate, transition, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, initial, animate, transition, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, initial, animate, transition, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

describe('Hero Component', () => {
  it('renders badge, title and description', () => {
    render(<Hero />);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
    expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
    expect(screen.getByText('Test Hero Description')).toBeInTheDocument();
  });

  it('contains call to action buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Try Demo')).toBeInTheDocument();
  });
});
