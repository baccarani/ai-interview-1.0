import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe("App", () => {
  test("DUMMY TEST", () => {
    expect(1 + 2).toEqual(3);
  });

  test("Should render app component", () => {
    render(<App />);
  });
});
