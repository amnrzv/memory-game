import { GetServerSideProps } from "next";

import { shuffledBoard } from "../ui/game/game-board";
import { Game, Image } from "../ui/game";
export default Game;

export const getServerSideProps: GetServerSideProps<{
  catImages: Image[];
  board: number[];
}> = async () => {
  try {
    const res = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=8"
    );
    const catImages: Image[] = await res.json();

    return {
      props: {
        catImages,
        board: shuffledBoard,
      },
    };
  } catch (error) {
    return {
      props: { catImages: [], board: shuffledBoard },
    };
  }
};
