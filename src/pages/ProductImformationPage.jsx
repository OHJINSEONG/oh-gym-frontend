import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';
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

export default function ProductImformationPage() {
  const productStore = useProductStore();
  const orderStore = useOrderStore();
  const { productId } = useParams();

  const { productImformation } = productStore;
  const { options } = productImformation;

  useEffect(() => {
    productStore.findProduct(productId);
  }, []);

  const handleClick = () => {
    orderStore.create(productId);
  };

  console.log(productStore);

  return (
    <Container>
      <div>
        <p>
          {productImformation.title}
        </p>
        <select name="options">
          <option>옵션</option>
          {Array.isArray(options)
            ? (options.map((option) => (
              <option key={option.id}>{option.dateOfUse}</option>
            )))
            : null}
        </select>
      </div>
      <button type="button" onClick={handleClick}>결제하기</button>
    </Container>
  );
}
