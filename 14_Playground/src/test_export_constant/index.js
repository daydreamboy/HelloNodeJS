import {LogTool} from "./log";

function test_export_constant() {
    LogTool('a log with custom tag');
}

export { test_export_constant };
