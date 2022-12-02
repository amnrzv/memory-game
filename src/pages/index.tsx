import { GetServerSideProps } from "next";

import { shuffledBoard } from "../ui/home/game-board";
import { Home, Image } from "../ui/home";
export default Home;

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
