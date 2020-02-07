interface Link {
    url: string,
}

// Error: Property 'url' does not exist on type 'object'.
/*
function filterByTerm(input: Array<object>, searchTerm: string) {
    const regex = new RegExp(searchTerm, "i");
    const result = input.filter(function(arrayElement) {
        return arrayElement.url.match(regex);
    });
    for (let i = 0; i < result.length; i++) {
        console.log(result[i].url);
    }
}

filterByTerm(
    [{ url: "string1" }, { url: "string2" }, { url: "string3" }],
    "java"
);
 */

function filterByTerm(input: Array<Link>, searchTerm: string) {
    const regex = new RegExp(searchTerm, "i");
    const result = input.filter(function(arrayElement) {
        return arrayElement.url.match(regex);
    });
    for (let i = 0; i < result.length; i++) {
        console.log('item' + i + ': ' + 'url = ' + result[i].url);
    }
}

filterByTerm(
    [{ url: "JavaScript" }, { url: "TypeScript" }, { url: "NodeJS" }],
    "script"
);
