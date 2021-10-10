class LogTool {
    /**
     * Info[NoColor]
     *
     * @param message
     */
    static i = (message) => {
        console.log(message);
    };

    /**
     * Verbose[Blue]
     *
     * @param message
     *
     * @see https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
     */
    static v = (message) => {
        console.log('\x1b[34m%s\x1b[0m', message);
    };

    /**
     * Debug[Cyan]
     *
     * @param message
     */
    static d = (message) => {
        console.log('\x1b[36m%s\x1b[0m', message);
    };

    /**
     * Warning[Yellow]
     *
     * @param message
     */
    static w = (message) => {
        console.log('\x1b[33m%s\x1b[0m', message);
    };

    /**
     * Error[Red]
     *
     * @param message
     */
    static e = (message) => {
        console.log('\x1b[31m%s\x1b[0m', message);
    };

    /**
     * Timing[Magenta]
     *
     * @param message
     */
    static t = (message) => {
        console.log('\x1b[35m%s\x1b[0m', message);
    };
}

export default LogTool;
