import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  bottom:2%;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;

const OrderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 50px;
    
    background-color: #f8e400;
  }

  button{
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-weight: 600;
  }
`;

export default function BottomOrderButton({ order }) {
  const handleClickOrder = () => {
    order();
  };

  return (
    <Container>
      <OrderWrapper>
        <div>
          <button type="button" onClick={handleClickOrder}>카카오 페이</button>
        </div>
      </OrderWrapper>
    </Container>
  );
}
