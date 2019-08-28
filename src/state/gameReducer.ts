import { ActionTypes, GameAction } from './gameActions';
import { flipTile, getGameStatus, getRandomMineIndexes } from './helpers';

export enum GameStatus {
  IDLE,
  STARTED,
  WON,
  LOST
}

export interface GameState {
  gridWidth: number;
  gridHeight: number;
  totalMineCount: number;
  mineIndexes: number[];
  status: GameStatus;
  neighbourMineCounts: Record<number, number>;
  rippleEffectDelays: Record<number, number>;
}

const initial: GameState = {
  gridWidth: 13,
  gridHeight: 10,
  totalMineCount: 5,
  mineIndexes: [],
  status: GameStatus.IDLE,
  neighbourMineCounts: {},
  rippleEffectDelays: {}
};

const handleFlipTile = (
  {
    gridWidth,
    gridHeight,
    totalMineCount,
    neighbourMineCounts,
    mineIndexes,
    status,
    rippleEffectDelays
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

  return {
    gridWidth,
    gridHeight,
    mineIndexes,
    totalMineCount,
    neighbourMineCounts: newCounts,
    status,
    rippleEffectDelays: newRipples
  };
};

export default function gameReducer(
  state: GameState = initial,
  action: GameAction
): GameState {
  switch (action.type) {
    case ActionTypes.NEW_GAME:
      return initial;
    case ActionTypes.FLIP_TILE_AT_INDEX:
      return handleFlipTile(state, action.tileIndex);
  }
  return state;
}
