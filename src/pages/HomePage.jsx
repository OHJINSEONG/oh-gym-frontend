import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export default function HomePage() {
  return (
    <Container>
      <h1>Hello</h1>
    </Container>
  );
}
