const api = window.location.host.indexOf('test-') !== 0 ? 'https://test-bfe.meiyou.com' : 'https://bfe.meiyou.com';
const UP_API = `${api}/api/oss-up`;
export default async function upload(file) {
  const fd = new FormData();
  fd.append('upimg', file);

  const req = await fetch(UP_API, {
    method: 'POST',
    body: fd,
    credentials: 'include',
  });

  const res = await req.json();
  res.url = `https://sc.seeyouyima.com/${res.name}`;

  return res;
}
