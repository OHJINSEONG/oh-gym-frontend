import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

export default function OrderFail() {
  return (
    <Container>
      <h2>결제 실패</h2>
    </Container>
  );
}
