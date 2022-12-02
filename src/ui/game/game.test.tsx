import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Game } from "./game";

const shuffledBoard = [5, 4, 2, 2, 1, 5, 0, 3, 3, 7, 6, 6, 0, 1, 7, 4];

describe("Game page", () => {
  it("should render the header", () => {
    const { getByRole } = render(<Game catImages={[]} board={shuffledBoard} />);

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      /memory game/i
    );
  });

  it("should render the cards", () => {
    const { getAllByTestId } = render(
      <Game catImages={[]} board={shuffledBoard} />
    );

    expect(getAllByTestId("card-slot")).toHaveLength(16);
  });

  it("should reveal the card content on clicking", async () => {
    const user = userEvent.setup();
    const { getAllByTestId, queryByText } = render(
      <Game catImages={[]} board={shuffledBoard} />
    );

    expect(queryByText(/[0-7]/)).toBeNull();
    const card = getAllByTestId("card-slot")[5];

    await user.click(card);
    expect(queryByText(/[0-7]/)).not.toBeNull();
  });

  it("should remove the cards from the board and leave an empty car slot if match found", async () => {
    const user = userEvent.setup();

    const { getAllByTestId, queryAllByText } = render(
      <Game catImages={[]} board={shuffledBoard} />
    );

    const cardOne = getAllByTestId("card-slot")[6];
    const cardTwo = getAllByTestId("card-slot")[12];

    await user.click(cardOne);
    await user.click(cardTwo);

    await waitFor(() => {
      expect(getAllByTestId("empty-card-slot")).toHaveLength(2);
    });
  });

  it("should hide the cards if match not found", async () => {
    const user = userEvent.setup();

    const { getAllByTestId, queryAllByText } = render(
      <Game catImages={[]} board={shuffledBoard} />
    );

    const cardOne = getAllByTestId("card-slot")[5];
    const cardTwo = getAllByTestId("card-slot")[10];

    await user.click(cardOne);
    await user.click(cardTwo);

    await waitFor(() => expect(queryAllByText(/[0-7]/)).toHaveLength(0));
  });
});
