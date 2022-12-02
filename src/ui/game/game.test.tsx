import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Game } from "./game";

const shuffledBoard = [5, 4, 2, 2, 1, 5, 0, 3, 3, 7, 6, 6, 0, 1, 7, 4];
const smallShuffledBoard = [0, 1, 1, 0];

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Game page", () => {
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

    expect(queryByText(/^[0-7]$/)).toBeNull();
    const card = getAllByTestId("card-slot")[5];

    await user.click(card);
    expect(queryByText(/^[0-7]$/)).not.toBeNull();
  });

  it("should remove the cards from the board and leave an empty car slot if match found", async () => {
    const user = userEvent.setup();

    const { getAllByTestId } = render(
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

    await waitFor(() => expect(queryAllByText(/^[0-7]$/)).toHaveLength(0));
  });

  it("should show the score", () => {
    const { getByText } = render(<Game catImages={[]} board={shuffledBoard} />);

    expect(getByText("PAIRS FLIPPED: 0")).toBeVisible();
  });

  it("should update the score with each pair flipped", async () => {
    const user = userEvent.setup();

    const { getByText, getAllByTestId } = render(
      <Game catImages={[]} board={shuffledBoard} />
    );

    const cardOne = getAllByTestId("card-slot")[6];
    const cardTwo = getAllByTestId("card-slot")[12];

    await user.click(cardOne);
    await user.click(cardTwo);

    expect(getByText("PAIRS FLIPPED: 1")).toBeVisible();
  });

  it("should show the restart button when all pairs are matched", async () => {
    const user = userEvent.setup();

    act(() => {
      render(<Game catImages={[]} board={smallShuffledBoard} />);
    });

    const cardOne = screen.getAllByTestId("card-slot")[1];
    const cardTwo = screen.getAllByTestId("card-slot")[2];

    const cardThree = screen.getAllByTestId("card-slot")[3];
    const cardFour = screen.getAllByTestId("card-slot")[0];

    act(() => {
      user.click(cardOne);
      user.click(cardTwo);
    });

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 601)
    );

    act(() => {
      user.click(cardThree);
      user.click(cardFour);
    });

    await waitFor(() => {
      expect(screen.getByText("Restart game")).toBeVisible();
    });
  });
});
