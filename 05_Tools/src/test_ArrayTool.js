import ArrayTool from '../library/ArrayTool';

function test_checkIfArray() {
    let x;

    x = ['1', '2'];
    console.log(x + ': ' + ArrayTool.checkIfArray(x)); // true

    x = new Array('1', '2', '3');
    console.log(x + ': ' + ArrayTool.checkIfArray(x)); // true

    x = null;
    console.log(x + ': ' + ArrayTool.checkIfArray(x)); // false
}


function run() {
    console.log('*** ArrayTool testing ***')
    test_checkIfArray();
}

export { run };
