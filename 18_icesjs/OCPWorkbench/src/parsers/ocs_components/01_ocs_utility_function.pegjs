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