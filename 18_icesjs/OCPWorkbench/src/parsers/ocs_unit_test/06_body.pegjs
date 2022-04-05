{
  /**
    Create an object like {name: xxx, args: yyy}
   */
  function createCall(name, args) {
    const obj = { name }
    if (args) {
      obj.args = args
    }

    return obj
  }

  /**
    Create a literal object like {literal: xxx}
   */
  function createLiteral(value) {
    return { literal: value }
  }

  /**
    Get balanced ()
  */
  function captureBalancedMarkedString(string, markerStart, markerEnd, includeMarker = false) {
    if (typeof string != 'string' || typeof markerStart != 'string' || typeof markerEnd != 'string') {
      return null;
    }

    let balancedStrings = [];
    let balanceLevel = 0;
    let balanceGroupStart = -1;
    let index = 0;
    for (const char of string) {
      if (char === markerStart) {
        balanceLevel++;
        if (balanceLevel == 1) {
          balanceGroupStart = (includeMarker ? index : index + 1);
        }
      }
      else if (char === markerEnd) {
        if (balanceLevel == 1) {
          // Note: the range of substring is [start, end)
          let balancedString = string.substring(balanceGroupStart, (includeMarker ? index + 1 : index));
          balancedStrings.push(balancedString);
        }
        // Note: if markerEnd more than markerStart, just ignore it and not change balanceLevel to negative
        if (balanceLevel > 0) {
          balanceLevel--;
        }
      }

      index++;
    }

    return balancedStrings
  }

  function replaceSubstringInRange(string, range, replacement) {
    return string.substring(0, range.location) + replacement + string.substring(range.location + range.length);
  }

  function parseOCMethodSignature(string) {
    if (typeof string != 'string') {
      return null;
    }

    // Note: do trim
    string = string.trim();

    let typeParts = captureBalancedMarkedString(string, '(', ')', true);

    if (typeParts.length == 0) {
        return null
    }

    let returnTypePart = typeParts.shift()
    let rangeOfReturnTypePart = { location: string.indexOf(returnTypePart), length: returnTypePart.length }
    let rangeOfMethodTypePart = { location: 0, length: rangeOfReturnTypePart.location }
    let methodType = string.substring(rangeOfMethodTypePart.location, rangeOfMethodTypePart.location + rangeOfMethodTypePart.length).trim();
    let signatureName = replaceSubstringInRange(string, { location: 0, length: rangeOfReturnTypePart.location + rangeOfReturnTypePart.length }, '')
    let signatureKeys = []
    let argTypes = typeParts
    let argNames = []

    if (signatureName.indexOf(':') != -1) {
      for (const typePart of typeParts) {
        let key = signatureName.substring(0, signatureName.indexOf(':'))
        signatureKeys.push(key.trim())

        let argTypeRange = { location: signatureName.indexOf(typePart), length: typePart.length }
        let removeRange = { location: 0, length: argTypeRange.location + argTypeRange.length  }
        signatureName = replaceSubstringInRange(signatureName, removeRange, '')
        // Note: only trim prefix
        signatureName = signatureName.trimStart()
        // Note: find the position of the first white space
        let indexOfFirstWhitespace = signatureName.search(/[\s]/)
        if (indexOfFirstWhitespace != -1) {
          let argName = signatureName.substring(0, indexOfFirstWhitespace)
          argNames.push(argName.trim())
          signatureName = replaceSubstringInRange(signatureName, { location: 0, length: indexOfFirstWhitespace }, '')
        }
        else {
          argNames.push(signatureName.trim())
          signatureName = replaceSubstringInRange(signatureName, { location: 0, length: signatureName.length }, '')
        }
      }
    }
    else {
      signatureName = signatureName.trim()
    }

    // Note: when signatureKeys has only one element, signatureKeys.join(':') will return a string without ":"
    let selector = signatureKeys.length > 0 ? (signatureKeys.join(':') + ':') : signatureName;

    return { methodType, returnTypePart, signatureName, signatureKeys, argTypes, argNames, selector, originalString: string }
  }
}

start = body

/// Syntax - Body
///////////////////////
body = S_n statement_list:statement_list? S_n {
	return statement_list ? statement_list : []
}

code_block = '{' body:body '}' {
  return body
}

