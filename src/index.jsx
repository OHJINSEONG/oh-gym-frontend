import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { apiService } from './services/ApiService';

const container = document.getElementById('app');

const root = ReactDOM.createRoot(container);

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

apiService.setAccessToken(accessToken);

root.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <App />
    </HashRouter>
);
