// O(n^2)
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

for(let i=0; i<list1.length; ++i){
  for(let j=0; j<list2.length; ++j){
    if(list1[i]===list2[j]){
      result+=parseInt(list1[i]);
    }
  }
}

console.log(result);