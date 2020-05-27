const run = () => {
    const path = require('path');
    console.log(`*** ${path.basename(__filename, '.js')} ***`);

    const user = require('./check_module_2');
};

exports.run = run;