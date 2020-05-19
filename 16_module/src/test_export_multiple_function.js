const run = () => {
    const path = require('path');
    console.log(`*** ${path.basename(__filename, '.js')} ***`);

    const user = require('./export_multiple_function');
    console.log(`${user.getName()} lives in ${user.getLocation()} and was born on ${user.dateOfBirth}.`);
};

exports.run = run;
