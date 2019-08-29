import { GameAction, GameActionTypes } from './gameActions';
import {
  flipTile,
  getGameStatus,
  getRandomMineIndexes,
  pauseTimer,
  resumeTimer,
  startTimer
} from './helpers';

export enum GameStatus {
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
  totalMineCount: number;
  mineIndexes: number[];
  status: GameStatus;
  neighbourMineCounts: Record<number, number>;
  rippleEffectDelays: Record<number, number>;
  timer: Timer;
}

const initial: GameState = {
  gridWidth: 13,
  gridHeight: 10,
  totalMineCount: 25,
  mineIndexes: [],
  status: GameStatus.IDLE,
  neighbourMineCounts: {},
  rippleEffectDelays: {},
  timer: { isRunning: false, startedAt: 0, pausedAt: 0 }
};

const handleFlipTile = (
  {
    gridWidth,
    gridHeight,
    totalMineCount,
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
      totalMineCount,
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
    totalMineCount,
    neighbourMineCounts: newCounts,
    status,
    rippleEffectDelays: newRipples,
    timer
  };
};

export default function gameReducer(
  state: GameState = initial,
  action: GameAction
): GameState {
  switch (action.type) {
    case GameActionTypes.NEW_GAME:
      return initial;

    case GameActionTypes.FLIP_TILE_AT_INDEX:
      return handleFlipTile(state, action.tileIndex);

    case GameActionTypes.PAUSE_TIMER:
      return { ...state, timer: pauseTimer(state.timer, action.timestamp) };

    case GameActionTypes.RESUME_TIMER:
      return { ...state, timer: resumeTimer(state.timer, action.timestamp) };

    default:
      return state;
  }
}
