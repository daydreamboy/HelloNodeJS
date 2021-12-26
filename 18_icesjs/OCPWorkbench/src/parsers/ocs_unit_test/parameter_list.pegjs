/// Syntax - Parameter List
///////////////////////

param_list = '(' S params:param_pair* S ')' {
  return params
}

param_pair = type:type_encoding S name:IDENTIFIER COMMA? {
  return { type, name }
}

/// Syntax - Type Encoding
///////////////////////
type_encoding = pointer_type / integer_encoding / string_encoding
/ 'float' { return 'f' }
/ ('double' / 'CGFloat') { return 'd' }
/ 'long' S_n 'double' { return 'D' }
/ ('bool' / 'BOOL') { return 'B' }
/ ('string' / 'const' S_n 'char' S_n '*') { return '*' }
/ 'pointer' { return '^v' }
/ 'Class' SPACE { return '#' }
/ 'SEL' { return ':' } 
/ 'id' ('<' type_encoding '>')? { return '@' }
/ 'void' { return 'v' }
/ 'NSInteger' { return 'q' }
/ ('NSUInteger' / 'size_t') { return 'Q' }
/ 'NSRange' { return '{_NSRange=QQ}' }
/ 'CGSize' { return '{CGSize=dd}' }
/ 'CGPoint' { return '{CGPoint=dd}' }
/ 'CGRect' { return '{CGRect={CGPoint=dd}{CGSize=dd}}' }
/ 'UIEdgeInsets' { return '{UIEdgeInsets=dddd}' }
/ IDENTIFIER SPACE ('*')? { return '@' }
/ IDENTIFIER SPACE? '*' { return '@' }

integer_encoding = 'short' { return 's' }
/ 'int' { return 'i' }
/ 'long' extra:(SPACE_n 'long')? {
  //return extra ? 'q' : 'l'
  return 'q'
}
/ 'unsigned' SPACE_n encoding:integer_encoding {
  return encoding.toUpperCase()
}

string_encoding = 'char' { return 'c' }

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

S = SINGLE_SPACE* { return null }
COMMA = S_n ',' S_n
S_n = SINGLE_SPACE_OR_NEWLINE* { return null }
SPACE = SINGLE_SPACE+ { return null }
SPACE_n = SINGLE_SPACE_OR_NEWLINE+ { return null }
COMMENT = '//' [^\n]+
SINGLE_SPACE = (" " / "\t" / COMMENT) { return null }
SINGLE_SPACE_OR_NEWLINE = (SINGLE_SPACE / "\n") { return null }