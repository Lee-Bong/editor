// 初始化唤起链接
import MeiyouAppBar from 'meetyou.sharebar/lib/MeiyouAppBar';
import YunQiAppBar from 'meetyou.sharebar/lib/YoubaobaoAppBar';
import querystring from 'meetyou.util/lib/querystring';

const ua = navigator.userAgent;
const isWeixin = ua.indexOf('MicroMessenger') !== -1 || ua.indexOf('micromessenger') !== -1;
const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

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

export default {
  init, handleOpen, showDownLoadTip, getDownLoadUrl,
};
