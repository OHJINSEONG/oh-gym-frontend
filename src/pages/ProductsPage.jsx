/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import PtProduct from '../conponents/PtProduct';
import Padding from '../conponents/ui/Padding';
import useProductStore from '../hooks/useProductStore';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
  `;

const GymPhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;

  img{
    width: 100%;
    height: 100%;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  background-color: white;
  border-top: 1px solid black;
  border-radius: 30px;
  padding-top: 20px;
  padding-bottom: 70px;
  transform: translate(0%,55%);
  
`;

const MembershipProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #D1D1D1;

  text-align: start;
`;

const MembershipInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;

  h2{
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 10px;
  }
`;

const MembershipProductList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-x : auto;
  width: 100%;
`;

const MembershipProductOptionList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 40px;
  padding-bottom: 30px;
  margin-top: 20px;
  
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid black;
    background-color: white;
    width: 320px;
    height: 130px;
    padding: 15px 10px;
    border-radius: 20px;
    margin-right: 20px;
    box-shadow: 2px 6px 6px 2px gray;
  }
`;

const PeriodWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 10px;
  border-radius: 5px;

  h2{
    font-size: 20px;
    font-weight: 750;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EBEBEB;
  width: 100%;
  height: 50%;
  padding: 10px;
  border-radius: 10px;

  p{
    font-size: 14px;
  }

  h2{
    font-weight: 600;
    font-size: 23px;
  }

  h3{
    font-size: 14px;
    margin: 8px;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PtProductListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding: 30px 0;
  padding-bottom: 200px;
  background-color: white;
  border-bottom: 1px solid #EBEBEB;
`;

const PtProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 90%;
  padding-bottom: 10px;
  padding-left: 10px;
  border-bottom: 1px solid #D1D1D1;

  h2{
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 10px;
  }
`;

const PtProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-gap: 20px;
  align-items: center;
  width: 90%;
  margin-top: 20px;
  
  button {
    display: inline-block;
    width: 100%;
    height: 200px;
    background-color: black;
    border-radius: 10px;
    box-shadow: 2px 3px 9px 3px black;

    img{
      width: 110%;
      border-radius: 10px;
      height: 100%;
      vertical-align: middle;
      opacity: 0.85;
      background-color: black;
      transform: translate(-5%,-1%);
    }

    .trainer{
      position: absolute;
      transform: translate(-15%,-90%);
      width: 205px;
      height: 245px;
      z-index: 900;
    }
  }
`;

const ImageInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px;
  color:white;
  
  p{
    font-weight: 450;
    font-size: 12px;
    color: #EF781A
  }

  h2{
    width: 100%;
    text-align: end;
    font-weight: 550;
    font-size: 18px;
  }
  
  .productInformation{
    display: flex;
    flex-direction: column;
    justify-content: center;
     align-items: flex-start;

     div{
      display: flex;
      justify-content: space-between;
      width: 85px;
     }
  }
`;

export default function ProductsPage() {
  const productStore = useProductStore();
  const { products } = productStore;
  const [membershipHover, setMembershipHover] = useState(false);

  const [slideMode, setSlideMode] = useState(false);
  const [product, setProduct] = useState({});

  const props = useSpring({
    y: slideMode ? 185 : 2000,
    position: 'fixed',
    x: 0,
    right: 0,
    height: '90vh',
    width: '100%',
    zIndex: 999,
  });

  useEffect(() => {
    productStore.fetchProducts();
    console.log(productStore.products);
  }, []);

  if (!productStore.products?.length) {
    return (
      <p>상품이 존재하지 않습니다.</p>
    );
  }

  const handleClickProductDetail = (selectedProduct) => {
    setSlideMode(true);
    setProduct(selectedProduct);
  };

  return (
    <Padding>
      <Container>
        <animated.div style={props}>
          <PtProduct slideMode={slideMode} setSlideMode={setSlideMode} product={product} />
        </animated.div>
        <GymPhoto>
          <img src="/assets/images/gym.png" />
        </GymPhoto>
        <ProductWrapper>
          <MembershipProductListWrapper>
            <MembershipInformation>
              <h2>헬스 이용권</h2>
              <p>최상의 가격과 최고의 서비스 제공!</p>
            </MembershipInformation>
            <MembershipProductList>
              {products.filter((product) => product.type === 'MEMBERSHIP').map((product) => (
                <li key={product.id}>
                  <MembershipProductOptionList>
                    {product.options?.map((option) => (
                      <li key={option.id}>
                        <Link
                          className={membershipHover ? 'hover' : 'off'}
                          onMouseEnter={() => { setMembershipHover(true); }}
                          onMouseLeave={() => { setMembershipHover(false); }}
                          to={`${option.id}`}
                        >
                          <PeriodWrapper>
                            <h2>
                              {option.dateOfUse / 30}
                              개월
                            </h2>
                          </PeriodWrapper>
                          <PriceWrapper>
                            <p>정상가</p>
                            {option.dateOfUse === 30 ? (
                              <Price>
                                <h2>
                                  월
                                  {' '}
                                  {option.price.toLocaleString()}
                                  원
                                </h2>
                              </Price>
                            ) : (
                              <Price>
                                <h3>
                                  {option.price.toLocaleString()}
                                  원
                                </h3>
                                <h2>
                                  월
                                  {' '}
                                  {(option.price / (option.dateOfUse / 30)).toLocaleString()}
                                  원
                                </h2>
                              </Price>
                            )}
                          </PriceWrapper>
                        </Link>
                      </li>
                    ))}
                  </MembershipProductOptionList>
                </li>
              ))}
            </MembershipProductList>
          </MembershipProductListWrapper>
          <PtProductListWrapper>
            <PtProductInformation>
              <h2>1:1 PT 상품</h2>
              <p>오짐 최고의 트레이너와 함께 운동하세요!</p>
            </PtProductInformation>
            <PtProductList>
              {products.filter((product) => product.type === 'PT').map((product) => (
                <li key={product.id}>
                  <button type="button" onClick={() => handleClickProductDetail(product)}>
                    <img src={product.trainerImage} />
                    <div className="trainer">
                      <ImageInformation>
                        <div>
                          {/* <p>바로 결제</p>
                          <p>상담 가능</p> */}
                        </div>
                        <div className="productInformation">
                          <h2>
                            {product.trainerUserName}
                            {' '}
                            트레이너
                          </h2>
                          <div>
                            <h3>
                              {product.options[0].ptTimes}
                              회
                            </h3>
                            <h3>
                              {product.options[0].price}
                              원
                            </h3>
                          </div>
                        </div>
                      </ImageInformation>
                    </div>
                  </button>
                </li>
              ))}
            </PtProductList>
          </PtProductListWrapper>
        </ProductWrapper>
      </Container>
    </Padding>
  );
}
