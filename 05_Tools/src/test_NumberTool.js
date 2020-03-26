import NumberTool from "../library/NumberTool";

function test_checkIfNumber() {
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

function run() {
    console.log('*** NumberTool testing ***')
    test_checkIfNumber();
}

export { run };
