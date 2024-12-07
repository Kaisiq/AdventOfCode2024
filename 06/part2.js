//SLOW AF
const file = Bun.file("task.input");
const text = await file.text();

const matrix = text.split("\n").map(line => line.split(""));

const rotations = [
  [-1,0],
  [0,1],
  [1,0],
  [0,-1]
];

let currentForward = rotations[0];

const rotate = () => {
  for(let i=0; i<rotations.length; ++i) {
    if(currentForward[0] === rotations[i][0] && currentForward[1] === rotations[i][1]){
      currentForward = rotations[(i+1) % rotations.length];
      return;
    }
  }
}

const getStartingPos = (matrix) => {
  for(let i = 0; i<matrix.length; ++i){
    for(let j = 0; j<matrix[0].length; ++j){
      if(matrix[i][j] === "^"){
        return [i,j];
      }
    }
  }
  return null;
}

const isInLoop = (currentMatrix) => {
  let currentPos = [...startingPos];
  currentMatrix[currentPos[0]][currentPos[1]] = "X";
  let count = 0;
  while(true){
    const nextPos = [currentPos[0] + currentForward[0], currentPos[1] + currentForward[1]];
    
    if(notValidPos(nextPos)){
      return false;
    }
    
    if(currentMatrix[nextPos[0]][nextPos[1]] === "#"){
      rotate();
      if(allUntilNextWallAreX(currentPos, currentMatrix)) {
        count++;
        if (count > 3) return true;
      }
      continue;
    }
    
    currentPos = nextPos;
    if(currentMatrix[currentPos[0]][currentPos[1]] === "."){
      currentMatrix[currentPos[0]][currentPos[1]] = "X";
    }
  }
}

const allUntilNextWallAreX = (currentPos, currentMatrix) => {
  let testPos = [...currentPos];
  while(!notValidPos(testPos)){
    if(currentMatrix[testPos[0]][testPos[1]] === "#") {
      return true;
    }
    if(currentMatrix[testPos[0]][testPos[1]] === ".") {
      return false;
    }
    testPos = [testPos[0] + currentForward[0], testPos[1] + currentForward[1]];
  }
  return false;
}

const startingPos = getStartingPos(matrix);

let result = 0;

const notValidPos = (nextPos) => {
  return nextPos[0] >= matrix.length || 
         nextPos[0] < 0 || 
         nextPos[1] >= matrix[0].length || 
         nextPos[1] < 0;
}

for(let i=0; i<matrix.length; ++i){
  for(let j=0; j<matrix[0].length; ++j){    
    const currentMatrix = JSON.parse(JSON.stringify(matrix));
    if(currentMatrix[i][j] === "."){
      currentMatrix[i][j] = '#';
      currentForward = rotations[0];
      if(isInLoop(currentMatrix)){
      currentMatrix[i][j] = 'O';

        console.log(currentMatrix.map(row => row.join("")).join("\n"), "\n");
        result++;
      }
    }
  }
}

console.log(result);
