import { useEffect } from 'react';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;

  li {
    display: flex;
    width: 300px;
    justify-content: space-between;
    border: 1px solid black
  }
`;

export default function OrdersPage() {
  const orderStore = useOrderStore();

  const { orders } = orderStore;

  useEffect(() => {
    orderStore.fetchOrders();
  }, []);

  return (
    <Container>
      <ul>
        {orders?.map((order) => (
          <li key={order.id}>
            <p>주문내역입니다.</p>
            <p>
              상품명:
              {' '}
              {order.productInformation.title}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
