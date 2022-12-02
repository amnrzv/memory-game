import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card } from "../../components/card";
import { Image } from "./game.interface";

interface GameProps {
  catImages: Image[];
  board: number[];
}

export const Game = ({ catImages, board }: GameProps) => {
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [revealedList, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    if (firstCard === null || secondCard === null) {
      return;
    }

    if (board[firstCard] === board[secondCard]) {
      setTimeout(() => {
        setRevealed((currentRevealedList) => [
          ...currentRevealedList,
          firstCard,
          secondCard,
        ]);
        setFirstCard(null);
        setSecondCard(null);
      }, 600);
      return;
    }

    setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
    }, 600);
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
            isFlipped={index === firstCard || index === secondCard}
            isRevealed={revealedList.includes(index)}
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
