import jsonp from 'jsonp';
import property from 'lodash/property';
import axios from './request';

const { host } = window.location;
const isTest = process.env.NODE_ENV === 'development' || host.indexOf('test-') === 0;
const api = isTest ? 'https://test-bfe.meiyou.com' : 'https://bfe.meiyou.com';
const codeApi = isTest ? 'https://test-users.seeyouyima.com' : 'https://users.seeyouyima.com';

// 通过账号登录
const loginByAccount = formData => axios.post(`${api}/api/we/login`, formData);

// 退出登录
const logout = () => axios.post(`${api}/api/we/logout`);

const getPageInfo = pageId => axios.get(`${api}/api/we/page`, { params: { page_id: pageId } })
  .then(property('data'));

// 获取页面列表
const getPageList = params => axios.get(`${api}/api/we/pages`, { params })
  .then(property('data'));

// 发布
const publishPage = pageId => axios.post(`${api}/api/we/page-pub?page_id=${pageId}`)
  .then(property('data'));

// 上线 & 下线
const markPage = (pageId, online) => axios.post(`${api}/api/we/page-mark?page_id=${pageId}`, { online })
  .then(property('data'));

// 复制
const duplicatePage = pageId => axios.post(`${api}/api/we/page-dup?page_id=${pageId}`)
  .then(property('data'));

// 删除
const deletePage = pageId => axios.delete(`${api}/api/we/page?page_id=${pageId}`)
  .then(property('data'));

const postPageInfo = data => axios.post(`${api}/api/we/page`, data)
  .then(property('data'));

const patchPageInfo = (pageId, data) => axios.patch(`${api}/api/we/page?page_id=${pageId}`, data)
  .then(property('data'));

const getUserInfo = () => axios.get(`${api}/api/we/me`).then(property('data'));

const stateBI = (pageId, start, end) => axios.get(`${api}/api/stat-bi?page_id=${pageId}&from=${start}&to=${end}`)
  .then(property('data'));

// 表单-提交
const formSubmit = data => axios.post(`${api}/api/we/form-sumbit`, data).then(property('data'));
// 表单-汇总
const formSummary = params => axios.get(`${api}/api/we/form-summary`, { params }).then(property('data'));
// 表单-停止／开始 收集
const formStopCollect = (pageId, stop) => axios.patch(`${api}/api/we/switch-form-collect?page_id=${pageId}`, { stop_collect: stop }).then(property('data'));

// 汇总-导出
const formExport = pageId =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${api}/api/we/summary-download?page_id=${pageId}`,
      responseType: 'blob',
    }).then((data) => {
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    }).catch(err => reject(err));
  });

// 站外ga上报
const gaReportOut = (data) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://ga.seeyouyima.com/bfe_event', true);
  xhr.send(JSON.stringify(data));
};

const smsApi = (path, params) => new Promise((resolve, reject) => {
  jsonp(`${codeApi}/h5/${path}?${params}`, { timeout: 60000 }, (err, data) => {
    if (!err) {
      resolve(data);
    } else {
      reject(err);
    }
  });
});

// 验证码验证
const smsCode = params => smsApi('sms', params);
const smsVerify = params => smsApi('sms_verify', params);

export {
  axios,
  api,
  getPageInfo,
  getPageList,
  publishPage,
  duplicatePage,
  deletePage,
  postPageInfo,
  patchPageInfo,
  getUserInfo,
  markPage,
  stateBI,
  gaReportOut,
  loginByAccount,
  logout,
  smsCode,
  smsVerify,
  formSubmit,
  formSummary,
  formExport,
  formStopCollect,
};
