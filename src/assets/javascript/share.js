const $ = require('jquery');
const wx = require('./jweixin-1.2.0');
const querystring = require('meetyou.util/lib/querystring');

const query = querystring.parse();
const browser = navigator.userAgent.toLowerCase();
const uWeixin = browser.indexOf('micromessenger') > -1;
const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端

let MeiyouAppBar = require('meetyou.sharebar/lib/MeiyouAppBar');
const YunQiAppBar = require('meetyou.sharebar/lib/YoubaobaoAppBar');

const appid = query.appid ? parseInt(query.appid, 10) : parseInt(query.app_id, 10);
// 显示底部下载栏,判断条件:柚宝宝3.4以上,柚宝宝有三个appid
if ((appid === 2 || appid === 8 || appid === 14)) {
  MeiyouAppBar = YunQiAppBar;
}

let sharebar = null;

export default function init(url, download) {
  const link = getLink(url);
  const downUrl = isAndroid ? download.android : download.ios;
  sharebar = new MeiyouAppBar({
    container: '.bottom-download',
    link,
    download: downUrl,
  });

  $('.bottom-download,.astro-share-footer,.author,.share-mask').on('click', () => {
    if (uWeixin) {
      if (!download.weixin) {
        return showTip();
      }
      sharebar.download = download.weixin;
    }
    sharebar.handleOpen();
  });
}

function showTip() {
  $('<div class="opentip">' +
    '<div class="opentip__t">1. 点击右上角 &middot;&middot;&middot;</div>' +
    '<div class="opentip__t opentip__t--2">2. 选择用 浏览器/Safari 打开</div>' +
  '</div>')
    .on('click', function () {
      $(this).off('click').remove();
    })
    .appendTo('body');
}

function getLink(url) {
  let src = '';
  const scheme = `${getScheme()}://`;
  const data = {
    url,
  };
  src = `${scheme}web?params=${window.urlsafe_b64encode(JSON.stringify(data))}`;
  return src;
}

function getScheme() {
  let sch = 'meetyou.linggan';
  if (appid === 2 || appid === 14) {
    sch = 'meetyou.yunqi';
  } else if (appid === 8) {
    sch = 'meetyou.yunqi.pro';
  } else if (appid === 6) {
    sch = 'meetyou.linggan.pro';
  }
  return sch;
}


function wxShare() {
  // 微信访问设置二次分享相关数据
  /* eslint-disable */
  var userAgent = window.navigator.userAgent;
  if (userAgent && userAgent.match(/micromessenger/i)) {
    service.getWechatToken({}).then(function (result) {
      try {
        wx.config({
          debug: false,
          appId: result.data.appId,
          timestamp: parseInt(result.data.timestamp),
          nonceStr: result.data.nonceStr,
          signature: result.data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        });

        wx.ready(function () {
          var options = {
            title: document.title,
            desc: '',
            link: document.location.href,
            imgUrl: $('#article img')[0].src,
            success: function () {
            },
            cancel: function () {
            }
          };
          wx.onMenuShareTimeline(options);
          wx.onMenuShareAppMessage(options);
          wx.onMenuShareQQ(options);
          wx.onMenuShareWeibo(options);
          wx.onMenuShareQZone(options);
        });
      } catch (e) {
        /* eslint no-console: 0 */
        (e);
      }
    });
  }
}

// wxShare();