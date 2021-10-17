{
    function call(name, args)
    {
        const obj = {name}
        if (args) {
            obj.args = args
        }

        return obj
    }

    function literal(value)
    {
        return { literal: value }
    }
}

start
    = hook_group: hook_group {
        return [call('Weiwo'), call('hookClass:', [[ literal(hook_group) ]])]
    }


hook_group = '@hook' SPACE className:IDENTIFIER SPACE_n methods:hook_method+ S_n '@end' {
    return { className, methods }
}