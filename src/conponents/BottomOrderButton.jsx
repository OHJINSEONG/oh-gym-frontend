import styled from 'styled-components';
import useOrderFormStore from '../hooks/useOrderFormStore';
import { orderFormStore } from '../stores/OrderFormStore';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  bottom:2%;
  width: 370px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;

const OrderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  .kakaoPay{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 49%;
    height: 50px;
    
    background-color: #f8e400;
    border-radius: 10px;
  }

  .testPay{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 49%;
    height: 50px;
    
    background-color: #EF781A;
    border-radius: 10px
  }

  button{
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-weight: 600;
  }
`;

export default function BottomOrderButton({ order }) {
  // eslint-disable-next-line no-shadow
  const orderFormStore = useOrderFormStore();

  const handleClickKakaoOrder = async () => {
    await orderFormStore.onChangeType('KakaoPay');

    order();
  };

  const handleClickTestOrder = async () => {
    await orderFormStore.onChangeType('Test');

    order();
  };

  return (
    <Container>
      <OrderWrapper>
        <div className="kakaoPay">
          <button type="button" onClick={handleClickKakaoOrder}>카카오 페이</button>
        </div>
        <div className="testPay">
          <button type="button" onClick={handleClickTestOrder}>바로결제</button>
        </div>
      </OrderWrapper>
    </Container>
  );
}
