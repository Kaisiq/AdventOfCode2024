//somehow works with task.test but not with task.input
const foo = Bun.file("task.input");

const text = await foo.text();
let result = 0;
text.split("\n").forEach((line) => {
  const arr = line.split("   ");
  if (arr.length === 2) {
    let currNumber = arr[0] - arr[1];
    console.log(currNumber)
    result += currNumber;
  }
});

if(result < 0) result *= -1
console.log(result);
