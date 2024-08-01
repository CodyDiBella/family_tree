import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDqNXIln6llhx-_XQJawZIztCYKwxCjNk0",
  authDomain: "family-tree-2538a.firebaseapp.com",
  projectId: "family-tree-2538a",
  storageBucket: "family-tree-2538a.appspot.com",
  messagingSenderId: "706436383233",
  appId: "1:706436383233:web:a59d13bd96a1c6f5137600",
  measurementId: "G-KXTCSHHJP5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);