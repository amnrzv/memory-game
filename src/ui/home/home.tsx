import styled from "styled-components";

import { Card } from "../../components/card";

const board = [
  "D",
  "F",
  "G",
  "A",
  "E",
  "H",
  "C",
  "B",
  "F",
  "D",
  "A",
  "E",
  "C",
  "B",
  "G",
  "H",
];

export const Home = () => {
  return (
    <Container>
      <Header>Memory game</Header>
      <GameBoard>
        {board.map((letter, index) => (
          <Card id={letter} key={index} />
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
