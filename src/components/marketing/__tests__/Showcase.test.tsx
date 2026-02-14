import { render, screen } from '@testing-library/react';
import { Showcase } from '../Showcase';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/constants/marketing', () => ({
  SHOWCASE_CONTENT: {
    badge: 'Showcase Badge',
    title: 'Showcase Title',
    description: 'Showcase Description',
    features: ['S-Feature 1', 'S-Feature 2'],
  },
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, viewport, initial, animate, transition, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('Showcase Component', () => {
  it('renders showcase content and image', () => {
    render(<Showcase />);
    expect(screen.getByText('Showcase Badge')).toBeInTheDocument();
    expect(screen.getByText('Showcase Title')).toBeInTheDocument();
    expect(screen.getByText('Showcase Description')).toBeInTheDocument();
    expect(screen.getByText('S-Feature 1')).toBeInTheDocument();
    expect(screen.getByAltText('AI Kanban Interaction')).toBeInTheDocument();
  });
});
