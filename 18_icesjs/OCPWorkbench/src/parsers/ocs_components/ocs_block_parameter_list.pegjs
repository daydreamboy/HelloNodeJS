/// Syntax - Parameter List
///////////////////////

block_param_list = '(' S params:('void' / block_param_pair*) S ')' {
  if (params === 'void') {
    return undefined
  }
  return params
}

block_param_pair = type:type_encoding S name:IDENTIFIER COMMA? {
  return { type, name }
}