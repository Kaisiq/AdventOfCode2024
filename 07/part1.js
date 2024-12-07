const file = Bun.file("task.input");
const text = await file.text();

let result = 0;
const results = text.split("\n").map(line => line.split(":")[0]);
const equations = text.split("\n").map(line => line.split(": ")[1]);

const testAll = (multiCount, equationArr, result) => {
  const len = equationArr.length;
  const operators = new Array(len - 1).fill('+');
  
  const calculateResult = (nums, ops) => {
    const numbers = [...nums]; // Create copy to avoid modifying original array
    let currentResult = Number(numbers[0]);
    
    for (let i = 1; i < numbers.length; i++) {
      if (ops[i-1] === '*') currentResult *= Number(numbers[i]);
      if (ops[i-1] === '+') currentResult += Number(numbers[i]);
    }
    return currentResult;
  };

  const generateCombinations = (pos, multLeft, ops) => {
    if (pos === len - 1) {
      const multCount = ops.filter(x => x === '*').length;
      if (multCount === multiCount) {
        const val = calculateResult(equationArr, ops);
        if (Number(val) === Number(result)) {
          return true;
        }
      }
      return false;
    }

    const newOpsPlus = [...ops];
    newOpsPlus[pos] = '+';
    if (generateCombinations(pos + 1, multLeft, newOpsPlus)) return true;

    if (multLeft > 0) {
      const newOpsMult = [...ops];
      newOpsMult[pos] = '*';
      if (generateCombinations(pos + 1, multLeft - 1, newOpsMult)) return true;
    }

    return false;
  };

  return generateCombinations(0, multiCount, operators);
};

const canEqual = (equation, result) => {
  const eqLen = equation.split(" ").length;
  for(let i = 0; i <= eqLen - 1; i++) { // Try all possible numbers of multiplications
    if (testAll(i, equation.split(" "), result)) return true;
  }
  return false;
};

for(let i = 0; i < results.length; ++i) {
  if(canEqual(equations[i], results[i])) {
    result += Number(results[i]);
  }
}

console.log(result);