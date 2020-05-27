const run = () => {
    const path = require('path');
    console.log(`*** ${path.basename(__filename, '.js')} ***`);

    const user = require('./check_module_1');
};

exports.run = run;