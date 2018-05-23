export function wikiRetreiver(whatToBring) {
    "use strict";

    let url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&origin=*&page=${whatToBring}`;
    return new Promise((resolve, reject) => {
        fetch(url)
                 .then((res) => res.json())
                 .then((formattedResponse) => {
                     return resolve(formattedResponse);
                 }).catch((error) => {
                     reject(error)
                 })
    });
}