/// Syntax - OC Block
///////////////////////
block_spec = '^' S returnEncoding:type_encoding? S params:block_param_list? S body:code_block {
  if (!returnEncoding) {
    returnEncoding = 'v'
  }
  const paramsEncoding = params ? params.map(param => param.type).join('') : ''
  const signature = returnEncoding + '@' + paramsEncoding
  const paramNames = params ? params.map(pair => pair.name) : []
  return {
    type: 'block',
    signature,
    paramNames,
    body
  }
}