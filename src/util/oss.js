import OSS from 'ali-oss';
import md5 from 'js-md5';

const STS_API = 'http://localhost:8080/api/oss-sts';

export default async function upload(f) {
  const files = Array.isArray(f) ? f : [f];


  const response = await OSS.urllib.request(STS_API);
  alert(JSON.stringify(response));
  const { data } = response;
  const client = new OSS({
    accessKeyId: data.AccessKeyId,
    accessKeySecret: data.AccessKeySecret,
    stsToken: data.SecurityToken,
  });
  const result = [];
  for (const file of files) {
    try {
      const ok = await getObjectMd5(file);
      const up = await client.put(ok, file);
      result.push(up);
    } catch (ex) {
      // console.error(ex);
    }
  }
  alert(JSON.stringify(result));
  return result;
}

function getObjectMd5(file) {
  const ext = getExt(file.name);

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = event => resolve(md5(event.target.result) + ext);
    reader.readAsArrayBuffer(file);
  });
}

function getExt(name) {
  const dotIndex = name.lastIndexOf('.');
  if (dotIndex === -1) {
    return '';
  }
  return name.slice(dotIndex);
}
