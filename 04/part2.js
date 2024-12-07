const file = Bun.file("task.input");
const text = await file.text();
let result = 0;
const matrix = text.split("\n").map((line) => line.split(""));

const isValidPos = (i, j, n, m) => (i >= 0 && i < n && j >= 0 && j < m);

const checkMAS = (i, j, di, dj, matrix, width, height) => {
  let chars = [];
  let currI = i;
  let currJ = j;
  
  for (let k = 0; k < 3; k++) {
    if (!isValidPos(currI, currJ, width, height)) return false;
    chars.push(matrix[currI][currJ]);
    currI += di;
    currJ += dj;
  }
  
  return chars.join('') === 'MAS' || chars.join('') === 'SAM';
}

const findXMAS = (i, j, matrix, width, height) => {
  // Check upper-left to lower-right diagonal
  const hasFirstMAS = checkMAS(i-1, j-1, 1, 1, matrix, width, height);
  // Check upper-right to lower-left diagonal  
  const hasSecondMAS = checkMAS(i-1, j+1, 1, -1, matrix, width, height);
  
  return hasFirstMAS && hasSecondMAS;
}

const width = matrix.length;
const height = matrix[0].length;

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    if (matrix[i][j] === 'A') {
      if (findXMAS(i, j, matrix, width, height)) {
        result++;
      }
    }
  }
}

console.log(result);