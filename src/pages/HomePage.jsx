import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ExercisePlan from '../conponents/ExercisePlan';
import Ticket from '../conponents/Ticket';
import Padding from '../conponents/ui/Padding';
import LoginPage from './LoginPage';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-bottom: 70px;
  overflow-y: auto; 
`;

export default function HomePage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  if (!accessToken) {
    return (
      <LoginPage />
    );
  }

  return (
    <Padding>
      <Container>
        <ExercisePlan />
        <Ticket />
      </Container>
    </Padding>
  );
}
