import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Home } from "./home";

describe("Home page", () => {
  it("should render the header", () => {
    const { getByRole } = render(<Home />);

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      /memory game/i
    );
  });

  it("should render the cards", () => {
    const { getAllByTestId } = render(<Home />);

    expect(getAllByTestId("card")).toHaveLength(16);
  });

  it("should reveal the card content on clicking", async () => {
    const user = userEvent.setup();
    const { getAllByTestId, queryByText } = render(<Home />);

    expect(queryByText(/[A-H]/)).toBeNull();
    const card = getAllByTestId("card")[5];

    await user.click(card);
    expect(queryByText(/[A-H]/)).not.toBeNull();
  });

  it("should keep the cards revealed if match found", async () => {
    const user = userEvent.setup();

    const { getAllByTestId, queryAllByText } = render(<Home />);

    const cardOne = getAllByTestId("card")[5];
    const cardTwo = getAllByTestId("card")[15];

    await user.click(cardOne);
    await user.click(cardTwo);

    expect(queryAllByText(/H/)).toHaveLength(2);
  });

  it("should hide the cards if match not found", async () => {
    const user = userEvent.setup();

    const { getAllByTestId, queryAllByText } = render(<Home />);

    const cardOne = getAllByTestId("card")[5];
    const cardTwo = getAllByTestId("card")[10];

    await user.click(cardOne);
    await user.click(cardTwo);

    await waitFor(() => expect(queryAllByText(/[A-H]/)).toHaveLength(0));
  });
});
