import NumberTool from "../library/NumberTool";

function test_checkIfNumber() {
    console.log('--- test_checkIfNumber ---');
    let x;

    x = 1;
    console.log(x + ': ' + NumberTool.checkIfNumber(x)); // true

    x = 3.14;
    console.log(x + ': ' + NumberTool.checkIfNumber(x)); // true

    x = new Number('3.15');
    console.log(x + ': ' + NumberTool.checkIfNumber(x)); // true

    x = new Number(3.16);
    console.log(x + ': ' + NumberTool.checkIfNumber(x)); // true

    let JSONObject = {x: x};
    let string = JSON.stringify(JSONObject);
    console.log(string);
}

function test_compareNumber() {
    console.log('--- test_compareNumber ---');
    let x;
    let y;

    // Case 1
    x = new Number(1);
    y = new Number(2);

    console.log('x > y: ' + (x > y ? true : false)); // false
    console.log('x < y: ' + (x < y ? true : false)); // true

    // Case 2
    x = parseInt('abc');
    y = parseInt('10');
    console.log('x: ' + x + ', ' + isNaN(x)); // true
    console.log('x > y: ' + (x > y ? true : false)); // false
    console.log('x < y: ' + (x < y ? true : false)); // false

    // Case 3
    x = parseInt('1');
    y = parseInt('1585798922041');
    console.log('y: ' + y + ', ' + isNaN(y)); // false
    console.log('x > y: ' + (x > y ? true : false)); // false
    console.log('x < y: ' + (x < y ? true : false)); // true

    // Case 4
    x = parseInt('1');
    y = parseInt('15857989220410000000000');
    console.log('y: ' + y + ', ' + isNaN(y)); // false
    console.log('x > y: ' + (x > y ? true : false)); // false
    console.log('x < y: ' + (x < y ? true : false)); // true
}

function run() {
    console.log('*** NumberTool testing ***')
    test_checkIfNumber();
    test_compareNumber();
}

export { run };
