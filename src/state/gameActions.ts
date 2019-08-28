export enum GameActionTypes {
  NEW_GAME,
  FLIP_TILE_AT_INDEX,
  PAUSE_TIMER,
  RESUME_TIMER
}

interface NewGameAction {
  type: GameActionTypes.NEW_GAME;
}

interface FlipTileAction {
  type: GameActionTypes.FLIP_TILE_AT_INDEX;
  tileIndex: number;
}

interface PauseTimerAction {
  type: GameActionTypes.PAUSE_TIMER;
  timestamp: number;
}

interface ResumeTimerAction {
  type: GameActionTypes.RESUME_TIMER;
  timestamp: number;
}

export type GameAction =
  | NewGameAction
  | FlipTileAction
  | PauseTimerAction
  | ResumeTimerAction;

export const createFlipAction = (tileIndex: number) => ({
  type: GameActionTypes.FLIP_TILE_AT_INDEX,
  tileIndex
});

export const createNewGameAction = () => ({
  type: GameActionTypes.NEW_GAME
});

export const createPauseAction = () => ({
  type: GameActionTypes.PAUSE_TIMER,
  timestamp: Date.now()
});

export const createResumeAction = () => ({
  type: GameActionTypes.RESUME_TIMER,
  timestamp: Date.now()
});
