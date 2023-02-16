import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BottomOrderButton from '../conponents/BottomOrderButton';
import { PaddingTop } from '../conponents/ui/Padding';
import useOrderFormStore from '../hooks/useOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: white;
  padding-bottom: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ProductInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 20px;
  border-bottom: 1px solid #D1D1D1;

  h1{
    font-size: 23px;
    margin-bottom: 20px;
  }

  img{
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-right: 10px;
  }
`;

const ProductInformation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;

  div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 110px;
    padding: 10px;
  }
`;

const OrderInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;
  padding-left: 20px;
  border-bottom: 1px solid #D1D1D1;

  h1{
    font-size: 23px;
    margin-bottom: 40px;
  }
`;

const ConsumerInputFormList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const ConsumerInputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 30px;

  label{
    font-size: 18px;
    margin-bottom: 10px;
  }

  input{
    width: 95%;
    border: 1px solid #D1D1D1;
    height: 48px;
    border-radius: 10px;
    font-size: 18px;
    padding-left: 15px ;
  }
`;

const TicketFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;
  padding-left: 20px;
  border-bottom: 1px solid #D1D1D1;

  h1{
    font-size: 23px;
    margin-bottom: 40px;
  }
`;

const CouponForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  margin-bottom: 30px;

  label{
    font-size: 18px;
    margin-bottom: 10px;
  }

  input{
    width: 95%;
    border: 1px solid #D1D1D1;
    height: 38px;
    border-radius: 10px;
    font-size: 15px;
    color: #D1D1D1;
    padding-left: 12px;
  }
`;

const PointForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  margin-bottom: 30px;

  label{
    font-size: 18px;
    margin-bottom: 10px;
  }

  input{
    width: 95%;
    border: 1px solid #D1D1D1;
    height: 38px;
    border-radius: 10px;
    font-size: 15px;
    color: #D1D1D1;
    padding-left: 12px;
  }
`;

const OrderPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #D1D1D1;

  h1{
    font-size: 23px;
    margin-bottom: 40px;
  }

  .minusPrice{
    color:red
  }

  .total-price{
    font-size: 30px;
    color: #EF781A; 
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

export default function OrderPage() {
  const productStore = useProductStore();
  const orderStore = useOrderStore();
  const orderFormStore = useOrderFormStore();
  const userStore = useUserStore();
  const { productId, optionId } = useParams();

  const { productInformation } = productStore;
  const { user } = userStore;

  const option = productInformation.options?.find((e) => e.id === Number(optionId));

  useEffect(() => {
    productStore.findProduct(productId);
    orderFormStore.onChangeName(user.userName);
  }, []);

  const order = async () => {
    const kakaoPayUrl = await orderStore.create({
      productId,
      optionId,
      itemName: productInformation?.title,
      totalPrice: option?.price,
      cunsumerName: orderFormStore.name,
      consumerAge: orderFormStore.age,
      consumerBirthDate: orderFormStore.birthDate,
      consumerPhoneNumber: orderFormStore.phoneNumber,
      consumerAddress: '',
      consumerAddressDetail: '',
    });

    window.location.href = kakaoPayUrl;
  };

  return (
    <PaddingTop>
      <Container>
        <BottomOrderButton order={order} />
        <Wrapper>
          <ProductInformationWrapper>
            <h1>구매 정보 확인</h1>
            <ProductInformation>
              <img src={productInformation.trainerImage} />
              <div>
                <h2>
                  {productInformation.trainerUserName}
                  {' '}
                  트레이너
                </h2>
                <p>오짐 휘트니스</p>
                <p>
                  {productInformation.type}
                  {' '}
                  {option?.ptTimes}
                  회
                </p>
              </div>
            </ProductInformation>
          </ProductInformationWrapper>
          <OrderInputWrapper>
            <h1>구매자 정보</h1>
            <ConsumerInputFormList>
              <ConsumerInputForm>
                <label htmlFor="input-name">이름</label>
                <input type="text" value={orderFormStore.name} onChange={(e) => orderFormStore.onChangeName(e.target.value)} />
              </ConsumerInputForm>
              <ConsumerInputForm>
                <label htmlFor="input-name">성별</label>
                <input type="text" value={orderFormStore.age} onChange={(e) => orderFormStore.onChangeAge(e.target.value)} />
              </ConsumerInputForm>
              <ConsumerInputForm>
                <label htmlFor="input-name">생년월일</label>
                <input type="text" value={orderFormStore.birthDate} onChange={(e) => orderFormStore.onChangeBirthDate(e.target.value)} />
              </ConsumerInputForm>
              <ConsumerInputForm>
                <label htmlFor="input-name">연락처</label>
                <input type="text" value={orderFormStore.phoneNumber} onChange={(e) => orderFormStore.onChangePhoneNumber(e.target.value)} />
              </ConsumerInputForm>
            </ConsumerInputFormList>
          </OrderInputWrapper>
          <TicketFormWrapper>
            <h1>쿠폰/포인트 사용</h1>
            <CouponForm>
              <label htmlFor="input-name">쿠폰함</label>
              <input type="text" value="사용 가능한 쿠폰이 없어요" onChange={(e) => orderFormStore.onChangeAddress(e.target.value)} />
            </CouponForm>
            <PointForm>
              <label htmlFor="input-name">포인트</label>
              <input type="text" value="포인트가 없어요" onChange={(e) => orderFormStore.onChangeAddressDetail(e.target.value)} />
            </PointForm>
          </TicketFormWrapper>
          <OrderPriceWrapper>
            <h1>결제 금액</h1>
            <PriceWrapper>
              <p>상품 금액</p>
              <h3>
                {option?.price.toLocaleString()}
                {' '}
                원
              </h3>
            </PriceWrapper>
            <PriceWrapper>
              <p>쿠폰 사용</p>
              <h3 className="minusPrice">- 0 원</h3>
            </PriceWrapper>
            <PriceWrapper>
              <p>포인트 사용</p>
              <h3 className="minusPrice">- 0 원</h3>
            </PriceWrapper>
            <PriceWrapper>
              <p>최종 결제 금액</p>
              <h3 className="total-price">
                {option?.price.toLocaleString()}
                {' '}
                원
              </h3>
            </PriceWrapper>
          </OrderPriceWrapper>
        </Wrapper>
      </Container>
    </PaddingTop>
  );
}
