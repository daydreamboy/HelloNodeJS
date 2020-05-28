import ObjectTool from "./ObjectTool";
import StringTool from "./StringTool";
import NumberTool from "./NumberTool";

class ArrayTool {
    static checkIfArray(variable) {
        return Array.isArray(variable);
    }

    static checkArrayIfEmpty(variable) {
        if (this.checkIfArray(variable)) {
            return false;
        }

        return variable.length == 0;
    }

    static checkArrayIfNotEmpty(variable) {
        if (!this.checkIfArray(variable)) {
            return false;
        }

        return variable.length != 0;
    }

    /**
     * Sort item in array by numeric order
     *
     * @param variable{Array} expected as Array type
     * @param keyPath{String} the key path. Default is empty string.
     * @param isDescend the ascend order or the descend order
     * @returns {Array|undefined} Return undefined if variable is not an array.
     *
     * @discussion This method treat items as Number/String/Object.
     * 1. Pass a empty keyPath, will sort the items directly.
     * 2. If sort Object items, pass keyPath separated by '.', e.g. 'level1.level2'.
     * 3. Allow items are mixed with String and Number, e.g. ['3', 2, '1'] or [{key: '3'}, {key: 2}, {key: '1'}]
     * 4. If can't compare two item by numeric, return the original array.
     *
     * @see https://stackoverflow.com/a/979289
     */
    static sortArrayItemsByNumeric(variable, keyPath = '', isDescend = false) {
        if (!this.checkIfArray(variable)) {
            return undefined;
        }

        if (this.checkArrayIfEmpty(variable)) {
            return variable;
        }

        return variable.sort((firstItem, secondItem) => {
            let firstNumber;
            let secondNumber;

            if ((StringTool.checkIfString(firstItem) && StringTool.checkIfString(secondItem)) ||
                (NumberTool.checkIfNumber(firstItem) && NumberTool.checkIfNumber(secondItem))) {
                firstNumber = parseFloat(firstItem + '');
                secondNumber = parseFloat(secondItem + '');
            }
            else {
                let firstValue = ObjectTool.valueForKeyPath(firstItem, keyPath);
                let secondValue = ObjectTool.valueForKeyPath(secondItem, keyPath);

                firstNumber = parseFloat(firstValue + '');
                secondNumber = parseFloat(secondValue + '');
            }

            if (isNaN(firstNumber) || isNaN(secondNumber)) {
                return 1;
            }

            if (isDescend) {
                return secondNumber - firstNumber;
            } else {
                return firstNumber - secondNumber;
            }
        });
    }

    /**
     * Convert elements of the array by key path into an Object
     *
     * @param variable{Array} the array to expected
     * @param keyPath{String} the key path
     * @returns {Object|undefined} the Object which key is the value according to the key path
     * @discussion If the keyPath not exists, return undefined
     * @see https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
     */
    static convertArrayToObjectUsingKeyPath(variable, keyPath) {
        if (!this.checkArrayIfNotEmpty(variable)) {
            return undefined;
        }

        if (!StringTool.checkStringIfNotEmpty(keyPath)) {
            return undefined;
        }

        if (this.checkArrayIfEmpty(variable)) {
            return variable;
        }

        let result = undefined;
        try {
            result = variable.reduce((map, element) => {
                let key = ObjectTool.valueForKeyPath(element, keyPath);
                if (key) {
                    map[key] = element;
                }
                else {
                    throw new Error(`the key path not exists: ${keyPath}`);
                }
                return map;
            }, {});
        }
        catch (error) {
            console.log(`an error occurred: ${error}`);
        }

        return result;
    }

    /**
     * Sort items of the array by key path and specific order
     *
     * @param variable{Array} the array to expected
     * @param keyPath{String} the key path to find and order
     * @param orderArray{Array} the specific order
     * @returns {Array|undefined} the sorted array
     * @discussion 1. If the key path not exists, return undefined
     * 2. If the element in order array not matches the value of the key path, return undefined
     */
    static sortArrayItemsByOrderArray(variable, keyPath, orderArray) {
        if (!this.checkArrayIfNotEmpty(variable)) {
            return undefined;
        }

        if (!StringTool.checkStringIfNotEmpty(keyPath)) {
            return undefined;
        }

        if (!this.checkArrayIfNotEmpty(orderArray)) {
            return undefined;
        }

        let sortedArray = undefined;
        let lookupObject = this.convertArrayToObjectUsingKeyPath(variable, keyPath);

        try {
            if (lookupObject) {
                sortedArray = orderArray.reduce((result, element) => {
                    let foundItem = lookupObject[element];
                    if (foundItem) {
                        result.push(foundItem);
                    }
                    else {
                        throw new Error(`can't find the item match ${element} by key path ${keyPath}`);
                    }
                    return result;
                }, []);
            }
        }
        catch (error) {
            console.log(`an error occurred: ${error}`);
        }

        return sortedArray;
    }
}

export default ArrayTool;
