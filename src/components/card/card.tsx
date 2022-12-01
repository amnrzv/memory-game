import { useState } from "react";
import styled from "styled-components";

interface CardProps {
  id: number;
  value: string;
  revealed: boolean;
  onClickHandler: (id: number) => void;
}

export const Card = ({ id, value, revealed, onClickHandler }: CardProps) => {
  return (
    <CardWrapper
      data-testid="card"
      tabIndex={0}
      onClick={() => {
        onClickHandler(id);
      }}
    >
      {revealed ? value : ""}
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
