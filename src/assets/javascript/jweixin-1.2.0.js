!(function (a, b) {
  typeof define === 'function' && (define.amd || define.cmd) ? define(() => b(a)) : b(a, !0);
}(window, (a, b) => {
  function c(b, c, d) {
    a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), (a) => {
      h(b, a, d);
    }) : k(b, d);
  }

  function d(b, c, d) {
    a.WeixinJSBridge ? WeixinJSBridge.on(b, (a) => {
      d && d.trigger && d.trigger(a), h(b, a, c);
    }) : d ? k(b, d) : k(b, c);
  }

  function e(a) {
    return a = a || {}, a.appId = D.appId, a.verifyAppId = D.appId, a.verifySignType = 'sha1', a.verifyTimestamp = `${D.timestamp}`, a.verifyNonceStr = D.nonceStr, a.verifySignature = D.signature, a;
  }

  function f(a) {
    return {
      timeStamp: `${a.timestamp}`,
      nonceStr: a.nonceStr,
      package: a.package,
      paySign: a.paySign,
      signType: a.signType || 'SHA1',
    };
  }

  function g(a) {
    return a.postalCode = a.addressPostalCode, delete a.addressPostalCode, a.provinceName = a.proviceFirstStageName, delete a.proviceFirstStageName, a.cityName = a.addressCitySecondStageName, delete a.addressCitySecondStageName, a.countryName = a.addressCountiesThirdStageName, delete a.addressCountiesThirdStageName, a.detailInfo = a.addressDetailInfo, delete a.addressDetailInfo, a;
  }

  function h(a, b, c) {
    a == 'openEnterpriseChat' && (b.errCode = b.err_code), delete b.err_code, delete b.err_desc, delete b.err_detail;
    let d = b.errMsg;
    d || (d = b.err_msg, delete b.err_msg, d = i(a, d), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || '', D.debug && !c.isInnerInvoke && alert(JSON.stringify(b));
    let e = d.indexOf(':'),
      f = d.substring(e + 1);
    switch (f) {
      case 'ok':
        c.success && c.success(b);
        break;
      case 'cancel':
        c.cancel && c.cancel(b);
        break;
      default:
        c.fail && c.fail(b);
    }
    c.complete && c.complete(b);
  }

  function i(a, b) {
    let c = a,
      d = q[c];
    d && (c = d);
    let e = 'ok';
    if (b) {
      const f = b.indexOf(':');
      e = b.substring(f + 1), e == 'confirm' && (e = 'ok'), e == 'failed' && (e = 'fail'), e.indexOf('failed_') != -1 && (e = e.substring(7)), e.indexOf('fail_') != -1 && (e = e.substring(5)), e = e.replace(/_/g, ' '), e = e.toLowerCase(), (e == 'access denied' || e == 'no permission to execute') && (e = 'permission denied'), c == 'config' && e == 'function not exist' && (e = 'ok'), e == '' && (e = 'fail');
    }
    return b = `${c}:${e}`;
  }

  function j(a) {
    if (a) {
      for (let b = 0, c = a.length; c > b; ++b) {
        let d = a[b],
          e = p[d];
        e && (a[b] = e);
      }
      return a;
    }
  }

  function k(a, b) {
    if (!(!D.debug || b && b.isInnerInvoke)) {
      const c = q[a];
      c && (a = c), b && b._complete && delete b._complete, console.log(`"${a}",`, b || '');
    }
  }

  function l(a) {
    if (!(v || w || D.debug || A < '6.0.2' || C.systemType < 0)) {
      const b = new Image();
      C.appId = D.appId, C.initTime = B.initEndTime - B.initStartTime, C.preVerifyTime = B.preVerifyEndTime - B.preVerifyStartTime, I.getNetworkType({
        isInnerInvoke: !0,
        success(a) {
          C.networkType = a.networkType;
          const c = `https://open.weixin.qq.com/sdk/report?v=${C.version}&o=${C.isPreVerifyOk}&s=${C.systemType}&c=${C.clientVersion}&a=${C.appId}&n=${C.networkType}&i=${C.initTime}&p=${C.preVerifyTime}&u=${C.url}`;
          b.src = c;
        },
      });
    }
  }

  function m() {
    return (new Date()).getTime();
  }

  function n(b) {
    x && (a.WeixinJSBridge ? b() : r.addEventListener && r.addEventListener('WeixinJSBridgeReady', b, !1));
  }

  function o() {
    I.invoke || (I.invoke = function (b, c, d) {
      a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d);
    }, I.on = function (b, c) {
      a.WeixinJSBridge && WeixinJSBridge.on(b, c);
    });
  }

  if (!a.jWeixin) {
    var p = {
        config: 'preVerifyJSAPI',
        onMenuShareTimeline: 'menu:share:timeline',
        onMenuShareAppMessage: 'menu:share:appmessage',
        onMenuShareQQ: 'menu:share:qq',
        onMenuShareWeibo: 'menu:share:weiboApp',
        onMenuShareQZone: 'menu:share:QZone',
        previewImage: 'imagePreview',
        getLocation: 'geoLocation',
        openProductSpecificView: 'openProductViewWithPid',
        addCard: 'batchAddCard',
        openCard: 'batchViewCard',
        chooseWXPay: 'getBrandWCPayRequest',
        openEnterpriseRedPacket: 'getRecevieBizHongBaoRequest',
        startSearchBeacons: 'startMonitoringBeacons',
        stopSearchBeacons: 'stopMonitoringBeacons',
        onSearchBeacons: 'onBeaconsInRange',
        consumeAndShareCard: 'consumedShareCard',
        openAddress: 'editAddress',
      },
      q = (function () {
        const a = {};
        for (const b in p)a[p[b]] = b;
        return a;
      }()),
      r = a.document,
      s = r.title,
      t = navigator.userAgent.toLowerCase(),
      u = navigator.platform.toLowerCase(),
      v = !(!u.match('mac') && !u.match('win')),
      w = t.indexOf('wxdebugger') != -1,
      x = t.indexOf('micromessenger') != -1,
      y = t.indexOf('android') != -1,
      z = t.indexOf('iphone') != -1 || t.indexOf('ipad') != -1,
      A = (function () {
        const a = t.match(/micromessenger\/(\d+\.\d+\.\d+)/) || t.match(/micromessenger\/(\d+\.\d+)/);
        return a ? a[1] : '';
      }()),
      B = {
        initStartTime: m(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0,
      },
      C = {
        version: 1,
        appId: '',
        initTime: 0,
        preVerifyTime: 0,
        networkType: '',
        isPreVerifyOk: 1,
        systemType: z ? 1 : y ? 2 : -1,
        clientVersion: A,
        url: encodeURIComponent(location.href),
      },
      D = {},
      E = { _completes: [] },
      F = { state: 0, data: {} };
    n(() => {
      B.initEndTime = m();
    });
    var G = !1,
      H = [],
      I = {
        config(a) {
          D = a, k('config', a);
          const b = D.check === !1 ? !1 : !0;
          n(() => {
            if (b) {
              c(p.config, { verifyJsApiList: j(D.jsApiList) }, (function () {
                E._complete = function (a) {
                  B.preVerifyEndTime = m(), F.state = 1, F.data = a;
                }, E.success = function (a) {
                  C.isPreVerifyOk = 0;
                }, E.fail = function (a) {
                  E._fail ? E._fail(a) : F.state = -1;
                };
                const a = E._completes;
                return a.push(() => {
                  l();
                }), E.complete = function (b) {
                  for (let c = 0, d = a.length; d > c; ++c)a[c]();
                  E._completes = [];
                }, E;
              }())), B.preVerifyStartTime = m();
            } else {
              F.state = 1;
              for (let a = E._completes, d = 0, e = a.length; e > d; ++d)a[d]();
              E._completes = [];
            }
          }), D.beta && o();
        },
        ready(a) {
          F.state != 0 ? a() : (E._completes.push(a), !x && D.debug && a());
        },
        error(a) {
          A < '6.0.2' || (F.state == -1 ? a(F.data) : E._fail = a);
        },
        checkJsApi(a) {
          const b = function (a) {
            const b = a.checkResult;
            for (const c in b) {
              const d = q[c];
              d && (b[d] = b[c], delete b[c]);
            }
            return a;
          };
          c('checkJsApi', { jsApiList: j(a.jsApiList) }, (function () {
            return a._complete = function (a) {
              if (y) {
                const c = a.checkResult;
                c && (a.checkResult = JSON.parse(c));
              }
              a = b(a);
            }, a;
          }()));
        },
        onMenuShareTimeline(a) {
          d(p.onMenuShareTimeline, {
            complete() {
              c('shareTimeline', {
                title: a.title || s,
                desc: a.title || s,
                img_url: a.imgUrl || '',
                link: a.link || location.href,
                type: a.type || 'link',
                data_url: a.dataUrl || '',
              }, a);
            },
          }, a);
        },
        onMenuShareAppMessage(a) {
          d(p.onMenuShareAppMessage, {
            complete() {
              c('sendAppMessage', {
                title: a.title || s,
                desc: a.desc || '',
                link: a.link || location.href,
                img_url: a.imgUrl || '',
                type: a.type || 'link',
                data_url: a.dataUrl || '',
              }, a);
            },
          }, a);
        },
        onMenuShareQQ(a) {
          d(p.onMenuShareQQ, {
            complete() {
              c('shareQQ', {
                title: a.title || s,
                desc: a.desc || '',
                img_url: a.imgUrl || '',
                link: a.link || location.href,
              }, a);
            },
          }, a);
        },
        onMenuShareWeibo(a) {
          d(p.onMenuShareWeibo, {
            complete() {
              c('shareWeiboApp', {
                title: a.title || s,
                desc: a.desc || '',
                img_url: a.imgUrl || '',
                link: a.link || location.href,
              }, a);
            },
          }, a);
        },
        onMenuShareQZone(a) {
          d(p.onMenuShareQZone, {
            complete() {
              c('shareQZone', {
                title: a.title || s,
                desc: a.desc || '',
                img_url: a.imgUrl || '',
                link: a.link || location.href,
              }, a);
            },
          }, a);
        },
        startRecord(a) {
          c('startRecord', {}, a);
        },
        stopRecord(a) {
          c('stopRecord', {}, a);
        },
        onVoiceRecordEnd(a) {
          d('onVoiceRecordEnd', a);
        },
        playVoice(a) {
          c('playVoice', { localId: a.localId }, a);
        },
        pauseVoice(a) {
          c('pauseVoice', { localId: a.localId }, a);
        },
        stopVoice(a) {
          c('stopVoice', { localId: a.localId }, a);
        },
        onVoicePlayEnd(a) {
          d('onVoicePlayEnd', a);
        },
        uploadVoice(a) {
          c('uploadVoice', { localId: a.localId, isShowProgressTips: a.isShowProgressTips == 0 ? 0 : 1 }, a);
        },
        downloadVoice(a) {
          c('downloadVoice', { serverId: a.serverId, isShowProgressTips: a.isShowProgressTips == 0 ? 0 : 1 }, a);
        },
        translateVoice(a) {
          c('translateVoice', { localId: a.localId, isShowProgressTips: a.isShowProgressTips == 0 ? 0 : 1 }, a);
        },
        chooseImage(a) {
          c('chooseImage', {
            scene: '1|2',
            count: a.count || 9,
            sizeType: a.sizeType || ['original', 'compressed'],
            sourceType: a.sourceType || ['album', 'camera'],
          }, (function () {
              return a._complete = function (a) {
                if (y) {
                  const b = a.localIds;
                  b && (a.localIds = JSON.parse(b));
                }
              }, a;
            }()));
        },
        getLocation(a) {
        },
        previewImage(a) {
          c(p.previewImage, { current: a.current, urls: a.urls }, a);
        },
        uploadImage(a) {
          c('uploadImage', { localId: a.localId, isShowProgressTips: a.isShowProgressTips == 0 ? 0 : 1 }, a);
        },
        downloadImage(a) {
          c('downloadImage', { serverId: a.serverId, isShowProgressTips: a.isShowProgressTips == 0 ? 0 : 1 }, a);
        },
        getLocalImgData(a) {
          G === !1 ? (G = !0, c('getLocalImgData', { localId: a.localId }, (function () {
            return a._complete = function (a) {
              if (G = !1, H.length > 0) {
                const b = H.shift();
                wx.getLocalImgData(b);
              }
            }, a;
          }()))) : H.push(a);
        },
        getNetworkType(a) {
          const b = function (a) {
            const b = a.errMsg;
            a.errMsg = 'getNetworkType:ok';
            const c = a.subtype;
            if (delete a.subtype, c)a.networkType = c; else {
              let d = b.indexOf(':'),
                e = b.substring(d + 1);
              switch (e) {
                case 'wifi':
                case 'edge':
                case 'wwan':
                  a.networkType = e;
                  break;
                default:
                  a.errMsg = 'getNetworkType:fail';
              }
            }
            return a;
          };
          c('getNetworkType', {}, (function () {
            return a._complete = function (a) {
              a = b(a);
            }, a;
          }()));
        },
        openLocation(a) {
          c('openLocation', {
            latitude: a.latitude,
            longitude: a.longitude,
            name: a.name || '',
            address: a.address || '',
            scale: a.scale || 28,
            infoUrl: a.infoUrl || '',
          }, a);
        },
        getLocation(a) {
          a = a || {}, c(p.getLocation, { type: a.type || 'wgs84' }, (function () {
            return a._complete = function (a) {
              delete a.type;
            }, a;
          }()));
        },
        hideOptionMenu(a) {
          c('hideOptionMenu', {}, a);
        },
        showOptionMenu(a) {
          c('showOptionMenu', {}, a);
        },
        closeWindow(a) {
          a = a || {}, c('closeWindow', {}, a);
        },
        hideMenuItems(a) {
          c('hideMenuItems', { menuList: a.menuList }, a);
        },
        showMenuItems(a) {
          c('showMenuItems', { menuList: a.menuList }, a);
        },
        hideAllNonBaseMenuItem(a) {
          c('hideAllNonBaseMenuItem', {}, a);
        },
        showAllNonBaseMenuItem(a) {
          c('showAllNonBaseMenuItem', {}, a);
        },
        scanQRCode(a) {
          a = a || {}, c('scanQRCode', {
            needResult: a.needResult || 0,
            scanType: a.scanType || ['qrCode', 'barCode'],
          }, (function () {
              return a._complete = function (a) {
                if (z) {
                  const b = a.resultStr;
                  if (b) {
                    const c = JSON.parse(b);
                    a.resultStr = c && c.scan_code && c.scan_code.scan_result;
                  }
                }
              }, a;
            }()));
        },
        openAddress(a) {
          c(p.openAddress, {}, (function () {
            return a._complete = function (a) {
              a = g(a);
            }, a;
          }()));
        },
        openProductSpecificView(a) {
          c(p.openProductSpecificView, { pid: a.productId, view_type: a.viewType || 0, ext_info: a.extInfo }, a);
        },
        addCard(a) {
          for (var b = a.cardList, d = [], e = 0, f = b.length; f > e; ++e) {
            let g = b[e],
              h = { card_id: g.cardId, card_ext: g.cardExt };
            d.push(h);
          }
          c(p.addCard, { card_list: d }, (function () {
            return a._complete = function (a) {
              let b = a.card_list;
              if (b) {
                b = JSON.parse(b);
                for (let c = 0, d = b.length; d > c; ++c) {
                  const e = b[c];
                  e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ;
                }
                a.cardList = b, delete a.card_list;
              }
            }, a;
          }()));
        },
        chooseCard(a) {
          c('chooseCard', {
            app_id: D.appId,
            location_id: a.shopId || '',
            sign_type: a.signType || 'SHA1',
            card_id: a.cardId || '',
            card_type: a.cardType || '',
            card_sign: a.cardSign,
            time_stamp: `${a.timestamp}`,
            nonce_str: a.nonceStr,
          }, (function () {
              return a._complete = function (a) {
                a.cardList = a.choose_card_info, delete a.choose_card_info;
              }, a;
            }()));
        },
        openCard(a) {
          for (var b = a.cardList, d = [], e = 0, f = b.length; f > e; ++e) {
            let g = b[e],
              h = { card_id: g.cardId, code: g.code };
            d.push(h);
          }
          c(p.openCard, { card_list: d }, a);
        },
        consumeAndShareCard(a) {
          c(p.consumeAndShareCard, { consumedCardId: a.cardId, consumedCode: a.code }, a);
        },
        chooseWXPay(a) {
          c(p.chooseWXPay, f(a), a);
        },
        openEnterpriseRedPacket(a) {
          c(p.openEnterpriseRedPacket, f(a), a);
        },
        startSearchBeacons(a) {
          c(p.startSearchBeacons, { ticket: a.ticket }, a);
        },
        stopSearchBeacons(a) {
          c(p.stopSearchBeacons, {}, a);
        },
        onSearchBeacons(a) {
          d(p.onSearchBeacons, a);
        },
        openEnterpriseChat(a) {
          c('openEnterpriseChat', { useridlist: a.userIds, chatname: a.groupName }, a);
        },
      },
      J = 1,
      K = {};
    return r.addEventListener('error', (a) => {
      if (!y) {
        let b = a.target,
          c = b.tagName,
          d = b.src;
        if (c == 'IMG' || c == 'VIDEO' || c == 'AUDIO' || c == 'SOURCE') {
          const e = d.indexOf('wxlocalresource://') != -1;
          if (e) {
            a.preventDefault(), a.stopPropagation();
            let f = b['wx-id'];
            if (f || (f = J++, b['wx-id'] = f), K[f]) return;
            K[f] = !0, wx.ready(() => {
              wx.getLocalImgData({
                localId: d,
                success(a) {
                  b.src = a.localData;
                },
              });
            });
          }
        }
      }
    }, !0), r.addEventListener('load', (a) => {
      if (!y) {
        let b = a.target,
          c = b.tagName;
        b.src;
        if (c == 'IMG' || c == 'VIDEO' || c == 'AUDIO' || c == 'SOURCE') {
          const d = b['wx-id'];
          d && (K[d] = !1);
        }
      }
    }, !0), b && (a.wx = a.jWeixin = I), I;
  }
}));
