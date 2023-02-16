import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';
import { dateFormatter } from '../utils/DateFormatter';
import { PaddingTop } from './ui/Padding';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: 774px;
padding-top: 80px;
background-color: white;

h2{
  font-size: 33px;
  font-weight: 800;
  margin-bottom: 40px;
  color:#EF781A
}

h1{
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

div{
  display: flex;
}

button {
  width: 250px;
  height: 70px;
  border-radius: 20px;
  font-size: 18px;
  color:white;
  background-color: #EF781A;
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #EF781A;
  padding: 20px;
  margin-bottom: 50px;

  div{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    height:30px
  }

  h3{
   margin-right: 5px;
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
    console.log(paymentResult);
  }, []);

  const handleClickHome = () => {
    navigate('/myPage/tickets');
  };

  if (!paymentResult.amount) {
    return <p>now loading</p>;
  }

  return (
    <PaddingTop>
      <Container>
        <h2>OH GYM</h2>
        <h1>결제가 정상적으로 완료되었습니다</h1>
        <Wrapper>
          <div>
            <h3>-구매처:</h3>
            <p>{paymentResult.partner_user_id}</p>
          </div>
          <div>
            <h3>-상품명:</h3>
            <p>{paymentResult.item_name}</p>
          </div>
          <div>
            <h3>-결제일시:</h3>
            <p>{dateFormatter.localDateTime(new Date(paymentResult.approved_at))}</p>
          </div>
          <div>
            <h3>-결제금액:</h3>
            <p>
              {paymentResult.amount.total}
              원
            </p>
          </div>
        </Wrapper>
        <div>
          <button
            type="button"
            onClick={handleClickHome}
          >
            이용권 보러가기
          </button>
        </div>
      </Container>
    </PaddingTop>
  );
}
