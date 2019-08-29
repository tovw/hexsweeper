import React from 'react';
import { Provider } from 'react-redux';
import { Game } from './components/Game';
import store from './state';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

export default App;
