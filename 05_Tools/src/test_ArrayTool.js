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

function test_convertArrayToObjectUsingKeyPath() {
    console.log('--- test_convertArrayToObjectUsingKeyPath ---');

    let x;
    let output;

    x = [
        {
            'id': '1',
            'other': 'some string1',
            'map': {
                'mid': 'a'
            }
        },
        {
            'id': '2',
            'other': 'some string2',
            'map': {
                'mid': 'b'
            }
        },
        {
            'id': '3',
            'other': 'some string3',
            'map': {
                'mid': 'c'
            }
        }
    ];

    // Case 1.1
    output = ArrayTool.convertArrayToObjectUsingKeyPath(x, 'id');
    console.log(output);

    // Case 1.2
    output = ArrayTool.convertArrayToObjectUsingKeyPath(x, 'map.mid');
    console.log(output);

    // Case 1.3
    output = ArrayTool.convertArrayToObjectUsingKeyPath(x, 'map.nid');
    console.log(output);
}

function test_sortArrayItemsByOrderArray() {
    console.log('--- test_sortArrayItemsByOrderArray ---');

    let x;
    let output;
    let orderArray;

    x = [
        {
            'id': '1',
            'other': 'some string1',
            'map': {
                'mid': 'a'
            }
        },
        {
            'id': '2',
            'other': 'some string2',
            'map': {
                'mid': 'b'
            }
        },
        {
            'id': '3',
            'other': 'some string3',
            'map': {
                'mid': 'c'
            }
        }
    ];

    // Case 1
    orderArray = [ '3', '2', '1' ];
    output = ArrayTool.sortArrayItemsByOrderArray(x, 'id', orderArray);
    console.log(`order: ${orderArray}`);
    console.log(output);

    // Case 2
    orderArray = [ 'b', 'c', 'a' ];
    output = ArrayTool.sortArrayItemsByOrderArray(x, 'map.mid', orderArray);
    console.log(`order: ${orderArray}`);
    console.log(output);

    // Case 3
    orderArray = [ 'b', 'c', 'a' ];
    output = ArrayTool.sortArrayItemsByOrderArray(x, 'map.nid', orderArray);
    console.log(`order: ${orderArray}`);
    console.log(output);
}

function run() {
    console.log('*** ArrayTool testing ***')
    test_checkIfArray();
    test_sortArrayItemsByNumeric();
    test_convertArrayToObjectUsingKeyPath();
    test_sortArrayItemsByOrderArray();
}

export {run};
