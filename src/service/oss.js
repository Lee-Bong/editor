import axios from './request';

const { host } = window.location;
const api = process.env.NODE_ENV === 'development' || host.indexOf('test-') === 0 ? 'https://test-bfe.meiyou.com' : 'https://bfe.meiyou.com';

const UP_API = `${api}/api/oss-up`;

export default async function upload(file, callback) {
  const fd = new FormData();
  fd.append('upimg', file);
  // const req = await axios.post(UP_API, fd);
  const req = await axios({
    url: UP_API,
    method: 'post',
    data: fd,
    onUploadProgress: function cb(progressEvent) {
      if (callback && progressEvent.lengthComputable) {
        callback(progressEvent);
      }
    },
  });
  const res = req.data;
  res.url = `https://sc.seeyouyima.com/${res.name}`;
  return res;
}
