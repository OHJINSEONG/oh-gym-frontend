import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 70px;
  overflow-y: auto; 
`;

const Advertisement = styled.h1`
  display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid black;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 350px;
    border-bottom: 1px solid black;
`;

const MenuButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 250px;
    
    button{
      width: 80px;
      height: 60px;
      border: 1px solid black;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 350px;
    border-bottom: 1px solid black;
`;

const List = styled.ul`
   display: flex;
   width: 80%;
   overflow-x: auto; 
   align-self: flex-end;

   p{
    border: 1px solid black;
    margin-right: 10px;
    padding: 70px;
   }
`;

export default function HomePage() {
  return (
    <Container>
      <Advertisement>광고</Advertisement>
      <Menu>
        <div>
          <label htmlFor="input-search">검색창</label>
          <input />
        </div>
        <MenuButtons>
          <button type="button">이용권</button>
          <button type="button">트레이너</button>
          <button type="button">헬스장 후기</button>
          <button type="button">헬스장 소개</button>
        </MenuButtons>
      </Menu>
      <Wrapper>
        세일중인 상품
        <List>
          <p>상품1</p>
          <p>상품2</p>
          <p>상품3</p>
          <p>상품4</p>
          <p>상품5</p>
          <p>상품6</p>
          <p>상품7</p>
        </List>
      </Wrapper>
      <Wrapper>
        트레이너
        <List>
          <p>트레이너1</p>
          <p>트레이너2</p>
          <p>트레이너3</p>
          <p>트레이너4</p>
          <p>트레이너5</p>
          <p>트레이너6</p>
          <p>트레이너7</p>
        </List>
      </Wrapper>
    </Container>
  );
}
