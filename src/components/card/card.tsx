import styled from "styled-components";

interface CardProps {
  id: number;
  imgUrl?: string;
  value: string;
  isRevealed: boolean;
  onClickHandler: (id: number) => void;
}

const renderImageOrBackupText = (
  isRevealed: boolean,
  value: string,
  imgUrl?: string
) => {
  if (!imgUrl && isRevealed) {
    return <CardText>{value}</CardText>;
  }

  return (
    <CardImage src={imgUrl} alt={`cat ${value}`} isRevealed={isRevealed} />
  );
};

export const Card = ({
  id,
  imgUrl,
  value,
  isRevealed,
  onClickHandler,
}: CardProps) => {
  return (
    <CardWrapper
      data-testid="card"
      tabIndex={0}
      onClick={() => {
        onClickHandler(id);
      }}
    >
      {renderImageOrBackupText(isRevealed, value, imgUrl)}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  width: calc(100vw / 4 - 4rem);
  border: solid 2px coral;
  cursor: pointer;
  overflow: hidden;

  :hover,
  :focus {
    box-shadow: 0 0 10px 0px coral;
    transform: scale(1.05);
  }
`;

const CardImage = styled.img<{ isRevealed: boolean }>`
  height: 100%;

  // to kick off image loading immediately
  // instead of loading on reveal
  opacity: ${({ isRevealed }) => (isRevealed ? 1 : 0)};
`;

const CardText = styled.div``;
