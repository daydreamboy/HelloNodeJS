/// Syntax - Expression
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
