import ObjectTool from "../library/ObjectTool";

function test_checkIfObject() {
    let x;

    x = ['1', '2'];
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // true

    x = { key: 'value'};
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // true

    x = null;
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = 'abc';
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = 1;
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = function () {
        console.log('Hello');
    };
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = Number('3.14');
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = new Map();
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // true

    x = JSON.parse('{"key":"value"}');
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // true
}


function run() {
    console.log('*** ObjectTool testing ***')
    test_checkIfObject();
}

export { run };
