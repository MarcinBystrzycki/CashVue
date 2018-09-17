import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('formatMoney', (value) => {
  if (value !== undefined) {
    return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
  }
  return 0.00;
});

Vue.filter('valueCheck', (value) => {
  if (value !== undefined && value.toString().length) {
    return value;
  }
  return 'n/a';
});

Vue.filter('formatTimestamp', timestamp => dayjs(new Date(timestamp)).format('YYYY/MM/DD'));
