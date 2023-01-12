import styled from 'styled-components';
import AddPlan from '../conponents/AddPlan';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

export default function AddPlanPage() {
  return (
    <Container>
      <AddPlan />
    </Container>
  );
}
