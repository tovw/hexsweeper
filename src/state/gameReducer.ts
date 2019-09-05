import { GameAction, GameActionTypes } from './gameActions';
import {
  flipTile,
  generateMineIndexes,
  getGameStatus,
  pauseTimer,
  startTimer,
  toggleDifficulty,
  toggleTimer
} from './helpers';

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

export type Difficulty = 0 | 1 | 2;

//unopened, neighbour count, mine
export type TileState = undefined | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 'MINE';

export interface GameState {
  gridWidth: number;
  gridHeight: number;
  mineIndexes: number[];
  status: GameStatus;
  tileStates: Record<number, TileState>;
  rippleEffectDelays: Record<number, number>;
  timer: Timer;
  difficultyMineCounts: Record<Difficulty, number>;
  difficulty: Difficulty;
}

const initial: GameState = {
  gridWidth: 13,
  gridHeight: 10,
  mineIndexes: [],
  status: GameStatus.MENU,
  tileStates: {},
  rippleEffectDelays: {},
  timer: { isRunning: false, startedAt: 0, pausedAt: 0 },
  difficulty: 0,
  difficultyMineCounts: { 0: 25, 1: 30, 2: 40 }
};

const handleFlipTile = (
  {
    gridWidth,
    gridHeight,
    difficulty,
    difficultyMineCounts,
    tileStates,
    mineIndexes,
    status,
    rippleEffectDelays,
    timer
  }: GameState,
  tileIndex: number
): GameState => {
  if (
    (status === GameStatus.STARTED && !timer.isRunning) ||
    (status !== GameStatus.IDLE && status !== GameStatus.STARTED)
  ) {
    return {
      gridWidth,
      gridHeight,
      difficulty,
      difficultyMineCounts,
      tileStates,
      mineIndexes,
      status,
      rippleEffectDelays,
      timer
    };
  }

  if (status === GameStatus.IDLE) {
    mineIndexes = generateMineIndexes(
      gridWidth,
      gridHeight,
      difficultyMineCounts[difficulty],
      tileIndex
    );
    timer = startTimer();
  }

  const { tileStates: newStates, rippleEffectDelays: newRipples } = flipTile(
    tileIndex,
    mineIndexes,
    gridWidth,
    gridHeight,
    tileStates,
    rippleEffectDelays
  );

  status = getGameStatus(
    gridWidth,
    gridHeight,
    mineIndexes,
    newStates,
    tileIndex
  );

  if (status !== GameStatus.STARTED) {
    timer = pauseTimer(timer, Date.now());
  }

  return {
    gridWidth,
    gridHeight,
    mineIndexes,
    tileStates: newStates,
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
      return {
        ...initial,
        tileStates: {},
        rippleEffectDelays: {},
        status: GameStatus.IDLE,
        difficulty: state.difficulty
      };

    case GameActionTypes.FLIP_TILE_AT_INDEX:
      return handleFlipTile(state, action.tileIndex);

    case GameActionTypes.TOGGLE_TIMER:
      return { ...state, timer: toggleTimer(state.timer, action.timestamp) };

    case GameActionTypes.TOGGLE_DIFFICULTY:
      return {
        ...state,
        difficulty: toggleDifficulty(state.difficulty)
      };

    case GameActionTypes.LEAVE_GAME:
      return {
        ...state,
        status: GameStatus.MENU
      };

    default:
      return state;
  }
}
