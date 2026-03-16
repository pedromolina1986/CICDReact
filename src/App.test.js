import { render, screen } from '@testing-library/react';
import App from './App';

test('renders H1 title CI/CD Test', () => {
  render(<App />);
  const linkElement = screen.getByText(/CI\/CD Test/i);
  expect(linkElement).toBeInTheDocument();
});
