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
     * @param variable expected as Array type
     * @param keyPath the key path. Default is empty string.
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
}

export default ArrayTool;
