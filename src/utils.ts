// Transform number (Sunday (0) - Saturday (6)) to day of week as string
export const getDayString = (day: number) => {
  switch (day) {
    case 0:
      return 'Søndag';
    case 1:
      return 'Mandag';
    case 2:
      return 'Tirsdag';
    case 3:
      return 'Onsdag';
    case 4:
      return 'Torsdag';
    case 5:
      return 'Fredag';
    case 6:
      return 'Lørdag';
    default:
      return day;
  }
};

// Transform number (January (0) - December (11)) to month as string
export const getMonthString = (month: number) => {
  switch (month) {
    case 0:
      return 'Januar';
    case 1:
      return 'Februar';
    case 2:
      return 'Mars';
    case 3:
      return 'April';
    case 4:
      return 'Mai';
    case 5:
      return 'Juni';
    case 6:
      return 'Juli';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'Oktober';
    case 10:
      return 'November';
    case 11:
      return 'Desember';
    default:
      return month;
  }
};

// Add leading zero to numbers below 10. Ex: 2 -> 02, 12 -> 12
const addLeadingZero = (i: number) => (i < 10 ? '0' + i : i);

// Transform date to formatted string
export const getFormattedDate = (dateObj: Date, time = true, day = true, date = true, month = true, year = true) => {
  return (
    (day ? getDayString(dateObj.getDay()) : '') +
    (date ? ` ${dateObj.getDate()}.` : '') +
    (month ? ` ${getMonthString(dateObj.getMonth())}` : '') +
    (year ? ` ${dateObj.getFullYear()}` : '') +
    (time ? ` - ${addLeadingZero(dateObj.getHours())}` + ':' + addLeadingZero(dateObj.getMinutes()) : '')
  );
};

export const numberToDate = (num: number) => {
  return new Date(Number(String(num).substring(0, 4)), Number(String(num).substring(4, 6)), Number(String(num).substring(6, 8)));
};
