import { render, screen } from '@testing-library/react';
import { PricingTable } from '../PricingTable';
import { describe, it, expect, vi } from 'vitest';

// Mock pricing constants
vi.mock('@/lib/constants/pricing', () => ({
  PRICING_HEADER: {
    title: 'Test Pricing',
    description: 'Test Description',
  },
  PRICING_TIERS: [
    {
      name: 'FREE',
      price: '$0',
      credits: '100 Credits',
      description: 'Free plan',
      features: ['Feature 1', 'Feature 2'],
    },
    {
      name: 'PRO',
      price: '$19',
      credits: 'Unlimited',
      description: 'Pro plan',
      features: ['All Features', 'Support'],
      highlight: true,
    },
  ],
}));

vi.mock('@/lib/constants/marketing', () => ({
  APP_URL: 'https://app.test.com',
}));

describe('PricingTable Component', () => {
  it('renders header and pricing tiers', () => {
    render(<PricingTable />);
    
    expect(screen.getByText('Test Pricing')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    
    expect(screen.getByText('FREE')).toBeInTheDocument();
    expect(screen.getByText('PRO')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('$19')).toBeInTheDocument();
  });

  it('renders features for each tier', () => {
    render(<PricingTable />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('highlights recommended tier', () => {
    render(<PricingTable />);
    expect(screen.getByText('RECOMMENDED')).toBeInTheDocument();
  });
});
