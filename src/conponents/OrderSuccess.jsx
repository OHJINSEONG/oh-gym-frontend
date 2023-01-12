import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 100px;

div{
  display: flex;
}
`;

export default function OrderSuccess() {
  const orderStore = useOrderStore();

  const location = useLocation();

  const navigate = useNavigate();

  const pgToken = location.search.split('pg_token=')[1];

  const { paymentResult } = orderStore;

  useEffect(() => {
    orderStore.fetchPayResult(pgToken);
  }, []);

  const handleClickHome = () => {
    navigate('/');
  };

  if (!paymentResult.amount) {
    return <p>now loading</p>;
  }

  return (
    <Container>
      <p>카카오페이 결제가 정상적으로 완료되었습니다</p>
      <div>
        <p>결제일시:</p>
        <p>{paymentResult.approved_at}</p>
      </div>
      <div>
        <p>주문번호:</p>
        <p>{paymentResult.partner_order_id}</p>
      </div>
      <div>
        <p>상품명:</p>
        <p>{paymentResult.item_name}</p>
      </div>
      <div>
        <p>결제금액:</p>
        <p>
          {paymentResult.amount.total}
          원
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={handleClickHome}
        >
          홈으로
        </button>
      </div>
    </Container>
  );
}
