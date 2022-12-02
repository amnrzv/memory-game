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
`;

const Header = styled.h1`
  font-size: 10rem;
  margin: 0 auto;
  padding-block: 1.5rem;
  width: fit-content;
`;

const Info = styled.p`
  font-size: 1.5rem;
  margin: 0 auto;
  color: #777;
`;

const StartLink = styled(Link)`
  display: block;
  font-size: 4rem;
  padding: 2rem;
  background: #894127;
  border: none;
  border-radius: 1rem;
  color: #e5c1b3;

  margin-top: 4rem;

  :hover,
  :focus {
    transform: scale(1.03);
    color: #eee;
  }
`;
