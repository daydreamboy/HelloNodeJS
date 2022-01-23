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

start = literal

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