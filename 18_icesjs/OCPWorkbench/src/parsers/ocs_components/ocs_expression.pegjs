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
        createCall('weiwo_setSubcript:value:', [
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