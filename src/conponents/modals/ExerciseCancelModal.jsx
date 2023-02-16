import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 100px;
  z-index: 999;
  padding:  20px;
  position: absolute;
  top: 50%;
  left: 20%;
  
  transform: translate(-11%, -400%);
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  h2{
    margin-bottom: 5px;
  }

  p{
    margin-bottom: 5px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  button{
    width: 100px;
    height: 30px;
    border: 1px solid black;
  }
`;

export default function ExerciseCancelModal({ exerciseEnd, setModalMode }) {
  const handleClickExerciseEnd = () => {
    exerciseEnd();
    setModalMode(false);
  };

  return (
    <Container>
      <Wrapper>
        <h2>
          진행중인 운동을 종료하시겠습니까?
        </h2>
        <p>종료시 지금까지의 운동 기록은 저장되지 않습니다.</p>
        <ButtonWrapper>
          <button type="button" onClick={handleClickExerciseEnd}>종료</button>
          <button type="button" onClick={() => setModalMode(false)}>취소</button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}
