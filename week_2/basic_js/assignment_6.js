var a = 111;
var b = 999;

a = a + b;
b = a - b;
a = a - b;

console.log(`Swapped values of ${a} and ${b} are ${b} and ${a}`);
