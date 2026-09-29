const http = require('http');
const fs = require('fs');
const DateET = require('./src/DateET.js');

const textRef = 'txt/vanasonad.txt';

function getWisdom(callback) {
    fs.readFile(textRef, 'utf8', (err, data) => {
        if (err) {
            callback('Vanasõna lugemisel tekkis viga.');
            return;
        }

        let folkWisdom = data.split(';');
        let wisdomNum = Math.floor(Math.random() * folkWisdom.length);

        callback(folkWisdom[wisdomNum]);
    });
}

const server = http.createServer((req, res) => {

    getWisdom((wisdom) => {

        let pageBody = `
            <h1>Tänane vanasõna</h1>

            <p>${wisdom}</p>
        `;

        // Ülesandes nõutud info
        let pageInfo = `
            <p>Nädalapäev: ${DateET.dayFormattedET()}</p>
            <p>Kuupäev: ${DateET.dateFormattedET(1)}</p>
            <p>Kellaaeg: ${DateET.timeFormattedET()}</p>
        `;

        let pageFoot = `
            <hr>
            <p>TLU veebirakendus</p>
        `;

        let page = `
            <!DOCTYPE html>
            <html lang="et">
            <head>
                <meta charset="UTF-8">
                <title>Vanasõna</title>
            </head>

            <body>
                ${pageBody}

                ${pageInfo}

                ${pageFoot}
            </body>
            </html>
        `;

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(page);
    });
});

server.listen(5301, () => {
    console.log('Veebiserver töötab pordil 5301');
});