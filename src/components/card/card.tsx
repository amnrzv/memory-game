import styled from "styled-components";

interface CardProps {
  id: number;
  imgUrl?: string;
  value: string;
  isRevealed: boolean;
  onClickHandler: (id: number) => void;
}

export const Card = ({
  id,
  imgUrl,
  value,
  isRevealed,
  onClickHandler,
}: CardProps) => {
  return (
    <CardSlot>
      <CardWrapper
        data-testid="card"
        tabIndex={0}
        onClick={() => {
          onClickHandler(id);
        }}
        imgUrl={imgUrl}
        isRevealed={isRevealed}
      >
        {isRevealed ? <CardText>{value}</CardText> : null}
      </CardWrapper>
    </CardSlot>
  );
};

const CardSlot = styled.div`
  font-size: 3rem;
  height: 10rem;
  width: calc(100vw / 4 - 4rem);
  border: solid 1px coral;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 12px 0px inset coral;
  background: #ffc0cb09;

  :hover,
  :focus {
    box-shadow: 0 0 10px 0px coral;
    transform: scale(1.05);
  }
`;

interface CardWrapperProps {
  imgUrl?: string;
  isRevealed: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
  position: relative;
  height: 100%;
  width: 100%;
  background: ${({ imgUrl }) => `url(${imgUrl})` || ""};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  font-size: 3rem;

  // to kick off image loading immediately
  // instead of loading on reveal
  opacity: ${({ isRevealed }) => (isRevealed ? 1 : 0)};
`;

// Backup in case an image isn't loaded
const CardText = styled.p`
  position: absolute;
  z-index: -1;
`;
