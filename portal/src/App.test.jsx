import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('Complete details and a valid submission URL saves submission', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Areej' } });
  fireEvent.change(screen.getByPlaceholderText('Registration Number'), { target: { value: 'FA23-BAI-018' } });
  fireEvent.change(screen.getByPlaceholderText('Assignment Title'), { target: { value: 'DevOps Lab Mid' } });
  fireEvent.change(screen.getByPlaceholderText('Submission URL'), { target: { value: 'https://github.com/areej/repo' } });
  fireEvent.click(screen.getByText('Submit'));
  
  expect(screen.getByTestId('submission-list')).toHaveTextContent('FA23-BAI-018');
});

test('Missing registration number rejects with a validation message', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Areej' } });
  fireEvent.change(screen.getByPlaceholderText('Assignment Title'), { target: { value: 'DevOps Lab Mid' } });
  fireEvent.change(screen.getByPlaceholderText('Submission URL'), { target: { value: 'https://github.com/areej/repo' } });
  fireEvent.click(screen.getByText('Submit'));
  
  expect(screen.getByRole('alert')).toHaveTextContent('Registration number is required');
});

test('Invalid submission URL rejects and is not saved', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Areej' } });
  fireEvent.change(screen.getByPlaceholderText('Registration Number'), { target: { value: 'FA23-BAI-018' } });
  fireEvent.change(screen.getByPlaceholderText('Assignment Title'), { target: { value: 'DevOps Lab Mid' } });
  fireEvent.change(screen.getByPlaceholderText('Submission URL'), { target: { value: 'not-a-url' } });
  fireEvent.click(screen.getByText('Submit'));
  
  expect(screen.getByRole('alert')).toHaveTextContent('Invalid submission URL');
});