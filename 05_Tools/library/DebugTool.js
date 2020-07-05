class DebugTool {
    /**
     * Inspect a variable's type and value
     *
     * @param {*} variable the variable
     * @param {string} variable_name the argument name
     * @returns {string} the debug string
     */
    static inspectValue(variable, variable_name = undefined) {
        let caller = (new Error()).stack.match(/at (\S+)/g)[1].slice(3);

        let variableName = variable;
        if (variable_name) {
            variableName = variable_name;
        }

        return `[Debug] caller(${caller}): ${variableName} = (${typeof variable}) \`${variable}\``;
    }

    /**
     * Dump a variable info
     *
     * @param obj the {x} format
     * @param print If print to console.log. Default is true.
     * @returns {string} the debug info string
     *
     * @see https://stackoverflow.com/questions/46217853/get-constructor-name-of-object
     */
    static dump(obj, print=true) {
        let value = Object.values(obj)[0];
        let stringifiedValue = value;
        let constructorString = undefined;

        // Note: symbol object must use toString function to convert to string
        if (typeof value === 'symbol') {
            stringifiedValue = value.toString();
        }
        else if (typeof value === 'object') {
            try {
                stringifiedValue = JSON.stringify(value);
            }
            catch (e) {
                console.log(e);
            }

            if (stringifiedValue === '{}' && Object.getOwnPropertyNames(value).length > 0) {
                let properties = {};
                let propertyNames = Object.getOwnPropertyNames(value);
                propertyNames.forEach((prop) => {
                    if (value.hasOwnProperty(prop)) {
                        properties[prop] = `[${typeof value[prop]}]`;
                    }
                });

                stringifiedValue = JSON.stringify(properties);
            }
        }

        if (typeof value === 'undefined') {
            constructorString = 'undefined';
        }
        else if (value === null) {
            constructorString = 'undefined';
        }
        else {
            constructorString = value.constructor.name;
        }

        let debugString = `${Object.keys(obj)[0]} = (${typeof value})[${constructorString}] \`${stringifiedValue}\``;
        if (print) {
            console.log(debugString);
        }

        return debugString;
    };

    /**
     * Get current function name
     *
     * @returns {string}
     * @see https://stackoverflow.com/a/41621478
     * @discussion This method support strict mode
     */
    static currentFunctionName() {
        // gets the text between whitespace for second part of stacktrace
        return (new Error()).stack.match(/at (\S+)/g)[1].slice(3);
    }
}

export default DebugTool;
