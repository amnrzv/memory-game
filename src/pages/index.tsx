import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Header>Memory game</Header>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Header = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-block: 1.5rem;
`;
