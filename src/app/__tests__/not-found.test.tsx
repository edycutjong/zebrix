import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

import { ReactNode, HTMLAttributes } from 'react';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('NotFound Page', () => {
  it('renders the 404 heading and status code', () => {
    render(<NotFound />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('MARKET_NOT_FOUND')).toBeInTheDocument();
  });

  it('renders navigation links to return home and dashboard', () => {
    render(<NotFound />);
    
    const returnLink = screen.getByRole('link', { name: /RETURN/i });
    expect(returnLink).toBeInTheDocument();
    expect(returnLink).toHaveAttribute('href', '/');

    const dashboardLink = screen.getByRole('link', { name: /DASHBOARD/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });

  it('displays the appropriate error message', () => {
    render(<NotFound />);
    
    expect(
      screen.getByText(/The prediction market or page you are looking for has been resolved or does not exist./i)
    ).toBeInTheDocument();
  });
});
