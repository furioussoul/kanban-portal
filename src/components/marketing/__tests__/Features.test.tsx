import { render, screen } from '@testing-library/react';
import { Features } from '../Features';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/constants/marketing', () => ({
  FEATURES: [
    {
      title: 'Feature A',
      description: 'Desc A',
      icon: 'Brain',
    },
    {
      title: 'Feature B',
      description: 'Desc B',
      icon: 'Layout',
    },
    {
      title: 'Feature C',
      description: 'Desc C',
      icon: 'Github',
    },
  ],
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, viewport, initial, animate, transition, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Features Component', () => {
  it('renders all features', () => {
    render(<Features />);
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Desc A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.getByText('Desc B')).toBeInTheDocument();
    expect(screen.getByText('Feature C')).toBeInTheDocument();
    expect(screen.getByText('Desc C')).toBeInTheDocument();
  });
});
