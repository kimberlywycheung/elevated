// const {describe, expect, test} = require('@jest/globals');

import { render, screen } from '@testing-library/react';

test('should show login form', () => {
  expect(sum(1, 2)).toBe(3);
});

function sum(a, b) {
  return a + b;
}