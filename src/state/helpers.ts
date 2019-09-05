import { Difficulty, GameStatus, TileState, Timer } from './gameReducer';

export const getAdjacentIndexes = (
  gridWidth: number,
  gridHeight: number,
  fromIndex: number
): number[] => {
  const adjacent = [];
  const isNotLeftMost = fromIndex % gridWidth !== 0;
  const isNotRighMost = fromIndex % gridWidth !== gridWidth - 1;
  const isTopRow = fromIndex < gridWidth;
  const isBottomRow = fromIndex > (gridHeight - 1) * gridWidth - 1;
  //left
  if (isNotLeftMost) adjacent.push(fromIndex - 1);
  //right
  if (isNotRighMost) adjacent.push(fromIndex + 1);
  //up
  if (!isTopRow) adjacent.push(fromIndex - gridWidth);
  //down
  if (!isBottomRow) adjacent.push(fromIndex + gridWidth);

  //odd width
  if ((fromIndex % gridWidth) % 2 === 0) {
    //downleft
    if (isNotLeftMost && !isBottomRow) adjacent.push(fromIndex + gridWidth - 1);
    //downright
    if (isNotRighMost && !isBottomRow) adjacent.push(fromIndex + gridWidth + 1);
  } else {
    //even width
    //upleft
    if (!isTopRow && isNotLeftMost) adjacent.push(fromIndex - gridWidth - 1);
    //upright
    if (!isTopRow && isNotRighMost) adjacent.push(fromIndex - gridWidth + 1);
  }
  return adjacent;
};

const intersection = <T>(a: T[], b: T[]) => a.filter(x => b.includes(x));

const difference = <T>(a: T[], b: T[]) => a.filter(x => !b.includes(x));

export const generateMineIndexes = (
  gridWidth: number,
  gridHeight: number,
  mineCount: number,
  firstFlipIndex: number
) => {
  //Generate an "island" around the first click index
  const reservedIndexes = [
    ...getAdjacentIndexes(gridWidth, gridHeight, firstFlipIndex),
    firstFlipIndex
  ];

  const mineIndexes: number[] = [];
  const gridSize = gridHeight * gridWidth;
  while (mineIndexes.length !== mineCount) {
    const random = Math.floor(Math.random() * gridSize);
    if (!reservedIndexes.includes(random) && !mineIndexes.includes(random)) {
      mineIndexes.push(random);
    }
  }

  return mineIndexes;
};

const revealMines = (
  tileStates: Record<number, TileState>,
  mineIndexes: number[]
) =>
  mineIndexes.reduce((acc, val) => {
    acc[val] = 'MINE';
    return acc;
  }, tileStates);

const setDistances = (
  delays: Record<number, number>,
  indexes: number[],
  distance: number
) =>
  indexes.reduce((acc, cur) => {
    acc[cur] = distance;
    return acc;
  }, delays);

const flipAllConnectedEmpties = (
  mineIndexes: number[],
  gridWidth: number,
  gridHeight: number,
  tileStates: Record<number, TileState>,
  rippleEffectDelays: Record<number, number>,
  initialNeighbours: number[]
): {
  tileStates: Record<number, TileState>;
  rippleEffectDelays: Record<number, number>;
} => {
  let distance = 1;
  let front = [...initialNeighbours];
  let nextLayer: number[] = [];

  while (front.length || nextLayer.length) {
    if (!front.length) {
      front = [...nextLayer];
      distance += 1;
      rippleEffectDelays = setDistances(rippleEffectDelays, front, distance);
      nextLayer = [];
    }

    const current = front.pop()!;
    if (tileStates[current] !== undefined) {
      continue;
    }
    const currentNeighbours = getAdjacentIndexes(
      gridWidth,
      gridHeight,
      current
    );
    const currentNeighbourMineCount = intersection(
      currentNeighbours,
      mineIndexes
    ).length;

    tileStates[current] = currentNeighbourMineCount as TileState;
    if (!currentNeighbourMineCount) {
      nextLayer = nextLayer.concat(
        difference(currentNeighbours, [
          ...Object.keys(tileStates).map(i => +i),
          ...front,
          ...nextLayer
        ])
      );
    }
  }
  return { tileStates, rippleEffectDelays };
};

export const flipTile = (
  flipIndex: number,
  mineIndexes: number[],
  gridWidth: number,
  gridHeight: number,
  tileStates: Record<number, TileState>,
  rippleEffectDelays: Record<number, number>
): {
  tileStates: Record<number, TileState>;
  rippleEffectDelays: Record<number, number>;
} => {
  if (mineIndexes.includes(flipIndex)) {
    return {
      tileStates: revealMines(tileStates, mineIndexes),
      rippleEffectDelays
    };
  }

  const adjacentIndexes = getAdjacentIndexes(gridWidth, gridHeight, flipIndex);
  const adjacentMineCount = intersection(adjacentIndexes, mineIndexes).length;
  tileStates[flipIndex] = adjacentMineCount as TileState;
  rippleEffectDelays[flipIndex] = 0;

  if (adjacentMineCount !== 0) {
    return { tileStates, rippleEffectDelays };
  }

  rippleEffectDelays = setDistances(
    rippleEffectDelays,
    difference(adjacentIndexes, Object.keys(tileStates).map(i => +i)),
    1
  );

  return flipAllConnectedEmpties(
    mineIndexes,
    gridWidth,
    gridHeight,
    tileStates,
    rippleEffectDelays,
    adjacentIndexes
  );
};

export const getGameStatus = (
  gridWidth: number,
  gridHeight: number,
  mineIndexes: number[],
  neigbourMineCount: Record<number, TileState>,
  lastFlippedIndex: number
) => {
  if (mineIndexes.includes(lastFlippedIndex)) {
    return GameStatus.LOST;
  }
  if (
    Object.keys(neigbourMineCount).length ===
    gridWidth * gridHeight - mineIndexes.length
  ) {
    return GameStatus.WON;
  }

  return GameStatus.STARTED;
};

export const pauseTimer = (timer: Timer, pausedAt: number): Timer => {
  if (!timer.isRunning) return timer;
  return { startedAt: timer.startedAt, pausedAt, isRunning: false };
};

const resumeTimer = (timer: Timer, resumedAt: number): Timer => {
  if (timer.isRunning) return timer;
  return {
    startedAt: resumedAt - (timer.pausedAt - timer.startedAt),
    pausedAt: 0,
    isRunning: true
  };
};

export const toggleTimer = (timer: Timer, now: number) => {
  return timer.isRunning ? pauseTimer(timer, now) : resumeTimer(timer, now);
};

export const startTimer = (): Timer => ({
  startedAt: Date.now(),
  pausedAt: 0,
  isRunning: true
});

export const toggleDifficulty = (difficulty: Difficulty): Difficulty => {
  if (difficulty === 0) return 1;
  if (difficulty === 1) return 2;
  return 0;
};
