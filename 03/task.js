const foo = Bun.file("task.input");
const list = await foo.text();
let result = 0;


let lastNumber = 0;
list.replaceAll('\n',"").replaceAll("mul(","\n").replaceAll(")","\n").replaceAll(",","\n").split("\n").forEach(el => {
  if(el.match('^[0-9]+$')){
    if(lastNumber !== 0){
      result += lastNumber * el;
      lastNumber = 0;
    }else{
      lastNumber = el;
    }
  }else{
    lastNumber = 0;
  }
});

console.log(result)