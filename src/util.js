export function datetimeFormat(dateObject) {
    function leadingZeroFormat(val) {
        return val < 10 ? "0" + val : val
    }
    var dateStr = leadingZeroFormat(dateObject.getDate()) + "." + leadingZeroFormat(dateObject.getMonth()+1) + "." + dateObject.getFullYear()
    var timeStr = leadingZeroFormat(dateObject.getHours()) + ":" + leadingZeroFormat(dateObject.getMinutes())
    return dateStr + " " + timeStr
}

/*
 * Copied from: https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 */
export function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}