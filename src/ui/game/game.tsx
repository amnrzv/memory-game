import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card } from "../../components/card";
import { Image } from "./game.interface";

const DELAY_BEFORE_REMOVE_IN_MS = 600;
const DELAY_BEFORE_FLIP_BACK_IN_MS = 300;

interface GameProps {
  catImages: Image[];
  board: number[];
}

export const Game = ({ catImages, board }: GameProps) => {
  const [pairsFlipped, setPairsFlipped] = useState(0);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [revealedList, setRevealed] = useState<number[]>([]);

  const router = useRouter();
  const isGameOver = revealedList.length === board.length;

  useEffect(() => {
    if (firstCard === null || secondCard === null) {
      return;
    }

    let flipTimeout: NodeJS.Timeout;
    let revealTimeout: NodeJS.Timeout;
    if (board[firstCard] === board[secondCard]) {
      revealTimeout = setTimeout(() => {
        setRevealed((currentRevealedList) => [
          ...currentRevealedList,
          firstCard,
          secondCard,
        ]);
        setFirstCard(null);
        setSecondCard(null);
      }, DELAY_BEFORE_REMOVE_IN_MS);
      return;
    }

    flipTimeout = setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
    }, DELAY_BEFORE_FLIP_BACK_IN_MS);

    return () => {
      if (revealTimeout) {
        clearTimeout(revealTimeout);
      }

      if (flipTimeout) {
        clearTimeout(flipTimeout);
      }
    };
  }, [board, firstCard, secondCard]);

  const onCardClicked = (id: number) => {
    if (firstCard !== null && secondCard !== null) {
      return;
    }

    if (firstCard === null) {
      setFirstCard(id);
    } else if (id !== firstCard) {
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

      {isGameOver ? (
        <RestartButton onClick={() => router.reload()}>
          PLAY AGAIN?
        </RestartButton>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;

  @media (min-width: 40rem) {
    margin: 4rem;
  }
`;

const GameBoard = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  width: 100%;
  max-width: 60rem;

  @media (min-width: 40rem) {
    gap: 2rem;
  }
`;

const ScoreBoard = styled.aside`
  font-size: 2rem;
  margin-top: 1rem;
`;

const RestartButton = styled.button`
  position: absolute;
  top: 40%;
  left: 50%;
  width: fit-content;
  cursor: pointer;
  display: block;
  font-size: 3rem;
  padding: 1.5rem;
  background: var(--btn-bg);
  border: none;
  border-radius: var(--border-radius);
  color: #e5c1b3;
  transform: translate(-50%, -50%) rotateZ(-5deg);

  :hover,
  :focus {
    transform: translate(-50%, -50%) scale(1.03) rotateZ(-5deg);
    color: #eee;
  }

  @media (min-width: 40rem) {
    font-size: 5rem;
    padding: 2rem;
    top: 50%;
  }
`;
