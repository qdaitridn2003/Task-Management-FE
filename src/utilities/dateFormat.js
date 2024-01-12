import { formatDistanceToNow, parseISO } from 'date-fns';

export const dateFormatDetail = (date) => {
  if (!date) {
    return '';
  }
  const formattedDate = formatDistanceToNow(parseISO(date));
  if (formattedDate === 'less than a minute') {
    return '1 phút trước';
  } else if (formattedDate.includes('minute')) {
    if (formattedDate.includes('about')) {
      return `Khoảng ${formattedDate.split(' ')[1]} phút trước`;
    } else {
      return `${formattedDate.split(' ')[0]} phút trước`;
    }
  } else if (formattedDate.includes('hour')) {
    if (formattedDate.includes('about')) {
      return `Khoảng ${formattedDate.split(' ')[1]} tiếng trước`;
    } else {
      return `${formattedDate.split(' ')[0]} tiếng trước`;
    }
  } else if (formattedDate.includes('month')) {
    if (formattedDate.includes('about')) {
      return `Khoảng ${formattedDate.split(' ')[1]} tháng trước`;
    } else {
      return `${formattedDate.split(' ')[0]} tháng trước`;
    }
  } else if (formattedDate.includes('year')) {
    if (formattedDate.includes('about')) {
      return `Khoảng ${formattedDate.split(' ')[1]} năm trước`;
    } else {
      return `${formattedDate.split(' ')[0]} năm trước`;
    }
  } else {
    return '';
  }
};
