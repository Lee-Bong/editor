
import jssdk from 'meetyou.jssdk';
import { browser } from '@/util/myUtil';
import axios from '../service/request';

const sdk = {
  isMeetyouWebview: browser.isMeetyouWebview,
  jssdk,
  query: null,
  scale: 1,
  get: (param, cb) => {
    const params = Object.assign({ method: 'get' }, param);
    sdk.requestSend(params, cb);
  },
  post: (param, cb) => {
    const params = Object.assign({ method: 'post' }, param);
    sdk.requestSend(params, cb);
  },
  request: (params, cb) => {
    sdk.jssdk.callNative('request', params, (path, response) => {
      if (cb) cb(response);
    });
  },
  requestSend: (params, cb) => {
    if (sdk.isMeetyouWebview) {
      sdk.request(params, cb);
    } else {
      sdk.webRequest(params, cb);
    }
  },
  webRequest: (param, cb) => {
    axios(param).then((data) => {
      if (cb) {
        if (data) {
          cb(data);
        } else {
          cb({ message: '请求出错，请重试～' });
        }
      }
    });
  },
  goFun: (code) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static.seeyouyima.com/bfe/we/simJQ-2.2.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = () => {
      // eslint-disable-next-line no-eval
      eval(code);
    };
  },
};

const init = (code, qy, scale) => {
  sdk.query = qy;
  sdk.scale = scale;
  sdk.goFun(code);
};

export { init };
