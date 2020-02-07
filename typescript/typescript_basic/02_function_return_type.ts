// @ts-ignore
function filterByTerm(input: string, searchTerm: string): string {
    console.log('first arg: ' + input);
    console.log('second arg: ' + searchTerm);

    return 'first arg: ' + input + ', ' + 'second arg: ' + searchTerm;
}

let result = filterByTerm("input string", "java");
console.log(result)
