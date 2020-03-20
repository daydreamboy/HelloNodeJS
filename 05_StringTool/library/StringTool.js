class StringTool {
    // @see https://stackoverflow.com/a/5040502
    static TruncatingStyle = Object.freeze({
        truncatingNone: 0,
        truncatingHead: 1,
        truncatingTrail: 2,
        truncatingMiddle: 3
    });

    /**
     *
     * @param {*} string
     * @param {*} limitedLength
     * @param {*} separator
     * @param {*} truncatingStyle
     * @see https://stackoverflow.com/a/5723274
     */
    static truncateString(string, limitedLength, truncatingStyle = StringTool.TruncatingStyle.truncatingTrail, separator = '...') {
        if (string.length <= limitedLength) return string;
        if (truncatingStyle === StringTool.TruncatingStyle.truncatingNone) return string;

        truncatingStyle = truncatingStyle || StringTool.TruncatingStyle.truncatingTrail;
        separator = separator || "...";

        let separatorLength = separator.length;
        let showedLength = limitedLength - separatorLength;

        switch (truncatingStyle) {
            case StringTool.TruncatingStyle.truncatingHead: {
                return separator + string.substr(string.length - showedLength);
            }
            case StringTool.TruncatingStyle.truncatingTrail: {
                return string.substr(0, showedLength) + separator;
            }
            case StringTool.TruncatingStyle.truncatingMiddle: {
                const frontCharsLength = Math.ceil(showedLength / 2);
                const backCharsLength = Math.floor(showedLength / 2);
                return (
                    string.substr(0, frontCharsLength) +
                    separator +
                    string.substr(string.length - backCharsLength)
                );
            }
            case StringTool.TruncatingStyle.truncatingNone:
            default: {
                return string;
            }
        }
    }
}

export default StringTool;