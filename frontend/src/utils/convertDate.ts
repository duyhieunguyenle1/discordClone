const convertDate = (date: Date, format: 'mm/dd/yy' | 'dd/mm/yy' | 'yy/mm/dd' | 'dd/mm/yyyy') => {
  const map: { [key: string]: string | number } = {
    mm: (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1).toString(),
    dd: (date.getDate() < 10 ? '0' : '') + date.getDate().toString(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  if (format === 'dd/mm/yyyy') {
    return `${map['dd']}/${map['mm']}/${map['yyyy']}`;
  }

  return format.replace(/mm|dd|yy|yyyy/gi, matched => String(map[matched]));
};

export default convertDate;
