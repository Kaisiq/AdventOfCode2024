const file = Bun.file("task.input");
const text = await file.text();

const matrix = text.split("\n").map(line => line.split(""))

const rotations = [
  [-1,0],
  [0,1],
  [1,0],
  [0,-1]
];

let currentForward = rotations[0];

const rotate = () => {
  for(let i=0; i<rotations.length; ++i) {
    if(currentForward == rotations[i]){
      currentForward = rotations[(i+1) % rotations.length];
      return;
    }
  }
}

const getStartingPos = (matrix) => {
  for(let i = 0; i<matrix.length; ++i){
    for(let j = 0; j<matrix.length; ++j){
      if(matrix[i][j] == "^"){
        return [i,j];
      }
    }
  }
}

let currentPos = getStartingPos(matrix);

let result = 1;
matrix[currentPos[0]][currentPos[1]] = "X";

const notValidPos = (nextPos) => {
  return nextPos[0] >= matrix.length || nextPos[0] < 0 || nextPos[1] >= matrix?.[0]?.length || nextPos[1] < 0;
}

while(true){
  const nextPos = [currentPos[0] + currentForward[0], currentPos[1] + currentForward[1]];

  if(notValidPos(nextPos)){
    break;
  }
  if(matrix[nextPos[0]][nextPos[1]] == "#"){
    rotate();
    continue;
  }
  currentPos = nextPos;
  if(matrix[currentPos[0]][currentPos[1]] == "."){
    result++;
    matrix[currentPos[0]][currentPos[1]] = "X";
  }
}

console.log(result);
