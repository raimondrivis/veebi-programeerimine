const monthNames = [
    'jaanuar',
    'veebruar',
    'märts',
    'aprill',
    'mai',
    'juuni',
    'juuli',
    'august',
    'september',
    'oktoober',
    'november',
    'detsember'
];

const folkMonthNames = [
    'näärikuu',
    'küünlakuu',
    'paastukuu',
    'jürikuu',
    'lehekuu',
    'jaanipäevakuu',
    'heinakuu',
    'lõikuskuu',
    'mihklikuu',
    'viinakuu',
    'kooljakuu',
    'jõulukuu'
];

const dayNames = [
    'pühapäev',
    'esmaspäev',
    'teisipäev',
    'kolmapäev',
    'neljapäev',
    'reede',
    'laupäev'
];

function dateFormattedET(folk = 0) {
    let now = new Date();

    let day = now.getDate();
    let year = now.getFullYear();

    let month;

    if (folk === 1) {
        month = folkMonthNames[now.getMonth()];
    } else {
        month = monthNames[now.getMonth()];
    }

    return `${day}. ${month} ${year}`;
}

function timeFormattedET() {
    let now = new Date();

    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function dayFormattedET() {
    let now = new Date();

    return dayNames[now.getDay()];
}

module.exports = {
    dateFormattedET,
    timeFormattedET,
    dayFormattedET
};