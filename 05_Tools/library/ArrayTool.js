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
        if (this.checkIfArray(variable)) {
            return false;
        }

        return variable.length != 0;
    }
}

export default ArrayTool;