/// Syntax - Statement List
///////////////////////
statement_list = statement_list:statement+ {
  let expr = []
  for (const e of statement_list) {
    expr = expr.concat(e)
  }
    
  if (expr.length > 0 && expr[0].name == ';') {
    expr.shift()
  }
  
  if (expr.length > 0 && expr[expr.length-1].name == ';') {
    expr.pop()
  }
  
  return expr
}

statement = end_of_statement
/ return_statement
/ define_statement
/ if_statement
/ while_statement
/ for_loop_statement
/ for_in_statement
/ switch_statement
/ expression

return_statement = 'return' SPACE expression:expression {
  return createCall('return', [expression])
}

define_statement = type:type_encoding SPACE name:IDENTIFIER initializer:initializer? {
  const args = [
    [createLiteral(type)],
    [createLiteral(name)],
  ]

  if (initializer) {
    args.push(initializer)
  }

  return createCall('declare', args)
}

initializer = S ASSIGN_OP S value:expression {
  return value
}

end_of_statement = COMMENT? (S [;\n] S)+ { 
  return createCall(';')
}

/// Syntax - if statement
///////////////////////
if_statement = 'if' condition:condition body:code_block else_body:else_statement? {
  const args = [condition, body]
  if (else_body) {
    args.push(else_body)
  }
  return createCall('if', args)
}

condition = S '(' S expr:expression S ')' S {
  return expr
}

else_statement = 'else' S body:if_statement {
  return [body]
}
/ 'else' S body:code_block {
  return body
}

/// Syntax - while statement
///////////////////////
while_statement = 'while' condition:condition body:code_block {
  return createCall('while', [ condition, body] )
}

/// Syntax - for statement
///////////////////////
for_loop_statement = 'for' S_n '(' S_n init:(define_statement / expression) S_n ';' S_n condition:expression S_n ';' S_n next:expression S_n ')' S_n body:code_block {
  return createCall(
    'for',
    [
      init,
      condition,
      next,
      body,
    ]
  )
}

/// Syntax - for-in statement
///////////////////////
for_in_statement = 'for' S_n '(' S name:IDENTIFIER S 'in' S container:expression S ')' S_n body:code_block {
  return createCall('foreach', [[createCall(name)], container, body])
}

/// Syntax - switch statement
///////////////////////
switch_statement = 'switch' S_n value:expression S_n body:switch_body {
  const { cases, default_case } = body
  return createCall(
    'switch',
    [value].concat(body)
  )
}

switch_body = '{' S_n cases:switch_case_list default_case:switch_default? S_n '}' {
  if (default_case) {
      return cases.concat(default_case)
  }
  else {
      return cases
  }
}

switch_case_list = case_pairs:switch_case+ {
  const cases = []
  for (const pair of case_pairs) {
    cases.push([pair.case_value])
    cases.push(pair.block)
  }

  return cases
}

switch_case = 'case' S case_value:literal S ':' S block:switch_block {
  return {case_value, block}
}

switch_block = body:(code_block / body) {
  while (true) {
    const last = body[body.length-1]
    if (last) {
        if (last.name == ';' || last.name == 'break') {
            body.pop()
            continue
        }
    }

    break
  }

  return body
}

switch_default = 'default' S ':' S block:switch_block {
  return [block]
}

/// Syntax - Expression List or Tuple
///////////////////////

expression_list = S_n first:expression rest:(rest_expression)* {
  return rest ? [first].concat(rest) : [first]
}

rest_expression = S_n ',' S_n expr:expression {
  return expr
}

expression_tuple = '(' S_n list:expression_list? S_n ')' {
  return list ? list : []
}


/// Syntax - Expression
///////////////////////
expression = 'await' S expression: expression {
  return [createCall('await'), [expression]]
}
/ lvalue:p12 S assign_op:ASSIGN_OP S rvalue:expression {
  const last = lvalue.pop()
  const { name } = last
  if (name) {
    if (name == 'weiwo_getSubscript:') {
      return lvalue.concat(
        createCall('weiwo_setSubscript:value:', [
          last.args[0],
          rvalue
        ])
      )
    }
    else {
      return lvalue.concat(
        createCall(assign_op, [ [createLiteral(name)], rvalue])
      )
    }
  }
}
/ key:STRING S ':' S value:expression {
  return [ createLiteral(key), createCall(':', [value]) ]
}
/ condition:p12 S '?' S trueValue:p12 S ':' S falseValue:p12 {
  return [ createCall('if', [condition, trueValue, falseValue]) ]
}
/ condition:p12 S '?:' S falseValue:p12 {
  return condition.concat(createCall('?:', [falseValue]))
}
/ p12

