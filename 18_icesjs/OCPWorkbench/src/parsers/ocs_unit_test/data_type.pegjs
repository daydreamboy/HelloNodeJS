/// Syntax - Data Type
///////////////////////
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


/// Syntax - Auxiliary
///////////////////////

COMMENT = '//' [^\n]+
SINGLE_SPACE = (" " / "\t" / COMMENT) { return null }
SINGLE_SPACE_OR_NEWLINE = (SINGLE_SPACE / "\n") { return null }

// Separator
S = SINGLE_SPACE* { return null }
// Separator with newline
S_n = SINGLE_SPACE_OR_NEWLINE* { return null }
COMMA = S_n ',' S_n
SPACE = SINGLE_SPACE+ { return null }
SPACE_n = SINGLE_SPACE_OR_NEWLINE+ { return null }

// Special Single Char
BACKSLASH = '\\'
DOUBLE_QUOTE = '"'
SINGLE_QUOTE = "'"
ESCAPED_CHAR = BACKSLASH char:. {
  switch (char) {
    case 'a': return '\a'
    case 'b': return '\b'
    case 'f': return '\f'
    case 'n': return '\n'
    case 'r': return '\r'
    case 't': return '\t'
    case 'v': return '\v'
    default: return char
  }
}