function hello(message: string) {
    console.log('Hello, ' + message);
}

let message: string = 'typescript!';
// Error: Type '100' is not assignable to type 'string'.
//message = 100;

hello(message)
