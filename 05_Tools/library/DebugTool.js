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
