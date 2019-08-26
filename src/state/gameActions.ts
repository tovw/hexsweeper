export enum ActionTypes {
  NEW_GAME,
  FLIP_TILE_AT_INDEX
}

interface NewGameAction {
  type: ActionTypes.NEW_GAME;
}

interface FlipTileAction {
  type: ActionTypes.FLIP_TILE_AT_INDEX;
  tileIndex: number;
}

export type GameAction = NewGameAction | FlipTileAction;

export const createFlipAction = (tileIndex: number) => ({
  type: ActionTypes.FLIP_TILE_AT_INDEX,
  tileIndex
});

export const createNewGame = () => ({
  type: ActionTypes.NEW_GAME
});
