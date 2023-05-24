import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { BasketProvider } from './Pages/Basket/BasketContext';
import { LoginProvider } from './Pages/Login/LoginContext';
import { OrderProvider } from './Components/Order/OrderContext';
import { Provider } from "react-redux";
import basketReducer from './reducer/basketReducer';
import { createStore } from 'redux';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
    },
  },
});
const store = createStore(basketReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
       <Provider store={store}>

          <BrowserRouter>
            <App></App>
          </BrowserRouter>
          </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
