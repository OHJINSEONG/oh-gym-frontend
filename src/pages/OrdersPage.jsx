import { useEffect } from 'react';
import styled from 'styled-components';
import { PaddingTop } from '../conponents/ui/Padding';
import useOrderStore from '../hooks/useOrderStore';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
  width: 400px;
  min-height: 774px;
  background-color: white;

  h1{
    font-size: 28px;
    font-weight: 600;
    width: 90%;
    border-bottom: 1px solid #D1D1D1;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  ul{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
  }
`;

const Order = styled.li`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;

    img{
      width: 120px;
      height: 120px;
      border-radius: 20px;
      box-shadow: 0px 6px 6px 3px gray;
      margin-right: 10px;
    }
`;

const OrderInformationWrapper = styled.div`
    display: flex;
    height: 120px;
    margin-bottom: 20px;
`;

const OrderInformation = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    padding: 10px;
    
    height: 120px;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;

    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    p{
      font-size: 12px;
      margin-right: 20px;
    }

    h2{
      font-size: 15px;
      font-weight: 600;
    }

    h3{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 30px;
      border-radius: 10px;
      color:white;
      background-color: #EF781A;
      margin-top: 10px;
    }
`;

export default function OrdersPage() {
  const orderStore = useOrderStore();

  const { orders } = orderStore;

  useEffect(() => {
    orderStore.fetchOrders();
    console.log(orders);
  }, []);

  return (
    <PaddingTop>
      <Container>
        <h1>주문 내역</h1>
        <ul>
          {orders?.map((order) => (
            <Order key={order.order?.id}>
              <OrderInformationWrapper>
                <img src={order.productInformation.trainerImage} />
                <OrderInformation>
                  <div>
                    <p>구매일시:</p>
                    <h2>{dateFormatter.localDate(new Date(order.order.orderTime))}</h2>
                  </div>
                  <div>
                    <p>담당 트레이너:</p>
                    <h2>
                      {order.productInformation.trainerUserName}
                      {' '}
                      트레이너
                    </h2>
                  </div>
                  <div>
                    <p>
                      상품명:
                    </p>
                    <h2>
                      {order.order.itemName}
                      {' '}
                      {order.optionInformation.ptTimes}
                      회
                    </h2>
                  </div>
                  <div>
                    <p>
                      결제 금액:
                    </p>
                    <h2>
                      {order.order.totalPrice.toLocaleString()}
                      원
                    </h2>
                  </div>
                  {order.ptTicket?.status === 'INUSE'
                    ? (
                      <div>
                        <h3>사용 완료</h3>
                      </div>
                    )
                    : (
                      <div>
                        <h3>미사용</h3>
                      </div>
                    )}
                </OrderInformation>
              </OrderInformationWrapper>
            </Order>
          ))}
        </ul>
      </Container>
    </PaddingTop>
  );
}
