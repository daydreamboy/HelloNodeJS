class BooleanTool {
    static checkIfBoolean(variable) {
        return typeof variable === 'boolean' || variable instanceof Boolean;
    }
}

export default BooleanTool;