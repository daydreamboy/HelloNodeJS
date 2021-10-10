start = integer
integer = digits:[0-9]* { return digits.join('') }
