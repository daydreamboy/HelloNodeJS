interface Link {
    description?: string;
    id?: number;
    url: string;
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

filterByTerm(
    [{ url: "JavaScript", id: 1 }, { url: "TypeScript" }, { url: "NodeJS" }],
    "script"
);
