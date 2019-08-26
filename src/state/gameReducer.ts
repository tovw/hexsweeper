import { ActionTypes, GameAction } from './gameActions';

enum GameStatus {
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
}

const initial: GameState = {
  gridWidth: 13,
  gridHeight: 10,
  totalMineCount: 25,
  mineIndexes: [],
  status: GameStatus.IDLE
};

export default function gameReducer(
  state: GameState = initial,
  action: GameAction
): GameState {
  switch (action.type) {
    case ActionTypes.NEW_GAME:
      return initial;
    case ActionTypes.FLIP_TILE_AT_INDEX:
      return state;
  }
  return state;
}
