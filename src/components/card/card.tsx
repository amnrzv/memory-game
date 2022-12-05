import styled from "styled-components";

interface CardProps {
  id: number;
  imgUrl?: string;
  value: string;
  isFlipped: boolean;
  isRevealed: boolean;
  onClickHandler: (id: number) => void;
}

export const Card = ({
  id,
  imgUrl,
  value,
  isFlipped,
  isRevealed,
  onClickHandler,
}: CardProps) => {
  if (isRevealed) {
    return <EmptyCardSlot data-testid="empty-card-slot" />;
  }

  return (
    <CardSlot
      data-testid="card-slot"
      onClick={() => {
        onClickHandler(id);
      }}
    >
      <CardWrapper imgUrl={imgUrl} isFlipped={isFlipped}>
        {isFlipped ? <CardText>{value}</CardText> : null}
      </CardWrapper>
    </CardSlot>
  );
};

const CardSlot = styled.button`
  font-size: 3rem;
  height: var(--card-height);
  /* min-width: var(--card-width); */
  padding: 0;
  cursor: pointer;
  border: solid 1px var(--theme-colour);
  border-radius: var(--border-radius);
  overflow: hidden;

  background: var(--theme-colour-bg);

  :hover,
  :focus-visible {
    box-shadow: 0 0 10px 0px var(--theme-colour);
    transform: scale(1.03);
  }
`;

const EmptyCardSlot = styled.div`
  height: var(--card-height);
  /* min-width: var(--card-width); */
  border: solid 1px var(--empty-card-border);
  border-radius: var(--border-radius);
`;

interface CardWrapperProps {
  imgUrl?: string;
  isFlipped: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
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
  opacity: ${({ isFlipped }) => (isFlipped ? 1 : 0)};
`;

// Backup in case an image isn't loaded
const CardText = styled.p`
  position: absolute;
  z-index: -1;
`;
