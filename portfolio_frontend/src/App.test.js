import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio navigation', () => {
  render(<App />);
  const aboutLink = screen.getByRole('link', { name: /about/i });
  expect(aboutLink).toBeInTheDocument();
});
