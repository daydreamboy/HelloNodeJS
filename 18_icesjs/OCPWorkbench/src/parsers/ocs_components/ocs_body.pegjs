/// Syntax - Body
///////////////////////
body = S_n statement_list:statement_list? S_n {
	return statement_list ? statement_list : []
}

code_block = '{' body:body '}' {
  return body
}