// This file uses typescript editor
{
  /**
    Create an object like {name: xxx, args: yyy}
   */
  function call(name, args) {
    const obj = { name }
    // @ts-ignore
    obj.args = args || undefined

    return obj
  }

  /**
    Create a literal object like {literal: xxx}
   */
  function literal(value) {
    return { literal: value }
  }
}

// @ts-ignore
ocs_file = remote_lib / js_lib / body

body = S_n statements:statements? S_n {
  return statements ? statements : []
}

/// Syntax - Statement
///////////////////////

statements = statement_list:statements+ {
  let expr = []
  for (const e of statement_list) {
    expr = expr.concat(e)
  }

  // Note: if the first element is useless, remove it
  if (expr.length > 0 && expr[0].name = ';') {
    expr.shift()
  }

  // Note: if the last element is useless, remove it
  if (expr.length > 0 && expr[expr.length - 1].name = ';') {
    expr.pop()
  }

  return expr
}

statement = 'return' SPACE expression:expression {
  return call('return', [expression])
}
/
type:type_encoding SPACE name:IDENTIFIER initializer:initializer? {
  const args = [
    [literal(type)],
    [literal(name)],
  ]

  if (initializer) {
    args.push(initializer)
  }

  return call('declare', args)
}
/
end_of_statement
/
expression

initializer = S ASSIGN_OP S value:expression {
  return value
}

end_of_statement = COMMENT? (S [;\n] S)+ {
  return call(';')
}

/// Syntax - Expression
///////////////////////

// expression = 'await' S expression: expression {
//   return [call('await'), [expression]]
// }
// /
// lvalue:p12 S

/// Syntax - p group
///////////////////////

p1 = '(' S expression:expression S ')' {
  return expression
}
/
spec:block_spec {
  return [ call('Weiwo'), call('createBlock:', [[ literal(spec) ]]) ]
}
/
'^' S name:IDENTIFIER {
  return [ call('awaitblock', [[ literal(name) ]]) ]
}
/
declaration:declaration_group {
  return [ call('Weiwo'), call('declareCFunctions:', [[ literal(declaration) ]]) ]
}
/
hook_group:hook_group {
  return [ call('Weiwo'), call('hookClass:', [[ literal(hook_group) ]]) ]
}
/
'-' S list:item_list {
  return list.concat(call('weiwo_negate'))
}
/
item_list


/// Syntax - block spec
///////////////////////

block_spec = '^' S returnEncoding:type_encoding? S params:param_list? S body:code_block {
  if (!returnEncoding) {
    returnEncoding = 'v'
  }
  const paramsEncoding = params ? params.map(params => param.type).join('') : ''
  const signature = returnEncoding + '@' + paramsEncoding
  const paramNames = param ? param.map(pair => pair.name) : []
  return {
    type: 'block',
    signature,
    paramNames,
    body
  }
}

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
EX_IDENTIFIER = $( [$a-zA-Z_:] [$a-zA-Z_0-9:]* ('...')? )

/// Syntax - Data Type
///////////////////////
NUMBER = FLOAT / INTEGER / HEXADECIMAL
FLOAT = str:$( ('-')?  [0-9]+ '.' [0-9]+ ) { return parseFloat(str) }
INTEGER = str:$( ('-')? [0-9]+) (! 'x') { return parseInt(str) }
HEXADECIMAL = $( '0x' [a-fA-F0-9]+ )

/// Syntax - Assign
///////////////////////

ASSIGN_OP = ':=' { return 'setSlot' }
/ '=' { return 'updateSlot' }

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
