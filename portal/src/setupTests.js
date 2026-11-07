import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Clear the DOM after each test runs
afterEach(() => {
  cleanup();
});