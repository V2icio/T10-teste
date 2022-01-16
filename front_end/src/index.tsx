import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ThemeProvider } from '@chakra-ui/react';
import App from './App';
import theme from './theme/index';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
