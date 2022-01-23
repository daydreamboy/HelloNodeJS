start = type_encoding

/// Syntax - Type Encoding
///////////////////////
type_encoding = pointer_type / string_encoding / float_encoding / integer_encoding
/ ('bool' / 'BOOL') { return 'B' }
/ ('string' / 'const' SPACE 'char' SPACE '*') { return '*' }
/ 'pointer' { return '^v' }
/ 'Class' SPACE { return '#' }
/ 'SEL' { return ':' } 
/ 'id' ('<' type_encoding '>')? { return '@' }
/ 'void' { return 'v' }
/ 'NSInteger' { return 'q' }
/ ('NSUInteger' / 'size_t') { return 'Q' }
/ 'NSRange' { return '{_NSRange=QQ}' }
/ 'CGFloat' { return 'd' }
/ 'CGSize' { return '{CGSize=dd}' }
/ 'CGPoint' { return '{CGPoint=dd}' }
/ 'CGRect' { return '{CGRect={CGPoint=dd}{CGSize=dd}}' }
/ 'UIEdgeInsets' { return '{UIEdgeInsets=dddd}' }
/ IDENTIFIER SPACE ('*')? { return '@' }
/ IDENTIFIER SPACE? '*' { return '@' }

integer_encoding = 'short' { return 's' }
/ 'int' { return 'i' }
/ 'long' (SPACE 'long')? {
  return 'q'
}
/ 'unsigned' SPACE encoding:integer_encoding {
  return encoding.toUpperCase()
}

float_encoding = 'float' { return 'f' }
/ ('double') { return 'd' }
/ 'long' SPACE 'double' { return 'D' }

string_encoding = 'char' { return 'c' }
/ 'unsigned' SPACE 'char' { return 'C' }

// pointer_type
pointer_type = integer_pointer_type / string_pointer_type / void_pointer_type
integer_pointer_type = 'short' SPACE? '*' { return '^s' }
/ 'int' SPACE? '*' { return '^i' }
/ 'long' SPACE? 'long'? SPACE? '*' { return '^q' }
/ 'unsigned' SPACE encoding:pointer_type {
  return encoding.toUpperCase()
}
string_pointer_type = ('unsigned' SPACE)? 'char' SPACE? '*' { return '*' }
void_pointer_type = 'void' SPACE? '*' { return '^v' }

/// Syntax - Identifier
///////////////////////
IDENTIFIER = $( [$a-zA-Z_] [$a-zA-Z_0-9]* )
EX_IDENTIFIER = $( [$a-zA-Z_:] [$a-zA-Z_0-9:]* ('...')? )

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

