const file = Bun.file("task.input");
const text = await file.text();

let result = 0;
const [rules,inputs] = text.split("\n\n");


const before = {};
rules.split("\n").forEach(line => {
  const [el1, el2] = line.split("|");
  if(!before[el1]) before[el1] = [];
  before[el1] = [...before[el1], el2];
});

const isValid = (elementArr) => {
  const reversed = elementArr.reverse();
  const len = reversed.length;
  for(let i=0; i<len; ++i){
    if(!before[reversed[i]]) continue;
    for(let j=i+1; j<len; j++){
      if(before[reversed[i]].includes(reversed[j])){
        return false;
      }
    }
  }
  return true;
}

const swap = (arr, i,j) => {
  const a = arr[i];
  arr[i] = arr[j];
  arr[j] = a;
}

const makeValid = (elementArr) => {
  const len = elementArr.length;
  for(let i=0; i<len; ++i){
    if(!before[elementArr[i]]) continue;
    for(let j=i+1; j<len; j++){
      if(before[elementArr[i]].includes(elementArr[j])){
        swap(elementArr,i,j);
        return makeValid(elementArr);
      }
    }
  }
  return elementArr
}

inputs.split("\n").forEach(line => {
  const elementArr = line.split(",");
  // const middleEl = elementArr[Math.floor(elementArr.length/2)];
  if(isValid(elementArr)){
    // result += Number(middleEl);
  }
  else{
    const reversed = elementArr.reverse();
    const newArr = makeValid(reversed);
    const middleEl = newArr[Math.floor(newArr.length/2)];
    result += Number(middleEl);
  }
})


console.log(result);