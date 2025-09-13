export function diffMonths(date1: Date, date2: Date){
    // get time difference in seconds
    var diff = Math.abs(date2.getTime() - date1.getTime()) / 1000;
    // using 30 days for each month
    diff /= (60 * 60 * 24 * 30)

    return Math.round(diff);
}