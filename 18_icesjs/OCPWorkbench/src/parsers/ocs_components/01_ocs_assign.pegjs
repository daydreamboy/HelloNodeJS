/// Syntax - Assign
///////////////////////
ASSIGN_OP = ':=' { return 'setSlot' }
/ '=' { return 'updateSlot' }