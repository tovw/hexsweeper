import React, { FC } from 'react';
import { color } from '../utils/color';

import { BackToMenu } from './BackToMenu';
import { useSelector } from 'react-redux';
import { GameState, Timer } from '../state/gameReducer';
import { formatTime } from './Timer';

const ResultMessage: FC = ({ children }) => {
  return (
    <h2
      style={{
        whiteSpace: 'nowrap',
        fontFamily: 'squreSans',
        fontSize: 45,
        margin: '0 auto',
        userSelect: 'none',
        color: color.primary
      }}
    >
      {children}
    </h2>
  );
};

export const Results: FC<{ isWon: boolean }> = ({ isWon }) => {
  const timer = useSelector<{ game: GameState }, Timer>(s => s.game.timer);

  const time = formatTime(timer.pausedAt - timer.startedAt);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <BackToMenu />
      {isWon ? (
        <ResultMessage>CLEARED IN</ResultMessage>
      ) : (
        <ResultMessage>GAME OVER</ResultMessage>
      )}
      {isWon && (
        <div style={{ height: '100%', alignSelf: 'center' }}>
          <h2
            style={{
              fontFamily: 'digital',
              fontSize: 70,
              marginTop: 0,
              userSelect: 'none',
              color: color.primary
            }}
          >
            {time}
          </h2>
        </div>
      )}
    </div>
  );
};
