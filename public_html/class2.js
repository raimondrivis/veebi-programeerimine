const firstName = 'Raimond' ;
const lastName = 'Rivis' ;
//vanasti oldi muutujad var
let value1 = 7;
let value2 = 6;

function authorsName(){
   console.log('Programeeris '  + firstName + ' ' + lastName) ;
   // see polegi õige funktsioon
}
function totalValue(){
  return value1 + value2
}

function randomValue (limit) {
return Math.round(Math.random() *limit) ;
}

function myMath (){
value1 = randomValue (10);
value2 = randomValue (5) ;
return value1 + value2;
}

 
function timeformatted() {
 let timeNow = new Date ();
 let hourNow = timeNow.getHours ();
 let minuteNow = timeNow.getMinutes ();
 let secondNow = timeNow.getSeconds ();
console.log(hourNow + ':' + minuteNow + ':' + secondNow);
}
 function dateformatted () {
 let timeNow = new Date ();
 let yearNow = timeNow.getFullYear ();
 let monthNow = timeNow.getMonth ();
 let dayNow = timeNow.getDate();
 const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'] ;
 console.log(dayNow + 's ' + monthNamesET[monthNow] + ' ' + yearNow);
}
function dayName() {
	let timeNow = new Date();
	let weekdayNow = timeNow.getDay(); // 0 = esmaspäev, 1 = teisipäev, ...
	const dayNamesET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
	console.log(dayNamesET[weekdayNow]);
	return dayNamesET[weekdayNow];
}

function dayPart() {
	let hourNow = new Date().getHours();
	let osa;

	if (hourNow < 6) {
		osa = 'öö';
	} else if (hourNow < 12) {
		osa = 'hommik';
	} else if (hourNow < 18) {
		osa = 'päev';
	} else if (hourNow < 23) {
		osa = 'õhtu';
	} else {
		osa = 'öö';
	}	 
	
	  console.log(osa);
    return osa;
}
	
authorsName();
console.log ('2 eelnevalt määratud arvu summa on' + totalValue() +'.') ;
console.log('Juhuslik arv on ' + randomValue(10));
console.log('Loositud arvude summa on ' + myMath() + '.');
authorsName();
console.log ('2 eelnevalt määratud arvu summa on' + totalValue() +'.') ;

dateformatted();
timeformatted();
dayName();
dayPart();