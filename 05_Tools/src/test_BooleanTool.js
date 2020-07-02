import BooleanTool from '../library/BooleanTool';
import LogTool from "../library/LogTool";
import DebugTool from "../library/DebugTool";

function test_checkIfBoolean() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let x;

    x = true;
    console.log(x + ': ' + BooleanTool.checkIfBoolean(x)); // true

    x = new Boolean('1');
    console.log(x + ': ' + BooleanTool.checkIfBoolean(x)); // true

    x = 1;
    console.log(x + ': ' + BooleanTool.checkIfBoolean(x)); // false
}


function run() {
    LogTool.d('*** BooleanTool testing ***')
    test_checkIfBoolean();
}

export { run };
