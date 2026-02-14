import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { describe, it, expect, vi } from 'vitest';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

// Mock constants
vi.mock('@/lib/constants/marketing', () => ({
  NAV_LINKS: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: 'https://docs.aikanban.com' },
  ],
  APP_URL: 'https://app.test.com',
}));

describe('Navbar Component', () => {
  it('renders logo and navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('AI Kanban')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
  });

  it('toggles mobile menu when clicked', () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    
    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(menuButton);
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });
});
