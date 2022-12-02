import { render } from "@testing-library/react";
import { Menu } from "./menu";

describe("Menu page", () => {
  it("should render the heading", () => {
    const { getByRole } = render(<Menu />);

    expect(getByRole("heading", { level: 1 })).toHaveTextContent("Catssss");
  });

  it("should render the info text", () => {
    const { getByText } = render(<Menu />);

    expect(
      getByText("Flip the cards and find the matching pairs")
    ).toBeVisible();
  });

  it("should render the link to the game", () => {
    const { getByRole } = render(<Menu />);

    expect(getByRole("link")).toHaveAttribute("href", "/game");
  });
});
