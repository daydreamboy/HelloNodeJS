/// Syntax - Type Encoding
///////////////////////
// match order: C、CPP、Objective-C
type_encoding = c_type_encoding / cpp_type_encoding / objective_c_type_encoding

// C types
c_type_encoding = pointer_type / string_encoding / float_encoding / integer_encoding
/ 'size_t' { return 'Q' }
/ 'const' SPACE 'char' SPACE '*' { return '*' }
/ 'pointer' { return '^v' }
/ 'void' { return 'v' }

// C++ types
cpp_type_encoding = 'bool' { return 'B' }
/ 'string' { return '*' }

// Objective types
objective_c_type_encoding = 'Class' SPACE { return '#' }
/ 'BOOL' { return 'B' }
/ 'SEL' { return ':' } 
/ 'id' ('<' type_encoding '>')? { return '@' }
/ 'NSInteger' { return 'q' }
/ 'NSUInteger' { return 'Q' }
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
