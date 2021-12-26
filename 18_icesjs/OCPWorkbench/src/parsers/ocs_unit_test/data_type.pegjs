/// Syntax - Data Type
///////////////////////

NUMBER = FLOAT / INTEGER / HEXADECIMAL
INTEGER = str:$( ('-')? [0-9]+) (! 'x') { return parseInt(str) }
FLOAT = str:$( ('-')?  [0-9]+ '.' [0-9]+ ) { return parseFloat(str) }
HEXADECIMAL = $( '0x' [a-fA-F0-9]+ )