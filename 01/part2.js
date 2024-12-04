//O(nlogn)
const foo = Bun.file("task.input");
const text = await foo.text();

let list1 = [];
let list2 = [];

text.split("\n").forEach(line => {
  const arr = line.trim().split(/\s+/);
  if (arr.length === 2) {
    list1.push(Number(arr[0]));
    list2.push(Number(arr[1]));
  }
});

const s1 = list1.sort((a, b) => a - b);
const s2 = list2.sort((a, b) => a - b);

const countOccurrences = (arr, num) => {
  let firstIndex = arr.indexOf(num);
  if (firstIndex === -1) return 0;
  let count = 0;
  while (firstIndex < arr.length && arr[firstIndex] === num) {
    count++;
    firstIndex++;
  }
  return count;
};

let result = 0;
let i = 0;
while (i < s1.length) {
  const currNumber = s1[i];
  const countInList1 = countOccurrences(s1, currNumber);
  const countInList2 = countOccurrences(s2, currNumber);
  
  result += countInList1 * countInList2 * currNumber;
  
  i += countInList1;
}

console.log(result);