/// Syntax - C function extern
///////////////////////

declaration_group = 'extern' S '"C"' S '{' S_n declarations:declaration* S_n '}' {
  const map = {}
  for (const declaration of declarations) {
    map[declaration.name] = declaration.signature
  }
  return map
}

declaration = returnType:type_encoding S name:IDENTIFIER types:c_param_types S_n (';')? S_n {
  const paramsEncoding = types ? types.join('') : ''
  const signature = returnType + paramsEncoding

  return { name, signature }
}

c_param_types = '(' S types:c_param_type_with_comma* S ')' {
  return types
}

c_param_type_with_comma = type:c_param_type COMMA? {
  return type
}

c_param_type = '...' { return '.' }
/ type:type_encoding (SPACE IDENTIFIER)? {
  return type
}

first_item = literal 
/ postfix_operator 
/ protocol 
/ encode 
/// main_call 
/// once_call 
/ interpolated_string 
/ sizeof_expression
/ array_constructor 
/ dictionary_constructor 
/ oc_call 
/ function_call
/ address 
/ new_pointer 


sizeof_expression = 'sizeof' S '(' S type:type_encoding S ')' S {
  return createCall('sizeof', [
    [createLiteral(type)]
  ])
}

address = hexaddress:HEXADECIMAL {
  return [createCall('$'), createCall('objectFromAddress:', [[ createLiteral(hexaddress) ]])]
}

/// Syntax - OCS new keyword
///////////////////////

new_pointer = 'new' SPACE type:type_encoding {
  return [
    createCall('Weiwo'),
    createCall('outArgument', [[ createLiteral(type) ]])
  ]
}

/// Syntax - C postfix ++/--
///////////////////////

postfix_operator = name:IDENTIFIER op:('++'/'--') {
  return createCall('updateSlot', [
    [ createLiteral(name) ],
    [ createCall(name), createCall(op[0], [[ createLiteral(1) ]]) ]
  ])
}

/// Syntax - C prefix ++/--
///////////////////////

prefix_operator = op:('++'/'--') name:IDENTIFIER {
  return createCall('updateSlot', [
    [ createLiteral(name) ],
    [ createCall(name), createCall(op[0], [[ createLiteral(1) ]]) ]
  ])
}

/// Syntax - OCS interpolated string
///////////////////////

interpolated_string = '$"' parts:interpolated_item* '"' {
  if (parts && parts.length > 0) {
    return [
      createCall('sqaureBrackets', parts),
      createCall('componentsJoinedByString:', [[ createLiteral('') ]])
    ]
  }
  else {
    return ''
  }
}

