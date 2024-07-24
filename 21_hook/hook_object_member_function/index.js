
// Example from ChatGPT-4o

function test_simple_hook() {
    const obj = {
        method: function (arg) {
            console.log("Original method called with arg:", arg)
            return 1
        }
    }

    function hookMethod(originalMethod) {
        return function (...args) {
            console.log("Original Method has been hooked: called with arguments", args)
            const result = originalMethod.apply(this, args)

            return result + 1;
        }
    }

    let result
    result = obj.method("before hook");
    console.log(`result = ${result}`)
    obj.method = hookMethod(obj.method);
    result = obj.method("after hook");
    console.log(`result = ${result}`)
}

function test_generic_hook() {
    const obj = {
        method: function (arg) {
            console.log("Original method called with arg:", arg)
            return 1
        }
    }

    function generic_hook(obj, methodName, hookFunction) {
        const originalMethod = obj[methodName];
        obj[methodName] = function (...args) {
            return hookFunction.apply(this, [originalMethod, ...args]);
        };
    }

    function myHookFunction(originalMethod, ...args) {
        console.log("Before original method call", args);
        const result = originalMethod.apply(this, args);
        console.log("After original method call", result);
        return result + 1;
    }

    let result
    result = obj.method("before hook");
    console.log(`result = ${result}`)
    generic_hook(obj, "method", myHookFunction);
    result = obj.method("after hook");
    console.log(`result = ${result}`)
}

test_simple_hook()
console.log('------------------')
test_generic_hook()

