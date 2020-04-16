import ArrayTool from '../library/ArrayTool';

function test_checkIfArray() {
    console.log('--- test_checkIfArray ---');

    let x;

    x = ['1', '2'];
    console.log(x + ': ' + ArrayTool.checkIfArray(x)); // true

    x = new Array('1', '2', '3');
    console.log(x + ': ' + ArrayTool.checkIfArray(x)); // true

    x = null;
    console.log(x + ': ' + ArrayTool.checkIfArray(x)); // false
}

function test_sortArrayItemsByNumeric() {
    console.log('--- test_sortArrayItemsByNumeric ---');

    let x;
    let output;

    // Case 1
    x = ['3', '1', '2.3'];
    output = ArrayTool.sortArrayItemsByNumeric(x);
    console.log(output); // [ '1', '2.3', '3' ]

    // Case 2
    x = [3, 1, 2.3];
    output = ArrayTool.sortArrayItemsByNumeric(x);
    console.log(output); // [ 1, 2.3, 3 ]

    // Case 3
    x = [{}, [], 2.3];
    output = ArrayTool.sortArrayItemsByNumeric(x);
    console.log(output); // [ {}, [], 2.3 ]

    // Case 4
    x = ['a', '2', 'c'];
    output = ArrayTool.sortArrayItemsByNumeric(x);
    console.log(output); // [ 'a', '2', 'c' ]

    // Case 5
    x = [{'key': '3'}, {'key': '3.2'}, {'key': '1'}];
    output = ArrayTool.sortArrayItemsByNumeric(x, 'key');
    console.log(output); // [ { key: '1' }, { key: '3' }, { key: '3.2' } ]

    // Case 6
    x = [{'key': 3}, {'key': 2.2}, {'key': 1}];
    output = ArrayTool.sortArrayItemsByNumeric(x, 'key');
    console.log(output); // [ { key: 1 }, { key: 2.2 }, { key: 3 } ]

    // Case 7
    x = [{'key': '2.5'}, {'key': 3}, {'key': 1}];
    output = ArrayTool.sortArrayItemsByNumeric(x, 'key', true);
    console.log(output); // [ { key: 3 }, { key: '2.5' }, { key: 1 } ]

    // Case 8
    x = [{'key': '2.5'}, {'key': 3}, {'key': 1}];
    output = ArrayTool.sortArrayItemsByNumeric(x, 'key', false);
    console.log(output); // [ { key: 1 }, { key: '2.5' }, { key: 3 } ]

    // Case 9
    x = [{'level1': {'level2': '2.1'}}, {'level1': {'level2': 3}}, {'level1': {'level2': 1}}];
    output = ArrayTool.sortArrayItemsByNumeric(x, 'level1.level2', false);
    console.log(output); // [ { level1: { level2: 1 } }, { level1: { level2: '2.1' } }, { level1: { level2: 3 } } ]
}

function run() {
    console.log('*** ArrayTool testing ***')
    test_checkIfArray();
    test_sortArrayItemsByNumeric();
}

export {run};
