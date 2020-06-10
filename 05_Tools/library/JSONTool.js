import ObjectTool from "./ObjectTool";
import StringTool from "./StringTool";
import NumberTool from "./NumberTool";
import ArrayTool from "./ArrayTool";
import BooleanTool from "./BooleanTool";

class JSONTool {
    /**
     * Merge two JSON Object using overwrite mode
     *
     * @param {object} JSONObject1 - the base JSON object
     * @param {object} JSONObject2 - the overwrite JSON object
     * @returns {JSON object|undefined}
     * @discussion This method uses JSONObject2 to overwrite JSONObject1. If the key of JSONObject2 not in JSONObject1 will
     * not insert the new key in JSONObject1
     */
    static mergeTwoJSONObject(JSONObject1, JSONObject2) {
        // Note: allow array or dict
        if (!ObjectTool.checkIfObjectType(JSONObject1) || !ObjectTool.checkIfObjectType(JSONObject2)) {
            return undefined;
        }

        return mergeTwoJSONObject_internal(JSONObject1, JSONObject2);
    }

    /**
     * Parse object as JSON Object
     *
     * @param {object|string} variable - the String or Object or not
     * @returns {JSON object|undefined}. If parse failed, return undefined
     */
    static JSONObjectWithObject(variable) {
        if (ObjectTool.checkIfObject(variable)) {
            return variable;
        }

        let JSONObject = undefined;
        try {
            JSONObject = JSON.parse(variable);
        }
        catch (error) {
            //console.log(error);
        }

        return JSONObject;
    }
}

// Private
// @see https://stackoverflow.com/a/36626425

function mergeTwoJSONObject_internal(baseObject, additionalObject) {
    if (baseObject === null) {
        return baseObject;
    }
    else if (BooleanTool.checkIfBoolean(baseObject)) {
        return BooleanTool.checkIfBoolean(additionalObject) ? additionalObject : baseObject;
    }
    else if (NumberTool.checkIfNumber(baseObject)) {
        return NumberTool.checkIfNumber(additionalObject) ? additionalObject : baseObject;
    }
    else if (StringTool.checkIfString(baseObject)) {
        return StringTool.checkIfString(additionalObject) ? additionalObject : baseObject;
    }
    else if (ArrayTool.checkIfArray(baseObject)) {
        if (!ArrayTool.checkIfArray(additionalObject)) {
            return baseObject;
        }

        if (baseObject.length != additionalObject.length) {
            return baseObject;
        }

        let arr = [];
        for (let i = 0; i < baseObject.length; ++i) {
            let itemInBaseObject = baseObject[i];
            let itemInAdditionalObject = additionalObject[i];

            let mergedItem = mergeTwoJSONObject_internal(itemInBaseObject, itemInAdditionalObject);
            if (mergedItem != undefined) {
                arr.push(mergedItem);
            }
        }

        return arr;
    }
    else if (ObjectTool.checkIfObject(baseObject)) {
        if (!ObjectTool.checkIfObject(additionalObject)) {
            return baseObject;
        }

        if (ObjectTool.checkIfObjectEmpty(additionalObject)) {
            return baseObject;
        }

        let dict = {};
        for (let key in baseObject) {
            if (baseObject.hasOwnProperty(key)) {
                let itemInBaseObject = baseObject[key];
                let itemInAdditionalObject = additionalObject[key];

                let mergedItem = mergeTwoJSONObject_internal(itemInBaseObject, itemInAdditionalObject);
                if (mergedItem != undefined) {
                    dict[key] = mergedItem;
                }
            }
        }

        return dict;
    }
    else {
        return undefined;
    }
}

export default JSONTool;