import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  `;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 840px;
  
  li{
    width: 100px;
    height: 100px;
  }
  
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 100%;
    height: 100%;
  }
`;

export default function ProductsPage() {
  const productStore = useProductStore();

  const { products } = productStore;

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  if (!products.length) {
    return (
      <p>상품이 존재하지 않습니다.</p>
    );
  }

  return (
    <Container>
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <Link className="item" to={`${product.id}`}>
              {product.title}
            </Link>
          </li>
        ))}
      </ProductList>
    </Container>
  );
}
