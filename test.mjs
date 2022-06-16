import { $ } from "zx"

function main() {
    console.log('test');
    return "Hello World";
}



let test = new Function(`
return ( function main(){
    console.log('test string');
    return "Hello World String";})()
`)

console.log(main());
console.log(test());