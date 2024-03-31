import styled from 'styled-components';

import ExercisePlan from '../conponents/ExercisePlan';
import Ticket from '../conponents/Ticket';
import Padding from '../conponents/ui/Padding';

const Container = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding-bottom: 70px;
    overflow-y: auto;
    width: 100%;
`;

export default function HomePage() {
    return (
        <Padding>
            <Container>
                <ExercisePlan />
                <Ticket />
            </Container>
        </Padding>
    );
}
