import React from 'react';
import { Provider } from 'react-redux';
import { Board } from './components/Board';
import store from './state';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          maxWidth: '50rem',
          margin: '5rem auto'
        }}
      >
        <Board></Board>
      </div>
    </Provider>
  );
};

export default App;
