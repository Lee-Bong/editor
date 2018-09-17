// 初始化唤起链接
import MeiyouAppBar from 'meetyou.sharebar/lib/MeiyouAppBar';
import YunQiAppBar from 'meetyou.sharebar/lib/YoubaobaoAppBar';
import querystring from 'meetyou.util/lib/querystring';

const ua = navigator.userAgent.toLowerCase();
const isWeixin = ua.indexOf('micromessenger') !== -1;
const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

const getDownLoadUrl = (downloadUrls) => {
  let download = '';
  if (isAndroid) {
    download = downloadUrls.android;
  } else if (isIOS) {
    download = downloadUrls.ios;
  } else if (isWeixin) {
    download = downloadUrls.yyb;
  }
  return download;
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
    template: '<div style="height: 100%; width: 100%"/>',
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
  if (!sharebar.download) {
    return showDownLoadTip();
  }
  sharebar.handleOpen();
};

export default {
  init, handleOpen, showDownLoadTip, getDownLoadUrl,
};
