// 初始化唤起链接
import MeiyouAppBar from 'meetyou.sharebar/lib/MeiyouAppBar';
import YunQiAppBar from 'meetyou.sharebar/lib/YoubaobaoAppBar';
import jssdk from 'meetyou.jssdk';
import querystring from 'meetyou.util/lib/querystring';
import jsonp from 'jsonp';
import { isWeixin, isAndroid, isIOS, isInApp } from './ua';
// const wx = require('../assets/javascript/jweixin-1.2.0');

const getDownLoadUrl = (downloadUrls) => {
  let url = '';
  if (isWeixin && downloadUrls.yyb) {
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
  const appid = parseInt(query.appid || query.app_id, 10);
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

// 点击热区事件, 这里有四种组合：app内跳转，分享页面跳转，app内唤起，分享页面
const handleClick = ({
  sourceType, awakeLink, outLink, appLink, sharebar, downloadUrls,
}) => {
  if (sourceType === '1') {
    // 内部链接和外部链接不一样
    window.location.href = isInApp ? appLink : outLink;
  } else if (!isInApp) {
    // 非app页面唤起app
    const download = getDownLoadUrl(downloadUrls);
    // 如果在微信打开，不存在 yyb 渠道，但是存在 ios / android 渠道时展示引导
    if (isWeixin && !downloadUrls.yyb && download) {
      return showDownLoadTip();
    }
    sharebar.handleOpen();
  } else {
    // app内唤起app
    jssdk.callNative('open', { url: awakeLink }, (path, data) => {
      if (!data) {
        // 打开失败，跳转下载应用
        const download = getDownLoadUrl(downloadUrls);
        if (!download) {
          return;
        }
        window.location.href = download;
      }
    });
  }
};

export default {
  init, handleClick, wxShare,
};
