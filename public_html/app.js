const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const DateET = require('./src/DateET.js');

const server = http.createServer(async (req, res) => {

    // Päringu aadress
    const currentURL = url.parse(req.url, true);
    const pathname = currentURL.pathname;


    // ==========================================
    // AVALEHT /
    // ==========================================

    if (pathname === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.write(`
            <!DOCTYPE html>
            <html lang="et">

            <head>
                <meta charset="UTF-8">
                <title>Rivis, veebiprogrammeerimine</title>
            </head>

            <body>

                <h1>Rivis, veebiprogrammeerimine</h1>

                <p>
                    Tere tulemast minu veebiprogrammeerimise lehele!
                </p>

                <img
                    src="/avaleht.jpg"
                    alt="Avalehe foto"
                    width="400"
                >

                <h2>Minu lehed</h2>

                <ul>
                    <li>
                        <a href="/vanasona">Tänane vanasõna</a>
                    </li>

                    <li>
                        <a href="/miks">Miks ma tulin TLÜ-sse õppima?</a>
                    </li>
                </ul>

                <h2>Aeg</h2>

                <p>
                    Nädalapäev: ${DateET.dayFormattedET()}
                </p>

                <p>
                    Kuupäev: ${DateET.dateFormattedET(1)}
                </p>

                <p>
                    Kellaaeg: ${DateET.timeFormattedET()}
                </p>

            </body>

            </html>
        `);

        res.end();
    }


    // ==========================================
    // VANASÕNA /vanasona
    // ==========================================

    else if (pathname === '/vanasona') {

        try {

            // Asünkroonne tekstifaili lugemine
            const data = await fs.readFile(
                'txt/vanasonad.txt',
                'utf8'
            );

            // Teeme vanasõnadest massiivi
            const folkWisdom = data.split(';');

            // Valime juhusliku vanasõna
            const wisdomNum =
                Math.floor(Math.random() * folkWisdom.length);

            const wisdom = folkWisdom[wisdomNum];

            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.write(`
                <!DOCTYPE html>
                <html lang="et">

                <head>
                    <meta charset="UTF-8">
                    <title>Tänane vanasõna</title>
                </head>

                <body>

                    <h1>Tänane vanasõna</h1>

                    <p>
                        ${wisdom}
                    </p>

                    <p>
                        <a href="/">Avaleht</a>
                    </p>

                </body>

                </html>
            `);

            res.end();

        } catch (err) {

            res.writeHead(500, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.write(`
                <!DOCTYPE html>
                <html lang="et">

                <head>
                    <meta charset="UTF-8">
                    <title>Viga</title>
                </head>

                <body>

                    <h1>Viga</h1>

                    <p>
                        Vanasõna lugemisel tekkis viga.
                    </p>

                    <p>
                        <a href="/">Avaleht</a>
                    </p>

                </body>

                </html>
            `);

            res.end();
        }
    }


    // ==========================================
    // UUS LEHT /miks
    // ==========================================

    else if (pathname === '/miks') {

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.write(`
            <!DOCTYPE html>
            <html lang="et">

            <head>
                <meta charset="UTF-8">
                <title>Miks TLÜ?</title>
            </head>

            <body>

                <h1>Miks ma tulin TLÜ-sse õppima?</h1>

                <p>
                    Tulin Tallinna Ülikooli õppima, sest soovin
                    omandada uusi teadmisi ja arendada oma oskusi.
                </p>

                <p>
                    Veebiprogrammeerimise kursusel soovin õppida,
                    kuidas luua veebilehti ja veebirakendusi.
                </p>

                <img
                    src="/miks.jpg"
                    alt="Foto"
                    width="400"
                >

                <p>
                    <a href="/">Avaleht</a>
                </p>

            </body>

            </html>
        `);

        res.end();
    }


    // ==========================================
    // UNIVERSAALNE JPG MARSRUUT
    // ==========================================

    else {

        // Võtame URL-ist faililaiendi
        const fileExt = path.extname(pathname);

        if (fileExt.toLowerCase() === '.jpg') {

            try {

                // Võtame algusest / ära
                const fileName = pathname.substring(1);

                // Leiame pildifaili asukoha
                const imagePath = path.join(
                    __dirname,
                    fileName
                );

                // Loeme pildi asünkroonselt
                const image = await fs.readFile(imagePath);

                res.writeHead(200, {
                    'Content-Type': 'image/jpeg'
                });

                res.end(image);

            } catch (err) {

                res.writeHead(404, {
                    'Content-Type': 'text/html; charset=utf-8'
                });

                res.write(`
                    <!DOCTYPE html>
                    <html lang="et">

                    <head>
                        <meta charset="UTF-8">
                        <title>404</title>
                    </head>

                    <body>

                        <h1>404</h1>

                        <p>Pilti ei leitud.</p>

                        <p>
                            <a href="/">Avaleht</a>
                        </p>

                    </body>

                    </html>
                `);

                res.end();
            }

        }


        // ==========================================
        // KÕIK MUUD TUNDMATUD AADRESSID
        // ==========================================

        else {

            res.writeHead(404, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.write(`
                <!DOCTYPE html>
                <html lang="et">

                <head>
                    <meta charset="UTF-8">
                    <title>404</title>
                </head>

                <body>

                    <h1>404 - Lehte ei leitud</h1>

                    <p>
                        <a href="/">Avaleht</a>
                    </p>

                </body>

                </html>
            `);

            res.end();
        }
    }

});


// Serveri käivitamine
server.listen(5301, () => {
    console.log('Veebiserver töötab pordil 5301');
});