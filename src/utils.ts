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
      return 'jan';
    case 1:
      return 'feb';
    case 2:
      return 'mars';
    case 3:
      return 'april';
    case 4:
      return 'mai';
    case 5:
      return 'juni';
    case 6:
      return 'juli';
    case 7:
      return 'aug';
    case 8:
      return 'sep';
    case 9:
      return 'okt';
    case 10:
      return 'nov';
    case 11:
      return 'des';
    default:
      return month;
  }
};

// Add leading zero to numbers below 10. Ex: 2 -> 02, 12 -> 12
const addLeadingZero = (i: number) => (i < 10 ? '0' + i : i);

// Transform date to formatted string
export const getFormattedDate = (date: Date, time = true) => {
  return (
    getDayString(date.getDay()) +
    ' ' +
    date.getDate() +
    ' ' +
    getMonthString(date.getMonth()) +
    (time ? ' - ' + addLeadingZero(date.getHours()) + ':' + addLeadingZero(date.getMinutes()) : '')
  );
};
