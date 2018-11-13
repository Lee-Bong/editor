import property from 'lodash/property';
import axios from './request';

const { host } = window.location;
const api = process.env.NODE_ENV === 'development' || host.indexOf('test-') === 0 ? 'https://test-bfe.meiyou.com' : 'https://bfe.meiyou.com';

// 通过账号登录
const loginByAccount = formData => axios.post(`${api}/api/we/login`, formData);

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
  loginByAccount,
};
