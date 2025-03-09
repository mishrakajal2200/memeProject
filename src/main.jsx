import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>  {/* ✅ Wrap inside DarkModeProvider */}
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);
