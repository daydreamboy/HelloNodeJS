class NumberTool {
    static checkIfNumber(variable) {
        return typeof variable === 'number' || variable instanceof Number;
    }
}

export default NumberTool;
