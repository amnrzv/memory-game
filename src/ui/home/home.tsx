import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card } from "../../components/card";
import { Image } from "./home.interface";

interface HomeProps {
  catImages: Image[];
  board: number[];
}

export const Home = ({ catImages, board }: HomeProps) => {
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [revealedList, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    if (firstCard === null || secondCard === null) {
      return;
    }

    if (board[firstCard] === board[secondCard]) {
      setRevealed((currentRevealedList) => [
        ...currentRevealedList,
        firstCard,
        secondCard,
      ]);

      setFirstCard(null);
      setSecondCard(null);
      return;
    }

    setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
    }, 800);
  }, [board, firstCard, secondCard]);

  const onCardClicked = (id: number) => {
    if (firstCard === null) {
      setFirstCard(id);
    } else {
      setSecondCard(id);
    }
  };

  return (
    <Container>
      <Header>Memory game</Header>
      <GameBoard>
        {board.map((value, index) => (
          <Card
            isRevealed={
              index === firstCard ||
              index === secondCard ||
              revealedList.includes(index)
            }
            id={index}
            imgUrl={catImages.length > value ? catImages[value].url : ""}
            value={value.toString()}
            key={index}
            onClickHandler={onCardClicked}
          />
        ))}
      </GameBoard>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Header = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-block: 1.5rem;
`;

const GameBoard = styled.div`
  margin: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
`;
