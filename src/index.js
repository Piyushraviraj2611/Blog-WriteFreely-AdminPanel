import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import SearchProvider from './context/SearchProvider.jsx';
import NotificationProvider from './context/NotificationProvider';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<NotificationProvider>
				<SearchProvider>
					<App />
				</SearchProvider>
			</NotificationProvider>
		</Provider>
	</BrowserRouter>
);
