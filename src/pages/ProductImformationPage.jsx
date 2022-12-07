import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';
import { lectureStore } from '../stores/LectureStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;

  div {
    display: flex;
    flex-direction: column;
    background-color: beige;
    width: 300px;
    height: 300px;
  }
`;

export default function ProductImformationPage() {
  const productStore = useProductStore();
  const orderStore = useOrderStore();
  const { productId } = useParams();

  const { product } = productStore;

  useEffect(() => {
    productStore.findProduct(productId);
  }, []);

  const handleClick = async () => {
    await orderStore.create(productId);
    lectureStore.register(product, orderStore.order);
  };

  return (
    <Container>
      <div>
        <p>
          {product.title}
        </p>
        {product.dateOfUse
          ? (
            <select name="dateOfUse">
              <option value="">옵션</option>
              <option id="1">3개월</option>
            </select>
          )
          : null}
        {product.ptTimes
          ? (
            <select className="ptTimes">
              <option value="">옵션1</option>
              <option id="1">12회</option>
            </select>
          )
          : null}
        {product.dayOfWeek
          ? (
            <select className="dayOfWeek">
              <option value="">옵션2</option>
              <option id="1">월 수 금</option>
            </select>
          )
          : null}
        {product.time
          ? (
            <select className="time">
              <option value="">옵션3</option>
              <option id="1">11:00</option>
            </select>
          )
          : null}
        <div>
          <label htmlFor="input-startDate">
            상품 시작일
          </label>
          <input id="input-startDate" type="text" />
        </div>
        <p>
          {product.price}
        </p>
      </div>
      <button type="button" onClick={handleClick}>결제하기</button>
    </Container>
  );
}
