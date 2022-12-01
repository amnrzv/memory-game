import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Home } from "./home";

jest.mock("./game-board", () => ({
  shuffledBoard: [5, 4, 2, 2, 1, 5, 0, 3, 3, 7, 6, 6, 0, 1, 7, 4],
}));

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

    expect(queryByText(/[0-7]/)).toBeNull();
    const card = getAllByTestId("card")[5];

    await user.click(card);
    expect(queryByText(/[0-7]/)).not.toBeNull();
  });

  it("should keep the cards revealed if match found", async () => {
    const user = userEvent.setup();

    const { getAllByTestId, queryAllByText } = render(<Home />);

    const cardOne = getAllByTestId("card")[6];
    const cardTwo = getAllByTestId("card")[12];

    await user.click(cardOne);
    await user.click(cardTwo);

    expect(queryAllByText("0")).toHaveLength(2);
  });

  it("should hide the cards if match not found", async () => {
    const user = userEvent.setup();

    const { getAllByTestId, queryAllByText } = render(<Home />);

    const cardOne = getAllByTestId("card")[5];
    const cardTwo = getAllByTestId("card")[10];

    await user.click(cardOne);
    await user.click(cardTwo);

    await waitFor(() => expect(queryAllByText(/[0-7]/)).toHaveLength(0));
  });
});
