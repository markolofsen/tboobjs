import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';


const timeAgoConfig: L10nsStrings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: '',
  suffixFromNow: 'from now',
  seconds: '<s.',
  minute: '<m.',
  minutes: '-%d m.',
  hour: '<h.',
  hours: '-%d h.',
  day: '-1 d.',
  days: '%d days',
  month: 'about a month',
  months: '%d months',
  year: 'about a year',
  years: '%d years',
  wordSeparator: ' '
}


export function getTimeAgoFormat() {
    return buildFormatter(timeAgoConfig);
}
