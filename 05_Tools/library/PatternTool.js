class PatternTool {
    /**
     * Capture the outermost balanced string, e.g. ((1,2)) (3,4) => ["(1,2)", "3,4"]
     *
     * @param {String} string the string
     * @param {String} markerStart the mark start char, e.g. '('
     * @param {String} markerEnd the mark end char, e.g. ')'
     * @param {Boolean} includeMarker If true, the balanced strings will include markers, or false it not. Default is false
     *
     * @returns {Array[String]} the balanced strings
     *
     * @warning the string, markerStart, markerEnd not support emoji, e.g. 😅
     *
     * @see https://stackoverflow.com/a/37207892
     */
    static captureBalancedMarkedString(string, markerStart, markerEnd, includeMarker = false) {
        if (typeof string != 'string' || typeof markerStart != 'string' || typeof markerEnd != 'string') {
            return null;
        }

        let balancedStrings = [];
        let balanceLevel = 0;
        let balanceGroupStart = -1;
        let index = 0;
        for (const char of string) {
            if (char === markerStart) {
                balanceLevel++;
                if (balanceLevel == 1) {
                    balanceGroupStart = (includeMarker ? index : index + 1);
                }
            }
            else if (char === markerEnd) {
                if (balanceLevel == 1) {
                    // Note: the range of substring is [start, end)
                    let balancedString = string.substring(balanceGroupStart, (includeMarker ? index + 1 : index));
                    balancedStrings.push(balancedString);
                }
                // Note: if markerEnd more than markerStart, just ignore it and not change balanceLevel to negative
                if (balanceLevel > 0) {
                    balanceLevel--;
                }
            }

            index++;
        }

        return balancedStrings
    }
}

export default PatternTool;
