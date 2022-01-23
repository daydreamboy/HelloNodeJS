/// Syntax - Auxiliary
///////////////////////
COMMENT = '//' [^\n]+
SINGLE_SPACE = (" " / "\t" / COMMENT) { return null }
SINGLE_SPACE_OR_NEWLINE = (SINGLE_SPACE / "\n") { return null }

// Separator
S = SINGLE_SPACE* { return null }
// Separator with newline
S_n = SINGLE_SPACE_OR_NEWLINE* { return null }
// Comma
COMMA = S_n ',' S_n
// Space
SPACE = SINGLE_SPACE+ { return null }
// Space with newline
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
