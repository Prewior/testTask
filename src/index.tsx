import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { addBook } from './redux/bookSlice';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const queryClient = new QueryClient();

const initialBooks = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Book ${index + 1}`,
  price: Math.floor(Math.random() * 50) + 1,
  category: 'Fiction',
  description: `Description for Book ${index + 1}`,
}));

initialBooks.forEach((book) => {
  store.dispatch(addBook(book));
});

const rootElement = document.getElementById('root');

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );

  reportWebVitals();
} else {
  console.error('Root element not found');
}
