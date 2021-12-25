integer_encoding = 'char' { return 'c' }
/
'short' { return 's' }
/
'int' { return 'i' }
/
'long' extra:(SPACE_n 'long') {
  return extra ? 'q' : 'l'
}
/
'unsigned' SPACE_n encoding:integer_encoding {
  return encoding.toUpperCase()
}

COMMENT = '//' [^\n]+
SINGLE_SPACE = (" " / "\t" / COMMENT) { return null }
SINGLE_SPACE_OR_NEWLINE = (SINGLE_SPACE / "\n") { return null }
SPACE_n = SINGLE_SPACE_OR_NEWLINE+ { return null }