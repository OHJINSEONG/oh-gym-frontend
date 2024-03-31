import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useNotificationStore from '../hooks/useNotificationStore copy';
import NotificationsModal from './modals/NotificationsModal';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
    position: fixed;
    font-size: 0.8em;
    font-weight: bold;
    top: 0%;
    width: 100%;
    height: 70px;
    background-color: white;
    justify-content: space-between;
    z-index: 900;
    border-bottom: 1px solid #d1d1d1;

    div {
        display: flex;
        width: auto;
        justify-content: space-between;
    }
`;

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    .myPage {
        font-size: 20px;
        font-weight: 600;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    button {
        color: #ef781a;
    }
`;

const List = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const Navi = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
`;

const Alarm = styled.div`
    top: -40%;
    left: 80%;
    position: relative;
    z-index: 999;
    background-color: red;
    padding: 4px;
    border-radius: 50%;
`;

export default function Header() {
    const location = useLocation();
    const navigator = useNavigate();
    const [modalMode, setModalMode] = useState('');

    const notificationStore = useNotificationStore();

    const handleClickCheckNotifications = async () => {
        await notificationStore.checkNotifications();

        // eslint-disable-next-line no-unused-expressions
        modalMode !== 'notification' ? setModalMode('notification') : setModalMode('');
    };

    const path = location.pathname;

    if (path.includes('diarys/') || path.includes('exercises/') || path.includes('order/products/')) {
        return (
            <Container>
                <Wrapper>
                    <List>
                        <Navi>
                            <button type="button" onClick={() => navigator(-1)}>
                                이전
                            </button>
                        </Navi>
                        <Navi>
                            <img src="/assets/images/alarm.png" />
                        </Navi>
                    </List>
                </Wrapper>
            </Container>
        );
    }

    if (path.includes('products/') || path.includes('chats/')) {
        return null;
    }

    if (path.includes('myPage/')) {
        return (
            <Container>
                <Wrapper>
                    <List>
                        <Navi>
                            <button type="button" className="myPage" onClick={() => navigator('/myPage')}>
                                MyPage
                            </button>
                        </Navi>
                        <Navi>
                            <img src="/assets/images/alarm.png" />
                        </Navi>
                    </List>
                </Wrapper>
            </Container>
        );
    }

    return (
        <Container>
            {modalMode === 'notification' ? (
                <NotificationsModal setModalMode={setModalMode} modalMode={modalMode} />
            ) : null}
            <Wrapper>
                <List>
                    <Navi>
                        <Link to="/">
                            <img alt="title" src="/assets/images/title.png" />
                        </Link>
                    </Navi>
                    <div>
                        <Navi>
                            {notificationStore.notifications.filter((notification) => notification.status !== 'CHECKED')
                                .length ? (
                                <Alarm />
                            ) : null}
                            <button type="button" onClick={handleClickCheckNotifications}>
                                {modalMode === 'notification' ? (
                                    <img alt="alarm-used" src="/assets/images/alarm-used.png" />
                                ) : (
                                    <img alt="alarm" src="/assets/images/alarm.png" />
                                )}
                            </button>
                        </Navi>
                        <Navi>
                            <button type="button" to="/products">
                                <img alt="setting" src="/assets/images/setting.png" />
                            </button>
                        </Navi>
                    </div>
                </List>
            </Wrapper>
        </Container>
    );
}
