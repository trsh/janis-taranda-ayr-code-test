import { render, screen } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  const element = screen.getByText(/Put your app here/i);
  expect(element).toBeInTheDocument();
});
