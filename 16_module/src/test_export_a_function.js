

function run() {
    const path = require('path');
    console.log(`*** ${path.basename(__filename, '.js')} ***`);

    const user = require('./export_a_function');
    console.log(`User: ${user.getName()}`);
}

exports.run = run;
