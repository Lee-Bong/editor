import jssdk from 'meetyou.jssdk';
import * as service from '../service';
import { browser } from './myUtil';

export default ({
  type, value = '', pageId, label = '', path = '/bfe_event',
}) => {
  const params = {
    page_id: pageId,
    label,
    category: browser.isMeetyouWebview ? 'inside' : 'outside',
    type,
    value,
  };
  if (browser.isMeetyouWebview) {
    // 如果是 美柚 app
    return jssdk.callNative('ga', {
      path,
      params,
    });
  }
  return service.gaReportOut(params);
};
