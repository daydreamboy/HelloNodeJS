import DebugTool from '../library/DebugTool';

function test_inspectValue() {
    console.log('--- test_inspectValue ---');
    let a = true;
    console.log(DebugTool.inspectValue(a));

    let b = new Boolean('1');
    console.log(DebugTool.inspectValue(b));

    let c = 1;
    console.log(DebugTool.inspectValue(c));

    let d = 1;
    console.log(DebugTool.inspectValue(d, 'd'));
}

function test_currentFunctionName() {
    console.log('--- test_currentFunctionName ---');

    console.log(DebugTool.currentFunctionName());
    console.log(DebugTool.currentFunctionName());
}


function run() {
    console.log('*** DebugTool testing ***')
    test_inspectValue();
    test_currentFunctionName();
}

export { run };
