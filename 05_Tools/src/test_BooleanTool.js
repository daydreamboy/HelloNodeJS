import BooleanTool from '../library/BooleanTool';

function test_checkIfBoolean() {
    let x;

    x = true;
    console.log(x + ': ' + BooleanTool.checkIfBoolean(x)); // true

    x = new Boolean('1');
    console.log(x + ': ' + BooleanTool.checkIfBoolean(x)); // true

    x = 1;
    console.log(x + ': ' + BooleanTool.checkIfBoolean(x)); // false
}


function run() {
    console.log('*** BooleanTool testing ***')
    test_checkIfBoolean();
}

export { run };
