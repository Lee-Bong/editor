import axios from 'axios';
import Message from 'element-ui/lib/message';

const request = axios.create({
  baseURL: 'https://test-bfe.meiyou.com',
  timeout: 60000,
  withCredentials: true, // 是否允许带cookie
});

const isAdmin = () => !!window.location.pathname.match(/^\/we\/admin/);
// request.interceptors.request.use(res => res, (err) => {
//   debugger;
//   Message.error({ message: '请求超时!' });
//   return Promise.resolve(err);
// });
request.interceptors.response.use(
  res => res,
  (error) => {
    // 后端接口需要权限验证
    if (isAdmin() && error.response.status === 401 && window.location.pathname !== '/we/admin/login') {
      Message.error('哎呀，你还未登录，即将跳转登录页~');
      setTimeout(() => {
        window.location.href = '/we/admin/login';
      }, 3000);
    }
  },
);

export default request;
