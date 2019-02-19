const UA = window.navigator.userAgent;
const isMeetyouWebview = /MeetYouClient/i.test(UA);
const isAndroid = /Android/i.test(UA);
const isIOS = /iPhone|iPad|iPod/i.test(UA);
const isWechat = /MicroMessenger\/(\d+)\.(\d+)\.?(\d+)?/i.test(UA);
const isQQ = isIOS ? /QQ|Qzone/i.test(UA) && !/MQQBrowser/i.test(UA) : /MQQBrowser/i.test(UA) && /QQ/i.test(UA.split('MQQBrowser'));
const isWeibo = /weibo/i.test(UA);
const browser = {
  isMeetyouWebview,
  isAndroid,
  isIOS,
  isWechat,
  isQQ,
  isWeibo,
};

export { browser };
