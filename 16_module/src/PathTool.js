const os = require('os');

class PathTool {
    static expand_path(filePath) {
        if (!filePath || typeof(filePath) !== 'string') {
            return '';
        }
        // '~/folder/path' or '~'
        if (filePath[0] === '~' && (filePath[1] === '/' || filePath.length === 1)) {
            return filePath.replace('~', os.homedir());
        }
        return filePath;
    }
}

exports.PathTool = PathTool;




