import { ActionTypes, GameAction } from './gameActions';
import { getRandomMineIndexes, flipTile, getGameStatus } from './helpers';

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
}

const initial: GameState = {
  gridWidth: 13,
  gridHeight: 10,
  totalMineCount: 25,
  mineIndexes: [],
  status: GameStatus.IDLE,
  neighbourMineCounts: {}
};

const handleFlipTile = (
  {
    gridWidth,
    gridHeight,
    totalMineCount,
    neighbourMineCounts,
    mineIndexes,
    status
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

  neighbourMineCounts = flipTile(
    tileIndex,
    mineIndexes,
    gridWidth,
    gridHeight,
    neighbourMineCounts
  );

  status = getGameStatus(
    gridWidth,
    gridHeight,
    mineIndexes,
    neighbourMineCounts,
    tileIndex
  );

  return {
    gridWidth,
    gridHeight,
    mineIndexes,
    totalMineCount,
    neighbourMineCounts,
    status
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
