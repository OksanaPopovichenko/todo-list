import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../pages/Homepage/App";

describe("App component", () => {
  test("renders the heading", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /ToDo List/i });
    expect(heading).toBeInTheDocument();
  });
});
