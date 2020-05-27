const run = () => {
    const path = require('path');
    console.log(`*** ${path.basename(__filename, '.js')} ***`);

    const { getName, dateOfBirth} = require('./export_multiple_function');
    console.log(`${getName()} was born on ${dateOfBirth}.`);
};

exports.run = run;
