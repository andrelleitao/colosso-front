export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const isValidDate = (value, userFormat) => {
    // Set default format if format is not provided
    userFormat = userFormat || 'dd/mm/yyyy';

    // Find custom delimiter by excluding the
    // month, day and year characters
    var delimiter = /[^dmy]/.exec(userFormat)[0];

    // Create an array with month, day and year
    // so we know the format by index
    var theFormat = userFormat.split(delimiter);

    // Get the user date now that we know the delimiter
    var theDate = value.split(delimiter);

    function isDate(date, format) {
        var m, d, y, i = 0, len = format.length, f;
        for (i; i < len; i++) {
            f = format[i];
            if (/d/.test(f)) d = date[i];
            if (/m/.test(f)) m = date[i];
            if (/y/.test(f)) y = date[i];
        }
        return (
            m > 0 && m < 13 &&
            y && y.length === 4 &&
            d > 0 &&
            // Is it a valid day of the month?
            d <= (new Date(y, m, 0)).getDate()
        );
    }

    return isDate(theDate, theFormat);
}

export const formatDateToDBDate = (date) => {
    let d = date.split("/");
    return d[2] + "-" + d[1] + "-" + d[0];
}