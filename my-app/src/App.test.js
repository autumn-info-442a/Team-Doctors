import { render, screen } from '@testing-library/react';
import SurveyController from './SurveyController';

test('renders learn react link', () => {
  render(<SurveyController />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
