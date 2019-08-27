import { GameStatus } from './gameReducer';

export const getNeighbours = (
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

export const getRandomMineIndexes = (
  gridWidth: number,
  gridHeight: number,
  mineCount: number,
  firstFlipIndex: number
) => {
  //Generate an "island" around the first click index
  const reservedIndexes = [
    ...getNeighbours(gridWidth, gridHeight, firstFlipIndex),
    firstFlipIndex
  ];

  const mineIndexes = new Set<number>();
  const gridSize = gridHeight * gridWidth;
  //TODO, array of available indexes, shuffle, take n
  while (mineIndexes.size !== mineCount) {
    const random = Math.floor(Math.random() * gridSize);
    if (!reservedIndexes.includes(random)) {
      mineIndexes.add(random);
    }
  }

  return Array.from(mineIndexes);
};

export const flipTile = (
  flipIndex: number,
  mineIndexes: number[],
  gridWidth: number,
  gridHeight: number,
  neigbourMineCounts: Record<number, number>
): Record<number, number> => {
  if (mineIndexes.includes(flipIndex)) {
    return mineIndexes.reduce((acc, val) => {
      acc[val] = 7;
      return acc;
    }, neigbourMineCounts);
  }

  const neighbours = getNeighbours(gridWidth, gridHeight, flipIndex);
  const neigbourMineCount = intersection(neighbours, mineIndexes).length;
  neigbourMineCounts[flipIndex] = neigbourMineCount;

  if (neigbourMineCount === 0) {
    //TODO: split to 2 functions
    let front = [...neighbours];
    while (front.length) {
      const current = front.pop()!;
      if (neigbourMineCounts[current] !== undefined) {
        continue;
      }
      const currentNeighbours = getNeighbours(gridWidth, gridHeight, current);
      const currentNeighbourMineCount = intersection(
        currentNeighbours,
        mineIndexes
      ).length;
      neigbourMineCounts[current] = currentNeighbourMineCount;
      if (!currentNeighbourMineCount) {
        front = front.concat(
          difference(
            difference(
              currentNeighbours,
              Object.keys(neigbourMineCounts).map(i => +i)
            ),

            front
          )
        );
      }
    }
  }

  return { ...neigbourMineCounts };
};

export const getGameStatus = (
  gridWidth: number,
  gridHeight: number,
  mineIndexes: number[],
  neigbourMineCount: Record<number, number>,
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
