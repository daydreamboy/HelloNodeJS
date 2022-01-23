/// Syntax - OCS JSLib Group
///////////////////////
js_lib = S_n '@jslib' S_n jscode:jscode+ S_n '@end' S_n {
  return jscode.join("\n")
}

jscode = S_n '@jscode' jscode_lines:jscode_line+ '@end' S_n {
  return jscode_lines.join("\n")
}
/ func:lib_function {
  const {name, spec} = func
  const {paramNames} = spec
  const blockParamsString = paramNames ? paramNames.join(', ') : ''
  spec.name = name
  const ast = JSON.stringify(spec)

  const allParamNames = paramNames ? paramNames : []
  allParamNames.push('_spec = 0')
  const paramNamesString = allParamNames.join(', ')

  return `export async function ${name}(${paramNamesString}) {
  return await Weiwo.vm(_spec).callBlock(
    ${ast},
    [${blockParamsString}],
    Weiwo.ContainerAsValue
  )}`
}

jscode_line = $([^@]+)

/// Syntax - OCS RemoteLib Group
///////////////////////
remote_lib = S_n '@remotelib' S_n functions:lib_function+ S_n '@end' S_n {
  const blocks = functions.reduce(
    (dict, function_spec) => {
      dict[function_spec.name] = function_spec.spec
      return dict
    },
    {}
    )
    return {blocks}
}

lib_function = S_n name:IDENTIFIER S ASSIGN_OP S spec:block_spec S_n{
  return {name, spec}
}