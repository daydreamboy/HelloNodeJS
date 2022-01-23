/// Syntax - Literal Type
///////////////////////
literal = value:(BOOLEAN / NULL / STRING / NUMBER / SELECTOR) {
  return createLiteral(value)
}

NUMBER = FLOAT / INTEGER / HEXADECIMAL
FLOAT = str:$( ('-')?  [0-9]+ '.' [0-9]+ ) { return parseFloat(str) }
INTEGER = str:$( ('-')? [0-9]+) (! 'x') { return parseInt(str) }
HEXADECIMAL = $( '0x' [a-fA-F0-9]+ )
STRING = DOUBLE_QUOTE_STRING / SINGLE_QUOTE_STRING
DOUBLE_QUOTE_STRING = '@'? S DOUBLE_QUOTE chars:(CHAR_IN_QUOTE / SINGLE_QUOTE) * DOUBLE_QUOTE {
  return chars.join('')
}
SINGLE_QUOTE_STRING = SINGLE_QUOTE chars:(CHAR_IN_QUOTE / DOUBLE_QUOTE)* SINGLE_QUOTE {
  return chars.join('')
}
CHAR_IN_QUOTE = ESCAPED_CHAR / [^\'"]
BOOLEAN = ( 'true' / 'YES' ) { return true }
/ ( 'false' / 'NO' ) { return false }
NULL = 'null' { return null }
SELECTOR = '@selector' S '(' name:$([a-zA-Z0-9:]+) S ')' {
  return name
}
protocol = '@protocol' S '(' name:IDENTIFIER ')' {
  return createCall('NSProtocolFromString', [[createLiteral(name)]])
}
encode = '@encode' S '(' encoding:type_encoding ')' {
  return createLiteral(encoding)
}