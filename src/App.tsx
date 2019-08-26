import React from 'react';
import { Board } from './components/Board';

const App: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '50rem',
        margin: '5rem auto'
      }}
    >
      <Board></Board>
    </div>
  );
};

export default App;
