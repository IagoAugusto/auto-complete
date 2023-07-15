import { render, screen } from "@testing-library/react";
import AutoComplete from "./AutoComplete";

test("renders autocomplete", () => {
  render(<AutoComplete />);
  const element = screen.getByText(/Search Placeholders/i);
  expect(element).toBeInTheDocument();
});
