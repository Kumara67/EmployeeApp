import React from 'react';
import Home from './components/Home';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    primary: 'teal',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Home />
    </PaperProvider>
  );
};

export default App;
