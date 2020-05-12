import StringTool from "./StringTool";

class ObjectTool {
    /**
     * Get value from object by key path
     *
     * @param {Object} object the object
     * @param {String} keyPath the key path, e.g. 'foo.bar', 'foo.bar.2'.
     *
     * @returns {Object} Return undefined if not found or parameter is wrong or any exception occurred.
     *                   Return the original object if keyPath is empty string.
     *
     * @see https://stackoverflow.com/a/44627252
     */
    static valueForKeyPath(object, keyPath) {
        if (!StringTool.checkIfString(keyPath)) {
            return undefined;
        }

        if (keyPath === '') {
            return object;
        }

        let result = undefined;
        try {
            result = keyPath.split('.').reduce((previous, current) => {
                return previous[current];
            }, object);
        } catch (error) {
            //console.log(error);
        }

        return result;
    }

    /**
     * Check a variable if object type (Object, Array, Date, ...)
     *
     * @param variable
     * @returns {boolean|boolean}
     *
     * @see https://stackoverflow.com/a/8511350
     */
    static checkIfObjectType(variable) {
        return typeof variable === 'object' && variable !== null;
    }

    /**
     * Check a variable if Object type, e.g. {key: value}
     *
     * @param variable
     * @returns {boolean|boolean}
     *
     * @see https://stackoverflow.com/a/51285298
     * @discussion This method not accurately check Object type, e.g. checkIfObject(JSON) return true.
     * And not treat Map as Object type
     */
    static checkIfObject(variable) {
        if (typeof variable === 'object' && variable !== null) {
            if (variable.constructor === Object) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check a variable if Object type and empty, e.g. {}
     *
     * @param variable
     * @returns {boolean}
     *
     * @see https://stackoverflow.com/a/32108184
     */
    static checkIfObjectEmpty(variable) {
        if (typeof variable === 'object' && variable !== null) {
            if (variable.constructor === Object && Object.keys(variable).length === 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Dump properties as key: value to console.log
     *
     * @param variable the expected object
     * @returns {boolean} true if dump successfully, or false if parameter is not correct
     * @see https://flaviocopes.com/how-to-inspect-javascript-object/
     */
    static dumpProperties(variable) {
        if (!this.checkIfObject(variable)) {
            console.log('[Error] not a object: ' + variable);
            return false;
        }

        console.log('properties of ' + variable + ':');
        for (const prop in variable) {
            if (variable.hasOwnProperty(prop)) {
                console.log(`${prop}: ${variable[prop]}`);
            }
        }

        return true;
    }
}

export default ObjectTool;
