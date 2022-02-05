var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var StorageTool = /** @class */ (function () {
    function StorageTool() {
    }
    /**
     * Get value from object by key path
     *
     * @param {key} string the key
     * @param {defaultValue}  Array<string> the default value
     *
     * @returns Return default value if not found.
     *
     * @see Web storage API: https://developer.mozilla.org/en-US/docs/Web/API/Storage
     */
    StorageTool.loadUniqueStringArray = function (key, defaultValue) {
        if (typeof window == 'object') {
            var JSONString = window.localStorage.getItem(key);
            if (JSONString) {
                var stringArray = JSON.parse(JSONString);
                if (Array.isArray(stringArray)) {
                    // @see https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
                    return __spreadArray([], new Set(stringArray), true);
                }
            }
        }
        return defaultValue;
    };
    StorageTool.saveStringArrayToStorage = function (key, value) {
        if (typeof key !== 'string') {
            return false;
        }
        var jsonString = JSON.stringify(value);
        window.localStorage.setItem(key, jsonString);
        return true;
    };
    StorageTool.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    return StorageTool;
}());
export default StorageTool;
