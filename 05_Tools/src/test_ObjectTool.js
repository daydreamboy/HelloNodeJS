import ObjectTool from "../library/ObjectTool";

function test_checkIfObjectType() {
    console.log('--- test_checkIfObjectType ---');
    let x;

    x = ['1', '2'];
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // true

    x = { key: 'value'};
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // true

    x = null;
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // false

    x = 'abc';
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // false

    x = 1;
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // false

    x = function () {
        console.log('Hello');
    };
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // false

    x = Number('3.14');
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // false

    x = new Map();
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // true

    x = JSON.parse('{"key":"value"}');
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // true

    x = new Date();
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // true

    x = new RegExp('ab+c', 'i');
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // true

    x = JSON;
    console.log(x + ': ' + ObjectTool.checkIfObjectType(x)); // true
}

function test_Object_keys() {
    console.log('--- test_Object_keys ---');
    let x;

    x = ['1', '2'];
    console.log(x + ': ' + Object.keys(x));

    x = { key: 'value'};
    console.log(x + ': ' + Object.keys(x));

    x = null;
    //console.log(Object.keys(x)); // Exception:  Cannot convert undefined or null to object

    x = 'abc';
    console.log(x + ': ' + Object.keys(x));

    x = 1;
    console.log(x + ': ' + Object.keys(x));

    x = function () {
        console.log('Hello');
    };
    console.log(x + ': ' + Object.keys(x));

    x = Number('3.14');
    console.log(x + ': ' + Object.keys(x));

    x = new Map();
    console.log(x + ': ' + Object.keys(x));

    x = JSON.parse('{"key":"value"}');
    console.log(x + ': ' + Object.keys(x));

    x = new Date();
    console.log(x + ': ' + Object.keys(x));

    x = new RegExp('ab+c', 'i');
    console.log(x + ': ' + Object.keys(x));

    x = JSON;
    console.log(x + ': ' + Object.keys(x));
}

function test_checkIfObject() {
    console.log('--- test_checkIfObject ---');
    let x;

    x = ['1', '2'];
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

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
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = JSON.parse('{"key":"value"}');
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // true

    x = new Date();
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = new RegExp('ab+c', 'i');
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // false

    x = JSON;
    console.log(x + ': ' + ObjectTool.checkIfObject(x)); // true
}

function test_checkIfObjectEmpty() {
    console.log('--- test_checkIfObjectEmpty ---');
    let x;

    x = ['1', '2'];
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = { key: 'value'};
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = null;
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = 'abc';
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = 1;
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = function () {
        console.log('Hello');
    };
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = Number('3.14');
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = new Map();
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = JSON.parse('{"key":"value"}');
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = new Date();
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = new RegExp('ab+c', 'i');
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // false

    x = JSON;
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // true

    x = {};
    console.log(x + ': ' + ObjectTool.checkIfObjectEmpty(x)); // true
}

function test_valueForKeyPath() {
    console.log('--- test_valueForKeyPath ---');
    let x;
    let output;

    // Case 1
    x = undefined;
    output = ObjectTool.valueForKeyPath(x, '');
    console.log(x + ': ' + output);

    // Case 2
    x = 12;
    output = ObjectTool.valueForKeyPath(x, '');
    console.log(x + ': ' + output);

    // Case 2
    x = 'hello';
    output = ObjectTool.valueForKeyPath(x, '');
    console.log(x + ': ' + output);
}

function run() {
    console.log('*** ObjectTool testing ***')
    test_checkIfObjectType();
    test_Object_keys();
    test_checkIfObject();
    test_checkIfObjectEmpty();
    test_valueForKeyPath();
}

export { run };
