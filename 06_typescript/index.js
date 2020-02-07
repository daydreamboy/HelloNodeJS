"use strict";
function hello(message) {
    console.log('Hello, ' + message);
}
var message = 'typescript!';
// Error: Type '100' is not assignable to type 'string'.
//message = 100;
hello(message);
