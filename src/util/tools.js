/**
 * 组件选中，其他为不触发状态
 * @return []
 */
export function textActiveOff(arrs, payload) {
  const arr = arrs;
  const { index, isAll } = payload;
  if (arr && arr.length) {
    if (isAll !== undefined) {
      arr[index].isActive = false;
      arr[index].zIndex = arr[index].dragIndex;
    } else {
      arr[index].isActive = true;
      arr[index].zIndex = 1000;
    }
    if (arr.length !== 1) {
      arr.forEach((item, i) => {
        if (i !== index && arr[i].isActive) {
          arr[i].isActive = false;
          arr[i].zIndex = arr[i].dragIndex;
        }
      });
    }
  }
  return arr;
}

export function delDrag(arr, index) { arr.filter((item, key) => key !== index); }

export function nowTime() {
  const myDate = new Date();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes();
  const am = hours > 12 ? ' AM' : ' PM';
  return `${hours}:${minutes}${am}`;
}

export function formatSecond(se) {
  let m = parseInt(se / 60, 10);
  m = m < 10 ? `0${m}` : m;
  let s = parseInt(se % 60, 10);
  s = s < 10 ? `0${s}` : s;
  return `${m}:${s}`;
}

/**
 * 日期格式化 yyyy-MM-hh HH:mm:ss
 */
export function formatDate(date) {
  const addZero = s => (s < 10 ? '0' : '') + s;
  let d = date;
  let output1 = '';
  let output2 = '';

  if (typeof d === 'string') {
    d = new Date(d);
  }

  if (d instanceof Date) {
    output1 = [d.getFullYear(), addZero(d.getMonth() + 1), addZero(d.getDate())];
    output2 = [addZero(d.getHours()), addZero(d.getMinutes()), addZero(d.getSeconds())];

    return `${output1.join('-')} ${output2.join(':')}`;
  }

  return d.toString();
}

export default {
  textActiveOff,
  delDrag,
  nowTime,
  formatSecond,
  formatDate,
};
