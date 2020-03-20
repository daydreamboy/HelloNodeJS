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
     * Check a variable if object
     *
     * @param variable
     * @returns {boolean|boolean}
     *
     * @see https://stackoverflow.com/a/8511350
     */
    static checkIfObject(variable) {
        return typeof variable === 'object' && variable !== null;
    }
}

export default ObjectTool;
