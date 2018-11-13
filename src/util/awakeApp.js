// 初始化唤起链接
import MeiyouAppBar from 'meetyou.sharebar/lib/MeiyouAppBar';
import YunQiAppBar from 'meetyou.sharebar/lib/YoubaobaoAppBar';
import querystring from 'meetyou.util/lib/querystring';
import jsonp from 'jsonp';

// const wx = require('../assets/javascript/jweixin-1.2.0');

const ua = navigator.userAgent;
const isWeixin = !!ua.match(/MicroMessenger/i);
const isAndroid = !!ua.match(/Android|Adr/i);
const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const isInApp = !!ua.match(/MeetYouClient/i);

const getDownLoadUrl = (downloadUrls) => {
  let url = '';
  if (isWeixin) {
    url = downloadUrls.yyb;
  } else if (isAndroid) {
    url = downloadUrls.android;
  } else if (isIOS) {
    url = downloadUrls.ios;
  }
  return url;
};

const init = ({ link, container, downloadUrls }) => {
  const query = querystring.parse();
  const appid = query.appid ? parseInt(query.appid, 10) : parseInt(query.app_id, 10);
  let AppBar = MeiyouAppBar;

  if ((appid === 2 || appid === 8 || appid === 14)) {
    AppBar = YunQiAppBar;
  }
  const download = getDownLoadUrl(downloadUrls);
  const sharebar = new AppBar({
    container,
    link,
    download,
    template: '<div class="downloadbar" style="display: none"/>',
  });

  return sharebar;
};

const showDownLoadTip = () => {
  const tip = document.createElement('div');
  tip.className = 'opentip';
  tip.innerHTML = '<div class="opentip__t">1. 点击右上角 &middot;&middot;&middot;</div>' +
    '<div class="opentip__t opentip__t--2">2. 选择用 浏览器/Safari 打开</div>';
  tip.onclick = () => {
    tip.parentNode.removeChild(tip);
  };
  document.body.appendChild(tip);
};

const handleOpen = (sharebar) => {
  if (isWeixin && !sharebar.download) {
    return showDownLoadTip();
  }
  sharebar.handleOpen();
};

const getWechatToken = () => new Promise((resolve, reject) => {
  const url = `https://view.seeyouyima.com/api/wechat?url=${encodeURIComponent(window.location.href)}`;
  jsonp(url, null, (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

// 微信二次分享
const wxShare = (opt = {}) => {
  if (isWeixin) {
    getWechatToken().then((result) => {
      const { wx } = window;
      wx.config({
        debug: false,
        appId: result.data.appId,
        timestamp: parseInt(result.data.timestamp, 10),
        nonceStr: result.data.nonceStr,
        signature: result.data.signature,
        jsApiList: [
          'checkJsApi',
          // 'updateAppMessageShareData',
          // 'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
        ],
      });

      wx.ready(() => {
        const defaultOptions = {
          title: document.title,
          desc: '',
          link: document.location.href,
          imgUrl: '',
          success: () => {
          },
          cancel: () => {
          },
        };
        const options = { ...defaultOptions, ...opt };
        // wx.updateAppMessageShareData(options);
        // wx.updateTimelineShareData(options);
        wx.onMenuShareTimeline(options);
        wx.onMenuShareAppMessage(options);
        wx.onMenuShareQQ(options);
        wx.onMenuShareWeibo(options);
        wx.onMenuShareQZone(options);
      });
    });
  }
};

export default {
  init, handleOpen, showDownLoadTip, getDownLoadUrl, wxShare, isInApp,
};