interpolated_item = '{' value:expression '}' {
  return value
}
/ chars:( ESCAPED_CHAR / [^\'"{}] )+ {
  return [ createLiteral(chars.join('')) ]
}

/// Syntax - Objective-C Container
///////////////////////

array_constructor = '@[' S_n args:expression_list? S_n (',')? S_n ']' {
  return createCall('squareBrackets', args)
}

dictionary_constructor = '@{' S_n args:expression_list? S_n (',')? S_n '}' {
  return createCall('curlyBrackets', args)
}

/// Syntax - C function call
///////////////////////

function_call = name:IDENTIFIER tuple:expression_tuple? {
  return createCall(name, tuple)
}

/// Syntax - Objective-C method call
///////////////////////

oc_call = '[' S_n target:expression S_n methodName:$('@'? IDENTIFIER) S_n ']' {
  return target.concat(createCall(methodName))
}
/ '[' S_n target:expression S_n methodName:$('@'? IDENTIFIER ':') S_n first:expression rest:oc_rest_argument+ ']' {
  const args = [first].concat(rest)
  return target.concat(createCall(methodName + '...', args))
}
/ '[' S_n target:expression S_n pairs:oc_pair+ S_n ']' {
  const methodName = pairs.map(pair => pair.label + ':').join('')
  const args = pairs.map(pair => pair.arg)
  return target.concat(createCall(methodName, args))
}

oc_rest_argument = S ',' S arg:expression {
  return arg
}

oc_pair = S label:$('@'? IDENTIFIER) S ':' S arg:expression S_n {
  return {label, arg}
}

/// Syntax - OP priority group
///////////////////////

p12 = first:p11 second:(concat_item)* {
  try {
    return second ? first.concat(second) : first
  } 
  catch (error) {
    expected('p12 rule: ' + error)
    return undefined
  }
}
    
concat_item = S '..' S p11:p11 {
  return createCall('..', [p11])
}

p11 = first:p10 second:(or_item)* {
  try {
    return second ? first.concat(second) : first
  } 
  catch (error) {
    expected('p11 rule: ' + error)
    return undefined
  }
}

or_item = S (('or' SPACE) / '||') S p10:p10 {
  return createCall('||', [p10])
}

p10 = first:p9 second:(and_item)* {
  try {
    return second ? first.concat(second) : first
  } 
  catch (error) {
    expected('p10 rule: ' + error)
    return undefined
  }
}

and_item = S (('and' SPACE) / '&&') S p9:p9 {
  return createCall('&&', [p9])
}
 
p9 = p6

p6 = first:p5 second:(equality_compare_item)* {
  try {
    return second ? first.concat(second) : first
  } 
  catch (error) {
    expected('p6 rule: ' + error)
    return undefined
  }
}

equality_compare_item = S op:('==') S p5:p5 {
  return createCall(op, [p5])
}
/ S op:('!=' / '<>' / '~=') S p5:p5 {
  return createCall('!=', [p5])
}

p5 = first:p4 second:(compare_item)* {
  try {
    return second ? first.concat(second) : first
  } 
  catch (error) {
    expected('p5 rule: ' + error)
    return undefined
  }
}

compare_item = S op:('<=' / '<' / '>=' / '>') S p4:p4 {
  return createCall(op, [p4])
}

p4 = first:p3 second:(shift_item)* {
  try {
    return second ? first.concat(second) : first
  } 
  catch (error) {
    expected('p4 rule: ' + error)
    return undefined
  }
}
   
shift_item = S op:('<<' / '>>') S p3:p3 {
  return createCall(op, [p3])
}

p3 = first:p2 second:(addition_item)* {
  try {
    return second ? first.concat(second) : first 
  } 
  catch (error) {
    expected('p3 rule: ' + error)
    return undefined
  }
}
  
addition_item = S op:('+' / '-') S p2:p2 {
  return createCall(op, [p2])
}

p2 = first:prefix_operator {
  return [first]
}
/ first:p1 second:(multiplication_item)* {
  try {
    return second ? first.concat(second) : first 
  } 
  catch (error) {
    expected('p2 rule: ' + error)
    return undefined
  }
}
/ '!' p2:p2 {
  return [createCall('!', [p2])]
}

multiplication_item = S op:('%' / '*' / '/') S p1:p1 {
  return createCall(op, [p1])
}

item_list  = first:first_item rest:rest_item* {
  try {
    if (!Array.isArray(first)) {
      first = [first]
    }
    if (rest) {
      return first.concat(rest);
    } 
    else {
      return first
    }
  } 
  catch (error) {
    expected('item_list rule: ' + error)
    return undefined
  }
} 

rest_item = message_call
/ S '^' S operand:expression{
  return createCall('^', [operand])
}
/ S '[' subscript:expression ']' {
  return createCall('weiwo_getSubscript:', [subscript])
}
/ SPACE 'is' SPACE className:IDENTIFIER {
  return createCall('is', [[ createLiteral(className) ]])
}

message_call = '.' name:EX_IDENTIFIER args:expression_tuple? { 
  return createCall(name, args)
}

/// Syntax - Expression p1
///////////////////////
p1 = '(' S expression:expression S ')' {
  return expression
}
/ '^' S name:IDENTIFIER {
  return [createCall('awaitblock', [[ createLiteral(name) ]])]
}
/ declaration:declaration_group {
  return [createCall('Weiwo'), createCall('declareCFunctions:', [[createLiteral(declaration)]]) ]
}
/ '-' S list:item_list {
  return list.concat(createCall('weiwo_negate'))
}
/ item_list

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
objective_c_type_encoding = 'Class' { return '#' }
/ 'BOOL' { return 'B' }
/ 'SEL' { return ':' } 
/ 'IMP' { return '^?' } 
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

/// Syntax - Assign
///////////////////////
ASSIGN_OP = ':=' { return 'setSlot' }
/ '=' { return 'updateSlot' }

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

