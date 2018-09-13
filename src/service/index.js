import { property } from 'lodash';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/';

const getPageInfo = pageId => axios.get('/api/we/page', { params: { page_id: pageId } })
  .then(property('data'));

const publishPage = pageId => axios.post(`/api/we/page-pub?page_id=${pageId}`)
  .then(property('data'));

export { axios, getPageInfo, publishPage };
