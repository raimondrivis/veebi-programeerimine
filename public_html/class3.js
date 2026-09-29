const fs = require ('fs') ;
const textRef = 'txt/vanasonad.txt' ;

function showText (rawText) {
//console.log(rawText) ;
//teeme tekstist listi, kasutame eraldajana ';' märki
let folkWisdom = rawText.split (';')
console.log (folkWisdom) ;
//Loosin kas üks juhuslik või kõik
let choice = Math.round(Math.random());
    if (choice == 0) {


// väljastan ühe juhusliku vanasõna 
let wisdomNum = Math.round(Math.random() * (folkWisdom.length)) ;
console.log ('Tänane vanasõna: ' + (wisdomNum + 1) + folkWisdom[wisdomNum]);

 } else {

        // Kõik vanasõnad
        console.log('Kõik vanasõnad:');

        for (let i = 0; i < folkWisdom.length; i++) {
            console.log((i + 1) + '. ' + folkWisdom[i]);
        }
    }
}

function readTextFile(fileRef){
	fs.readFile(fileRef, 'utf8', (err, data)=>{
	if (err){
		console.log('Viga:! ' + err) ;
	} else {
		showText (data) ;
	}
	});
	
	}
	readTextFile(textRef);