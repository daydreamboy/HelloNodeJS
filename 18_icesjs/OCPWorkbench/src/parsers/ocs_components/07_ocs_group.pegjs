/// Syntax - OCS Group
///////////////////////
ocs_group = hook_group / main_group / once_group / method_group

hook_group = '@hook' SPACE className:IDENTIFIER SPACE_n methods:hook_method+ S_n '@end' {
  let hook_model = {className, methods}
  return [createCall('Weiwo'), createCall('hookClass:', [[ createLiteral(hook_model) ]])]
}

hook_method = methodType:[+-] S method_signature:$([^{}]+) S  & '{' body:code_block S_n {
  let balancedStrings = captureBalancedMarkedString(method_signature, '(', ')', true);
  if (balancedStrings.length == 0) {
    expected("the string should match OC method signature")
  }

  let signatureInfo = parseOCMethodSignature(methodType + method_signature)

  const name = signatureInfo.selector
  const paramNames = signatureInfo.argNames
  if (paramNames.length > 0) {
    return {name, paramNames, methodType, body}
  }
  else {
    return {name, methodType, body}
  }
}

dummy_type = S '(' [^)]+ ')' S { return null }

main_group = '@main' S code_block:code_block {
  return [ createCall('main_queue', [code_block]) ]
}

once_group = '@once' S key:IDENTIFIER? S code_block:code_block {
  const onceKey = key? [createLiteral(key)] : [createCall('_cmd')]
  return [ createCall('once', [ onceKey , code_block]) ]
}

method_group = '@methods' S_n '{' S_n methods:hook_method+ S_n '}' {
  return [ createLiteral(methods) ]
}
