import { useState } from "react";
import styled from "styled-components";

interface CardProps {
  id: string;
}

export const Card = ({ id }: CardProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <CardWrapper
      data-testid="card"
      tabIndex={0}
      onClick={() =>
        setRevealed((currentRevealedState) => !currentRevealedState)
      }
    >
      {revealed ? id : ""}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  border: solid 2px coral;
  cursor: pointer;

  :hover,
  :focus {
    box-shadow: 0 0 10px 0px coral;
    transform: scale(1.05);
  }
`;
