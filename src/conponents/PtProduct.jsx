import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import useChattingRoomStore from '../hooks/useChattingRoomStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 845px;
  z-index: 997;

  border-top-left-radius: 20px;
  border: 1px solid black;
  background-color: white;

  button{
    height: 100px;
  }
`;

const ProductInformationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 18px;
  border-bottom: 1px solid black;
  border-top-left-radius: 20px;
  text-align: center;
  
  button{
    font-size: 20px;
  }

  h1{
    display: flex;
    padding-top: 3px;
    justify-content:space-between;
    align-items: flex-end;
    font-size: 24px;
    font-weight: 600;
    margin-right: 5px;

    
  }

  div{
    display: flex;
    justify-content: center;
    align-items: flex-end;

  p{
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  img{
    width: 23px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  height: 800px;
  overflow-y: auto;  
`;

const TrainerPhoto = styled.div`
  width: 100%;
  
  div{
   width: 100%;
   max-height: 250px;
   overflow: hidden;
   
  }

  img{
    max-height: initial;
    width: 100%;
  }
`;

const ExercisePlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
  p{
    height: 400px;
  }
`;

const IntroductionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #D1D1D1;

  h1{
    display: flex;
    justify-content:space-between;
    align-items: flex-end;
    padding-top: 3px;
    font-size: 24px;
    font-weight: 600;
    width: 130px;

    p{
      font-size: 18px;
    }
  }

  div{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: flex-start;
    width: 90%;
    height: 210px;
    padding: 40px 20px;
    border-radius: 20px;
    word-break: break-all;
    border: 1px solid #D1D1D1; 
    font-size: 15px;
    background-color: #EBEEF1; 
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #D1D1D1;

  h1{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 85%;
    height: 80px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 700;
  }

  h2{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 85%;
    height: 50px;
    font-size: 15px;
    font-weight: 600;
  }


  ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 85%;
    height: 80px;
    font-size: 14px;
    font-weight: 500;
  }

  li{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;

    img{
      width: 18px;
    }
  }
`;

const Product = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 30px;
  width: 100%;
  height: 200px;
  padding-left: 55px;
  overflow-x: auto;

  button{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 280px;
    height: 150px;
    border-radius: 20px;
    padding: 15px 10px;
    box-shadow: 0px 6px 6px 3px gray;
  }
`;

const ProductUpperWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 100%;
height: 50%;
padding: 10px;
border-radius: 5px;

h3{
  font-size: 18px;
  font-weight: 700;
}
`;

const ProductBottomWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 40%;
padding: 10px;
border-radius: 10px;

p{
  font-size: 14px;
}

h3{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 30%;
  height: 30px;
  background-color: #df862d;
  font-weight: 600;
  font-size: 13px;
  color : white;
  margin-right: 10px;
}
`;

const ProductIntroductionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ProductIntroduction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
  width: 100%;
  height: 170px;
  border-bottom: 1px solid #D1D1D1;

  h2{
    font-size: 18px;
    font-weight: 600;
  }

  li{
    font-size: 13px;
    margin-bottom: 5px;
  }
`;

export default function PtProduct({ slideMode, setSlideMode, product }) {
  const navigator = useNavigate();
  const chattingRoomStore = useChattingRoomStore();

  const scroll = useRef(null);

  useEffect(() => {
    if (slideMode) {
      document.body.style = 'overflow: hidden';

      scroll?.current.scrollIntoView(false);
    }

    if (!slideMode) {
      document.body.style = 'overflow: auto';
    }

    return () => { document.body.style = 'overflow: auto'; };
  }, [slideMode]);

  const handleClickChat = async () => {
    const chattingRoom = await chattingRoomStore.create(product.trainerId);

    console.log(chattingRoom);

    navigator(`/myPage/chats/${chattingRoom.id}`);
  };

  return (
    <Container>
      <ProductInformationHeader>
        <button type="button" onClick={() => setSlideMode(false)}>x</button>
        <div>
          <h1>
            {product.trainerUserName}
            {' '}
          </h1>
          <p>트레이너</p>
        </div>
        <button type="button" onClick={handleClickChat}>
          <img src="/assets/images/chatting.png" />
        </button>
      </ProductInformationHeader>
      <Wrapper>
        <TrainerPhoto>
          <div ref={scroll}>
            <img src={product.trainerImage} />
          </div>
        </TrainerPhoto>
        <IntroductionWrapper>
          <Introduction>
            <h1>
              {product.trainerUserName}
              {' '}
              <p>트레이너</p>
            </h1>
            <div>
              <p>
                오짐 트레이너
                {' '}
                {product.trainerUserName}
                {' '}
                입니다. 10여년의 헬스 경력
              </p>
              <p>
                과 여러 대회의 입상 경력으로 기능적으로 뛰어나
              </p>
              <p>
                며 심미적으로 훌륭한 몸 상태를 만들어 드립니다.
              </p>
              <p>
                개개인의 목적과
                신체상태를 기반으로 트레이닝
              </p>
              <p>
                해드리며 목표를 이룰 때까지 최선을 다하여 트레
              </p>
              <p>
                이닝 해드리겠습니다.
              </p>
            </div>
          </Introduction>
        </IntroductionWrapper>
        <ProductWrapper>
          <h1>P.T</h1>
          <h2>체력, 근력증진, 근육 증가, 체지방 연소순으로 진행되는 웨이트 입문 클래스 입니다.</h2>
          <ul>
            <li>
              <img src="/assets/images/product-check.png" />
              체계적으로 웨이트 기본기를 다지고 싶다.
            </li>
            <li>
              <img src="/assets/images/product-check.png" />
              살면서 한번도 운동을 해본적이 없다.
            </li>
          </ul>
          <Product>
            {product.options?.map((option) => (
              <li key={option.id}>
                <button type="button" onClick={() => navigator(`/order/products/${product.id}/options/${option.id}`)}>
                  <ProductUpperWrapper>
                    <p>
                      {option.ptTimes}
                      회
                      {' '}
                      {option.price.toLocaleString()}
                      원
                    </p>
                    <h3>
                      회당
                      {' '}
                      {(option.price / option.ptTimes).toLocaleString()}
                      원
                    </h3>
                  </ProductUpperWrapper>
                  <ProductBottomWrapper>
                    <p>
                      유효기간
                      {' '}
                      {option.dateOfUse / 30}
                      개월
                    </p>
                    <h3>바로 결제</h3>
                  </ProductBottomWrapper>
                </button>
              </li>
            ))}
          </Product>
        </ProductWrapper>
        <ProductIntroductionWrapper>
          <ProductIntroduction>
            <h2>자격 및 경력 사항</h2>
            <ul>
              <li>현: 오짐 트레이너</li>
              <li>머슬 매니아 피지크 우승</li>
              <li>WNGP 피지크 우승</li>
              <li>PCA 피지크 우승</li>
              <li>NPCA 피지크 우승</li>
            </ul>
          </ProductIntroduction>
        </ProductIntroductionWrapper>
      </Wrapper>
    </Container>
  );
}
