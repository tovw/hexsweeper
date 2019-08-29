export enum GameActionTypes {
  NEW_GAME,
  FLIP_TILE_AT_INDEX,
  TOGGLE_TIMER,
  TOGGLE_DIFFICULTY
}

interface NewGameAction {
  type: GameActionTypes.NEW_GAME;
}

interface FlipTileAction {
  type: GameActionTypes.FLIP_TILE_AT_INDEX;
  tileIndex: number;
}

interface ToggleTimerAction {
  type: GameActionTypes.TOGGLE_TIMER;
  timestamp: number;
}

interface ToggleDifficultyAction {
  type: GameActionTypes.TOGGLE_DIFFICULTY;
}

export type GameAction =
  | NewGameAction
  | FlipTileAction
  | ToggleTimerAction
  | ToggleDifficultyAction;

export const createFlipAction = (tileIndex: number) => ({
  type: GameActionTypes.FLIP_TILE_AT_INDEX,
  tileIndex
});

export const createNewGameAction = () => ({
  type: GameActionTypes.NEW_GAME
});

export const createToggleTimerAction = () => ({
  type: GameActionTypes.TOGGLE_TIMER,
  timestamp: Date.now()
});

export const createToggleDifficultyAction = () => ({
  type: GameActionTypes.TOGGLE_DIFFICULTY
});
