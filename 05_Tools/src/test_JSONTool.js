import JSONTool from '../library/JSONTool';
import NumberTool from "../library/NumberTool";

function test_JSONObject() {
    console.log('--- test_JSONObject ---');
    let x;
    let JSONObject;
    let JSONString;

    x = new Number(3.16);
    console.log(x + ': ' + NumberTool.checkIfNumber(x)); // true

    JSONObject = {x: x};
    JSONString = JSON.stringify(JSONObject);
    console.log(JSONString);

    JSONObject = JSON.parse('{"integer": 1, "float": 3.14, "bool": true}');
    console.log(typeof JSONObject.integer); // number
    console.log(typeof JSONObject.float); // number
    console.log(typeof JSONObject.bool); // number
}

function test_mergeTwoJSONObject() {
    console.log('--- test_mergeTwoJSONObject ---');

    let JSONString1;
    let JSONString2;
    let output;

    // Case 1
    JSONString1 = '{"name":"Alice", "job":"teacher"}';
    JSONString2 = '{"name":"Bob"}';
    output = JSONTool.mergeTwoJSONObject(JSON.parse(JSONString1), JSON.parse(JSONString2));
    console.log(JSON.stringify(output));

    JSONString1 = '{"name":"Alice", "job":"teacher"}';
    JSONString2 = '{}';
    output = JSONTool.mergeTwoJSONObject(JSON.parse(JSONString1), JSON.parse(JSONString2));
    console.log(JSON.stringify(output));

    // Case 2
    JSONString1 = '["1", "2", "3"]';
    JSONString2 = '[{}, "22", null]';
    output = JSONTool.mergeTwoJSONObject(JSON.parse(JSONString1), JSON.parse(JSONString2));
    console.log(JSON.stringify(output));

    // Case 3
    JSONString1 = '["1", "2", "3"]';
    JSONString2 = '[{}, "22"]';
    output = JSONTool.mergeTwoJSONObject(JSON.parse(JSONString1), JSON.parse(JSONString2));
    console.log(JSON.stringify(output));

    // Case 4
    JSONString1 = '{"name":"Alice","job":"teacher","children":[{"name":"Lucy"},{"name":"Lucky"}]}';
    JSONString2 = '{"children":[{},{"name":"Lily"}]}';
    output = JSONTool.mergeTwoJSONObject(JSON.parse(JSONString1), JSON.parse(JSONString2));
    console.log(JSON.stringify(output));

    // Case 5
    JSONString1 = '{"name":"Alice","job":"teacher","children":[{"name":"Lucy"},{"name":"Lucky"}]}';
    JSONString2 = '{"children":[]}';
    output = JSONTool.mergeTwoJSONObject(JSON.parse(JSONString1), JSON.parse(JSONString2));
    console.log(JSON.stringify(output));

    // Case 6
    JSONString1 = '[{"title":"a","price":100,"onSale":true,"size":{"h":"2","w":"3"}},{"title":"b","price":200,"onSale":false,"size":{"h":"4","w":"5"}}]';
    JSONString2 = '[{},{"onSale":true,"size":{"w":"6"}}]';
    output = JSONTool.mergeTwoJSONObject(JSON.parse(JSONString1), JSON.parse(JSONString2));
    console.log(JSON.stringify(output));
}

function test_JSONObjectWithObject() {
    console.log('--- test_JSONObjectWithObject ---');
    let x;
    let output;

    // Case 1
    x = '{"key": "value"}';
    console.log(x + ': ' + JSON.stringify(JSONTool.JSONObjectWithObject(x)));

    // Case 2
    x = '["value1", "value2"]';
    console.log(x + ': ' + JSON.stringify(JSONTool.JSONObjectWithObject(x)));

    // Case 3
    x = {"key2": "value2"};
    console.log(x + ': ' + JSON.stringify(JSONTool.JSONObjectWithObject(x)));
}

function run() {
    console.log('*** JSONTool testing ***')
    test_JSONObject();
    test_mergeTwoJSONObject();
    test_JSONObjectWithObject();
}

export { run };
