import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

export default function OrderCancel() {
  return (
    <Container>
      <h2>결제를 취소하였습니다</h2>
    </Container>
  );
}
