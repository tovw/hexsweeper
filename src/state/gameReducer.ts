import { GameAction, GameActionTypes } from './gameActions';
import { flipTile, getGameStatus, getRandomMineIndexes, pauseTimer, startTimer, toggleDifficulty, toggleTimer } from './helpers';

export enum GameStatus {
  MENU,
  IDLE,
  STARTED,
  WON,
  LOST
}

export interface Timer {
  isRunning: boolean;
  startedAt: number;
  pausedAt: number;
}

export interface GameState {
  gridWidth: number;
  gridHeight: number;
  mineIndexes: number[];
  status: GameStatus;
  neighbourMineCounts: Record<number, number>;
  rippleEffectDelays: Record<number, number>;
  timer: Timer;
  difficulty: 0 | 1 | 2;
  difficultyMineCounts: Record<0 | 1 | 2, number>;
}

const initial: GameState = {
  gridWidth: 13,
  gridHeight: 10,
  mineIndexes: [],
  status: GameStatus.MENU,
  neighbourMineCounts: {},
  rippleEffectDelays: {},
  timer: { isRunning: false, startedAt: 0, pausedAt: 0 },
  difficulty: 1,
  difficultyMineCounts: { 0: 25, 1: 35, 2: 45 }
};

const handleFlipTile = (
  {
    gridWidth,
    gridHeight,
    difficulty,
    difficultyMineCounts,
    neighbourMineCounts,
    mineIndexes,
    status,
    rippleEffectDelays,
    timer
  }: GameState,
  tileIndex: number
): GameState => {
  if (status === GameStatus.IDLE) {
    mineIndexes = getRandomMineIndexes(
      gridWidth,
      gridHeight,
      difficultyMineCounts[difficulty],
      tileIndex
    );
    timer = startTimer();
  }

  const {
    neighbourMineCounts: newCounts,
    rippleEffectDelays: newRipples
  } = flipTile(
    tileIndex,
    mineIndexes,
    gridWidth,
    gridHeight,
    neighbourMineCounts,
    rippleEffectDelays
  );

  status = getGameStatus(
    gridWidth,
    gridHeight,
    mineIndexes,
    newCounts,
    tileIndex
  );

  if (status !== GameStatus.STARTED) {
    timer = pauseTimer(timer, Date.now());
  }

  return {
    gridWidth,
    gridHeight,
    mineIndexes,
    neighbourMineCounts: newCounts,
    status,
    rippleEffectDelays: newRipples,
    timer,
    difficulty,
    difficultyMineCounts
  };
};

export default function gameReducer(
  state: GameState = initial,
  action: GameAction
): GameState {
  switch (action.type) {
    case GameActionTypes.NEW_GAME:
      return { ...state, status: GameStatus.IDLE };

    case GameActionTypes.FLIP_TILE_AT_INDEX:
      return handleFlipTile(state, action.tileIndex);

    case GameActionTypes.TOGGLE_TIMER:
      return { ...state, timer: toggleTimer(state.timer, action.timestamp) };

    case GameActionTypes.TOGGLE_DIFFICULTY:
      return {
        ...state,
        difficulty: toggleDifficulty(state.difficulty)
      };
    default:
      return state;
  }
}
