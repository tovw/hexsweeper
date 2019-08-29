import React from 'react';
import { Provider } from 'react-redux';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import store from './state';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          maxWidth: '50rem',
          margin: '0 auto'
        }}
      >
        <GameInfo />
        <Board></Board>
      </div>
    </Provider>
  );
};

export default App;
