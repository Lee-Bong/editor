import jssdk from 'meetyou.jssdk';
import { isInApp } from './ua';
import * as service from '../service';

export default ({
  type, value = '', pageId, label = '', path = '/bfe_event',
}) => {
  const params = {
    page_id: pageId,
    label,
    category: isInApp ? 'inside' : 'outside',
    type,
    value,
  };
  if (isInApp) {
    // 如果是 美柚 app
    return jssdk.callNative('ga', {
      path,
      params,
    });
  }
  return service.gaReportOut(params);
};
