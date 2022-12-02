import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card } from "../../components/card";
import { Image } from "./game.interface";

interface GameProps {
  catImages: Image[];
  board: number[];
}

const CARD_FLIP_DELAY_IN_MS = 600;
export const Game = ({ catImages, board }: GameProps) => {
  const [pairsFlipped, setPairsFlipped] = useState(0);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [revealedList, setRevealed] = useState<number[]>([]);

  const router = useRouter();

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
      }, CARD_FLIP_DELAY_IN_MS);
      return;
    }

    setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
    }, CARD_FLIP_DELAY_IN_MS);
  }, [board, firstCard, secondCard]);

  const onCardClicked = (id: number) => {
    if (firstCard === null) {
      setFirstCard(id);
    } else {
      setPairsFlipped((turns) => turns + 1);
      setSecondCard(id);
    }
  };

  return (
    <Container>
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
      <ScoreBoard>PAIRS FLIPPED: {pairsFlipped}</ScoreBoard>
      {revealedList.length === board.length ? (
        <RestartButton onClick={() => router.reload()}>
          Restart game
        </RestartButton>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem;
`;

const GameBoard = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
`;

const ScoreBoard = styled.aside`
  font-size: 2rem;
  margin-top: 1rem;
`;

const RestartButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;
  cursor: pointer;
  display: block;
  font-size: 4rem;
  padding: 2rem;
  background: #894127;
  border: none;
  border-radius: 1rem;
  color: #e5c1b3;
  transform: translate(-50%, -50%) rotateZ(-5deg);

  :hover,
  :focus {
    transform: translate(-50%, -50%) scale(1.03) rotateZ(-5deg);
    color: #eee;
  }
`;
