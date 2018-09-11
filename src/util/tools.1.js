/**
 * 组件选中，其他为不触发状态
 * @return []
 */
exports.textActiveOff = (arrs, payload) => {
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
};

exports.delDrag = (arr, index) => arr.filter((item, key) => key !== index);

exports.nowTime = () => {
  const myDate = new Date();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes();
  const am = hours > 12 ? ' AM' : ' PM';
  return `${hours}:${minutes}${am}`;
};
