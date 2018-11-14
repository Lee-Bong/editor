import jssdk from 'meetyou.jssdk';
import { isMeetyouWebview } from 'meetyou.browser';
import * as service from '../service';

export default ({
  type, value = '', pageId, label = '', path = '/bfe_event',
}) => {
  const params = {
    page_id: pageId,
    label,
    category: isMeetyouWebview ? 'inside' : 'outside',
    type,
    value,
  };
  if (isMeetyouWebview) {
    // 如果是 美柚 app
    return jssdk.callNative('ga', {
      path,
      params,
    });
  }
  return service.gaReportOut(params);
};
