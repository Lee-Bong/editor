import property from 'lodash/property';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://test-bfe.meiyou.com';

const { NODE_ENV } = process.env;
const api = NODE_ENV === 'development' ? 'https://test-bfe.meiyou.com' : 'https://bfe.meiyou.com';
const getPageInfo = pageId => axios.get(`${api}/api/we/page`, { params: { page_id: pageId } })
  .then(property('data'));

// 获取页面列表
const getPageList = params => axios.get(`${api}/api/we/pages`, { params })
  .then(property('data'));

// 上线
const publishPage = pageId => axios.post(`${api}/api/we/page-pub?page_id=${pageId}`)
  .then(property('data'));

// 下线
const unpublishPage = pageId => axios.post(`${api}/api/we/page-unp?page_id=${pageId}`)
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

export {
  axios,
  api,
  getPageInfo,
  getPageList,
  publishPage,
  unpublishPage,
  duplicatePage,
  deletePage,
  postPageInfo,
  patchPageInfo,
  getUserInfo,
};
