/// Syntax - Literal Type
///////////////////////
literal = value:(BOOLEAN / NULL / STRING / NUMBER / SELECTOR) {
  return createLiteral(value)
}

// number
NUMBER = FLOAT / INTEGER / HEXADECIMAL

// float
FLOAT = str:$( ('-')?  [0-9]+ '.' [0-9]+ ) { return parseFloat(str) }

// integer
INTEGER = str:$( ('-')? [0-9]+) (! 'x') { return parseInt(str) }
HEXADECIMAL = $( '0x' [a-fA-F0-9]+ )

// string
STRING = DOUBLE_QUOTE_STRING / SINGLE_QUOTE_STRING
DOUBLE_QUOTE_STRING = '@'? S DOUBLE_QUOTE chars:(CHAR_IN_QUOTE / SINGLE_QUOTE) * DOUBLE_QUOTE {
  return chars.join('')
}
SINGLE_QUOTE_STRING = SINGLE_QUOTE chars:(CHAR_IN_QUOTE / DOUBLE_QUOTE)* SINGLE_QUOTE {
  return chars.join('')
}
CHAR_IN_QUOTE = ESCAPED_CHAR / [^\'"]

// boolean
BOOLEAN = ( 'true' / 'YES' ) { return true }
/ ( 'false' / 'NO' ) { return false }

// null
NULL = 'null' { return null }
/ 'nil'  { return null }

// @selector
SELECTOR = '@selector' S '(' name:$([a-zA-Z0-9:]+) S ')' {
  return name
}

// @protocol
protocol = '@protocol' S '(' name:IDENTIFIER ')' {
  return createCall('NSProtocolFromString', [[createLiteral(name)]])
}

// @encode
encode = '@encode' S '(' encoding:type_encoding ')' {
  return createLiteral(encoding)
}