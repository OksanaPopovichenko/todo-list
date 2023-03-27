import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders the heading", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /ToDo List/i });
    expect(heading).toBeInTheDocument();
  });
});
