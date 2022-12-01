import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Home } from "./home";

describe("Home page", () => {
  it("render the header", () => {
    const { getByRole } = render(<Home />);

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      /memory game/i
    );
  });

  it("renders the cards", () => {
    const { getAllByTestId } = render(<Home />);

    expect(getAllByTestId("card")).toHaveLength(16);
  });

  it("reveals the card content on clicking", async () => {
    const user = userEvent.setup();

    const { getAllByTestId, queryByText } = render(<Home />);

    expect(queryByText(/[A-H]/)).toBeNull();
    const card = getAllByTestId("card")[5];

    await user.click(card);
    expect(queryByText(/[A-H]/)).not.toBeNull();
  });
});
