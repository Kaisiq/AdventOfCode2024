const foo = Bun.file("task.input");

const text = await foo.text();
let result = 0;

let list1 = [];
let list2 = [];

text.split("\n").forEach(line => {
  const arr = line.split("   ");
  if(arr.length === 2){
  list1.push(arr[0]);
  list2.push(arr[1]);
  }
});

const s1 = list1.sort();
const s2 = list2.sort();

for(let i=0; i<list1.length; ++i){
  let currNumber = s1[i] - s2[i];
  if(currNumber < 0) currNumber*=-1;
  result+=currNumber
}

console.log(result);