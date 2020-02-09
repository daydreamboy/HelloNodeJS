type AnyType = any;
type Links = Array<Link>

interface Link {
    description?: string;
    id?: number;
    url: string;
    // Error: not work
    //[index: string]: string;
    // Error: not work
    //[index: string]: string | number | undefined;
    // Note: make Link instance can use subscripting
    [index: string]: AnyType;
}

interface TranslatedLink extends Link {
    language: string;
}

function filterByTerm(input: Links, searchTerm: string, key: string) {
    const regex = new RegExp(searchTerm, "i");
    const result = input.filter(function(arrayElement ) {
        // Ok, arrayElement as Link can use subscripting
        return arrayElement[key].match(regex);
    });
    for (let i = 0; i < result.length; i++) {
        console.log('item' + i + ': ' + 'url = ' + result[i].url + ', id = ' + result[i].id + ', description = ' + result[i].description);
    }
}

// @ts-ignore
const translatedLink: TranslatedLink = {
    description:
        "TypeScript tutorial for beginners is a tutorial for all the JavaScript developers ...",
    id: 1,
    url: "www.valentinog.com/typescript/",
    language: "en"
}

filterByTerm(
    [{ url: "JavaScript" }, { url: "TypeScript" }, { url: "NodeJS" }, translatedLink],
    "script",
    "url"
);
