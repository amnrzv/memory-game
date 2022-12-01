import { render } from "@testing-library/react";
import { Home } from "./home";

describe("Home page", () => {
  it("render the header", () => {
    const { getByRole } = render(<Home />);

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      /memory game/i
    );
  });
});
