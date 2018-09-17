import { property } from 'lodash';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://test-bfe.meiyou.com';

const { NODE_ENV } = process.env;
const api = NODE_ENV === 'development' ? 'https://test-bfe.meiyou.com' : 'https://bfe.meiyou.com';
const getPageInfo = pageId => axios.get('/api/we/page', { params: { page_id: pageId } })
  .then(property('data'));

const publishPage = pageId => axios.post(`${api}/api/we/page-pub?page_id=${pageId}`)
  .then(property('data'));

const postPageInfo = data => axios.post(`${api}/api/we/page`, data)
  .then(property('data'));

const patchPageInfo = (pageId, data) => axios.patch(`${api}/api/we/page?page_id=${pageId}`, data)
  .then(property('data'));

const getUserInfo = () => axios.get(`${api}/api/we/me`).then(property('data'));

export { axios, getPageInfo, publishPage, postPageInfo, patchPageInfo, getUserInfo };
