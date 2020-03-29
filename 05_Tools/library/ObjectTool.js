class ObjectTool {
    /**
     * Get value from object by key path
     *
     * @param {Object} object the object
     * @param {String} keyPath the key path, e.g. 'foo.bar', 'foo.bar.2'
     *
     * @returns Return undefined if not found.
     *
     * @see https://stackoverflow.com/a/44627252
     */
    static valueForKeyPath(object, keyPath) {
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
}

export default ObjectTool;
