import Link from "next/link";
import styled from "styled-components";

export const Menu = () => {
  return (
    <Container>
      <Header>Catssss</Header>
      <Info>
        Flip the cards and find all the matching pairs in the fewest turns
      </Info>
      <StartLink href={"/game"}>START</StartLink>
    </Container>
  );
};

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;

  @media (min-width: 30rem) {
    margin: 0 4rem;
  }
`;

const Header = styled.h1`
  font-size: 4rem;
  margin: 0.5rem;

  @media (min-width: 30rem) {
    font-size: 8rem;
  }
`;

const Info = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #777;

  @media (min-width: 30rem) {
    font-size: 1.5rem;
  }
`;

const StartLink = styled(Link)`
  display: inline-block;
  font-size: 3rem;
  padding: 1.5rem;
  background: var(--btn-bg);
  border: none;
  border-radius: var(--border-radius);
  color: #e5c1b3;

  margin-top: 2rem;
  transform: rotateZ(-5deg);

  :hover,
  :focus {
    transform: scale(1.03) rotateZ(-5deg);
    color: #eee;
  }

  @media (min-width: 30rem) {
    font-size: 5rem;
    padding: 2rem;
    margin-top: 4rem;
  }
`;
