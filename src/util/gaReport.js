import * as service from '../service';

export default ({
  type, value = '', pageId, label = '',
}) => {
  const params = {
    page_id: pageId,
    label,
    category: 'outside',
    type,
    value,
  };
  return service.gaReportOut(params);
};
