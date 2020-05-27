
function run() {
    const path = require('path');
    console.log(`*** ${path.basename(__filename, '.js')} ***`);

    const User = require('./export_a_class');
    const jim = new User('Jim', 37, 'jim@example.com');

    console.log(jim.getUserStats());
}

exports.run = run;
