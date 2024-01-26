import { ReactElement } from "react";
import { MockThemeProvider } from "./mocks/MockThemeProvider";
import { RenderOptions, render } from "@testing-library/react";

export const renderWithThemeContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MockThemeProvider>{children}</MockThemeProvider>
    ),
    ...options,
  });
