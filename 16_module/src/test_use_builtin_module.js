function expand_path(filePath) {
    const os = require('os');

    if (!filePath || typeof(filePath) !== 'string') {
        return '';
    }
    // '~/folder/path' or '~'
    if (filePath[0] === '~' && (filePath[1] === '/' || filePath.length === 1)) {
        return filePath.replace('~', os.homedir());
    }
    return filePath;
}

function test_use_module() {
    const fs = require('fs');
    const folderPath = expand_path('~/Desktop');

    const files = fs.readdirSync(folderPath);
    if (files) {
        files.forEach(file => {
            console.log(file);
        });
    }
}

function run() {
    const path = require('path');
    console.log(`*** ${path.basename(__filename, '.js')} ***`);

    test_use_module();
}

exports.run = run;
