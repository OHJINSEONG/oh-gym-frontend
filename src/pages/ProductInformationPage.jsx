import { useEffect } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';
import useProductFormStore from '../hooks/useProductFormStore';
import useProductStore from '../hooks/useProductStore';

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

export default function ProductInformationPage() {
  const navigate = useNavigate();

  const productStore = useProductStore();
  const productFormStore = useProductFormStore();
  const orderStore = useOrderStore();
  const { productId } = useParams();

  const { productInformation } = productStore;
  const { options } = productInformation;
  const { selectedOption } = productFormStore;

  useEffect(() => {
    console.log(selectedOption);
    productStore.findProduct(productId);
  }, [selectedOption]);

  const handleClick = async () => {
    const kakaoPayUrl = await orderStore.create({
      userId: 1, productId, option: selectedOption,
    });

    window.location.href = kakaoPayUrl;
  };

  const handleChangeOption = (e) => {
    productFormStore.selectOption(options, e.target.value);
  };

  return (
    <Container>
      <div>
        <p>
          {productInformation.title}
        </p>
        <select name="options" onChange={handleChangeOption}>
          <option>옵션</option>
          {(options?.map((option) => (
            <option key={option.id} value={option.id}>
              이용일:
              {' '}
              {option.dateOfUse}
              일
              {' '}
              가격:
              {option.price}
              원
              {' '}
              피티 횟수:
              {option.ptTimes}
              회
            </option>
          )))}
        </select>
        <h2>
          가격 :
          {' '}
          {selectedOption.price}
          원
        </h2>
      </div>
      <button type="button" onClick={handleClick}>결제하기</button>
    </Container>
  );
}
