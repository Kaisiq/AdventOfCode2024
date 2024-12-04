const file = Bun.file("task.input");
const text = await file.text();

const part1Check = (newArr) => {
  return (
    (newArr.every(([a, b]) => a < b) || newArr.every(([a, b]) => a > b)) &&
    newArr.every(([a, b]) => Math.abs(a - b) <= 3 && Math.abs(a - b) >= 1)
  );
};

const part2Check = (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    let newArr = [];
    let arrCopy = [];
    for(let j = 0; j<arr.length; j++){
      arrCopy.push(arr[j]);
    }
    arrCopy.splice(i,1);

    for (let i = 0; i < arrCopy.length - 1; ++i) {
      newArr.push([arrCopy[i], arrCopy[i + 1]]);
    }
    if (part1Check(newArr)) {
      return true;
    }
  }
  return false;
};

let result = 0;
text
  .trim()
  .split("\n")
  .forEach((line) => {
    const arr = line.trim().split(" ").map(Number);
    let newArr = [];

    for (let i = 0; i < arr.length - 1; ++i) {
      newArr.push([arr[i], arr[i + 1]]);
    }

    if (part1Check(newArr)) {
      result++;
    } else if (part2Check(arr)) {
      result++;
    }
  });

console.log(result);
