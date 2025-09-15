export function diffMonths(date1: Date, date2: Date){
    // get time difference in seconds
    var diff = Math.abs(date2.getTime() - date1.getTime()) / 1000;
    // using 30 days for each month
    diff /= (60 * 60 * 24 * 30)

    return Math.round(diff);
}

export function dateToString(date: Date){
    let month = String(date.getUTCMonth() + 1).padStart(2, '0');
    let day = String(date.getUTCDate()).padStart(2, '0');
    let year = String(date.getFullYear());

    console.log(`${year}-${month}-${day}`);

    return `${year}-${month}-${day}`;
}

export function dateToLocaleString(date: Date){
    let month = String(date.getUTCMonth() + 1).padStart(2, '0');
    let day = String(date.getUTCDate()).padStart(2, '0');
    let year = String(date.getFullYear());

    return `${month}/${day}/${year}`;
}