import axios from './request';

const api = process.env.NODE_ENV === 'development' || window.location.host.indexOf('test-') !== 0 ? 'https://test-bfe.meiyou.com' : 'https://bfe.meiyou.com';
const UP_API = `${api}/api/oss-up`;

export default async function upload(file) {
  const fd = new FormData();
  fd.append('upimg', file);
  const req = await axios.post(UP_API, fd);
  const res = req.data;
  res.url = `https://sc.seeyouyima.com/${res.name}`;
  return res;
}
