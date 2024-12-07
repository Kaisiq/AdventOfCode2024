const file = Bun.file("task.input");
const text = await file.text();
let result = 0;
const matrix = text.split("\n").map((line) => line.split(""));

const isValidPos = (i, j, n, m) => (i >= 0 && i < n && j >= 0 && j < m);

const findXMAS = (i, j, di, dj, matrix, width, height) => {
  let pos = [[i, j]];
  let curr = 'X';
  let nextChars = ['M', 'A', 'S'];
  
  for (let k = 0; k < 3; k++) {
    i += di;
    j += dj;
    
    if (!isValidPos(i, j, width, height)) return false;
    if (matrix[i][j] !== nextChars[k]) return false;
    pos.push([i, j]);
  }
  
  return true;
}

const directions = [
  [-1, -1], // up-left
  [-1, 0],  // up
  [-1, 1],  // up-right
  [0, -1],  // left
  [0, 1],   // right
  [1, -1],  // down-left
  [1, 0],   // down
  [1, 1]    // down-right
];

const width = matrix.length;
const height = matrix[0].length;

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    if (matrix[i][j] === 'X') {
      // Try all 8 directions from each X
      for (let [di, dj] of directions) {
        if (findXMAS(i, j, di, dj, matrix, width, height)) {
          result++;
        }
      }
    }
  }
}

console.log(result);