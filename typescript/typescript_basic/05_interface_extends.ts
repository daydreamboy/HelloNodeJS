interface Link {
    description?: string;
    id?: number;
    url: string;
}

interface TranslatedLink extends Link {
    language: string;
}

function filterByTerm(input: Array<Link>, searchTerm: string) {
    const regex = new RegExp(searchTerm, "i");
    const result = input.filter(function(arrayElement) {
        return arrayElement.url.match(regex);
    });
    for (let i = 0; i < result.length; i++) {
        console.log('item' + i + ': ' + 'url = ' + result[i].url + ', id = ' + result[i].id + ', description = ' + result[i].description);
    }
}

const translatedLink: TranslatedLink = {
    description:
        "TypeScript tutorial for beginners is a tutorial for all the JavaScript developers ...",
    id: 1,
    url: "www.valentinog.com/typescript/",
    language: "en"
}

filterByTerm(
    [{ url: "JavaScript" }, { url: "TypeScript" }, { url: "NodeJS" }, translatedLink],
    "script"
);
