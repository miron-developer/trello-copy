import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

test("renders app", () => {
  render(<App />);
  const linkElement = screen.getByText(/Default Desk/i);
  expect(linkElement).toBeInTheDocument();
});
