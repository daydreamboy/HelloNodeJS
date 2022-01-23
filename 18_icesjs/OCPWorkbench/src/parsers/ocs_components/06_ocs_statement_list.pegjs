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