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
  const am = hours > 12 ? ' PM' : ' AM';
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

/**
 * 格式化表格数据
 * @param {array} data 表格数据数组
 */
export function formatTableData(data, isDraft) {
  const output = {
    id: data.id,
    title: isDraft ? data.draft_name : data.public_name,
    name: isDraft ? data.draft_title : data.public_title,
    createdAt: formatDate(data.createdAt),
    visit: 0,
    online: data.visible ? 1 : 0, // 上线|下线
    draft: data.draft,
    state: data.state,
  };
  if (data.state) {
    const json = JSON.parse(data.state);
    const { layerLists } = json.publish.editor;
    const clickArr = [];
    if (layerLists && layerLists.length) {
      layerLists.map((item) => {
        if (item.type === 3) {
          clickArr[item.num] = item.name;
        }
        return true;
      });
    }
    output.clickArr = clickArr;
  }
  return output;
}

export function timeForMat(count, date) {
  const time2 = date ? new Date(date) : new Date();
  if (count > 0) {
    time2.setTime(time2.getTime() + (24 * 60 * 60 * 1000 * count));
  } else {
    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * Math.abs(count)));
  }
  const Y2 = time2.getFullYear();
  const M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : `0${time2.getMonth() + 1}`);
  const D2 = (time2.getDate() >= 10 ? time2.getDate() : `0${time2.getDate()}`);
  const timer2 = `${Y2}-${M2}-${D2}`; // 之前几天或者之后的几天
  return timer2;
}

export default {
  textActiveOff,
  delDrag,
  nowTime,
  formatSecond,
  formatDate,
  formatTableData,
  timeForMat,
};
