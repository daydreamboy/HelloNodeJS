class MyClass {
    myMethod(arg) {
        console.log("Original method called with:", arg)
        return 1
    }
}

function hookGenericClassMethod(target, methodName, hookFunction) {
    const originalMethod = target.prototype[methodName]
    target.prototype[methodName] = function (...args) {
        return hookFunction.apply(this, [originalMethod, ...args])
    }
}

function myHookFunction(originalMethod, ...args) {
    console.log("Before original method call", args)
    const result = originalMethod.apply(this, args)
    console.log("After original method call", result)
    return result + 1
}

function test_hook_class_member_method() {
    hookGenericClassMethod(MyClass, "myMethod", myHookFunction)
    const myInstance = new MyClass()
    myInstance.myMethod("test")
}

test_hook_class_member_method()

