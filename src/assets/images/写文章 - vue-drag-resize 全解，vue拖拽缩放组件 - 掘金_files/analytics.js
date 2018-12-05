(function () {
  let k = this,
    l = function (a, b) { a = a.split('.'); let c = k; a[0] in c || typeof c.execScript === 'undefined' || c.execScript(`var ${a[0]}`); for (var d; a.length && (d = a.shift());)a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b; }; let m = function (a) { const b = []; if (Array.prototype.indexOf) return a = b.indexOf(a), typeof a === 'number' ? a : -1; for (let c = 0; c < b.length; c++) if (b[c] === a) return c; return -1; },
    n = function (a, b) { for (const c in b)b.hasOwnProperty(c) && (a[c] = b[c]); },
    q = function (a) { for (const b in a) if (a.hasOwnProperty(b)) return !0; return !1; }; const r = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i; let t = window,
    u = document,
    v = function (a, b) { u.addEventListener ? u.addEventListener(a, b, !1) : u.attachEvent && u.attachEvent(`on${a}`, b); }; var w = /:[0-9]+$/,
    y = function (a, b) {
      let c = function (a) { return a ? a.replace(':', '').toLowerCase() : ''; }; c = c(a.protocol) || c(t.location.protocol); b && (b = String(b).toLowerCase()); switch (b) {
        case 'url_no_fragment': a = x(a); break; case 'protocol': a = c; break; case 'host': a = (a.hostname || t.location.hostname).replace(w, '').toLowerCase(); break; case 'port': a = String(Number(a.hostname ? a.port : t.location.port) || (c == 'http' ? 80 : c == 'https' ? 443 : '')); break; case 'path': a = a.pathname.substr(0, 1) == '/' ? a.pathname : `/${a.pathname}`; a = a.split('/');
          m(a[a.length - 1]) >= 0 && (a[a.length - 1] = ''); a = a.join('/'); break; case 'query': a = a.search.replace('?', ''); break; case 'extension': a = a.pathname.split('.'); a = a.length > 1 ? a[a.length - 1] : ''; a = a.split('/')[0]; break; case 'fragment': a = a.hash.replace('#', ''); break; default: a = a && a.href;
      } return a;
    },
    x = function (a) { let b = ''; a && a.href && (b = a.hash ? a.href.replace(a.hash, '') : a.href); return b; },
    z = function (a) {
      const b = document.createElement('a'); a && (r.test(a), b.href = a); a = b.pathname; a[0] !== '/' && (a = `/${a}`); const c = b.hostname.replace(w, '');
      return {
        href: b.href, protocol: b.protocol, host: b.host, hostname: c, pathname: a, search: b.search, hash: b.hash, port: b.port,
      };
    }; function A() { for (var a = B, b = {}, c = 0; c < a.length; ++c)b[a[c]] = c; return b; } function C() { let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; a += `${a.toLowerCase()}0123456789-_`; return `${a}.`; }
  let B,
    D,
    E = function (a) {
      B = B || C(); D = D || A(); for (var b = [], c = 0; c < a.length; c += 3) {
        let d = c + 1 < a.length,
          e = c + 2 < a.length,
          g = a.charCodeAt(c),
          f = d ? a.charCodeAt(c + 1) : 0,
          h = e ? a.charCodeAt(c + 2) : 0,
          p = g >> 2; g = (g & 3) << 4 | f >> 4; f = (f & 15) << 2 | h >> 6; h &= 63; e || (h = 64, d || (f = 64)); b.push(B[p], B[g], B[f], B[h]);
      } return b.join('');
    },
    F = function (a) {
      function b(b) {
        for (;d < a.length;) {
          let c = a.charAt(d++),
            e = D[c]; if (e != null) return e; if (!/^[\s\xa0]*$/.test(c)) throw Error(`Unknown base64 encoding at char: ${c}`);
        } return b;
      }B = B || C(); D = D || A(); for (var c = '', d = 0; ;) {
        let e =
b(-1),
          g = b(0),
          f = b(64),
          h = b(64); if (h === 64 && e === -1) return c; c += String.fromCharCode(e << 2 | g >> 4); f != 64 && (c += String.fromCharCode(g << 4 & 240 | f >> 2), h != 64 && (c += String.fromCharCode(f << 6 & 192 | h)));
      }
    }; let G; function H(a, b) { if (!a || b === u.location.hostname) return !1; for (let c = 0; c < a.length; c++) if (a[c] instanceof RegExp) { if (a[c].test(b)) return !0; } else if (b.indexOf(a[c]) >= 0) return !0; return !1; } const I = function () { let a = {}; let b = t.google_tag_data; t.google_tag_data = void 0 === b ? a : b; a = t.google_tag_data; b = a.gl; b && b.decorators || (b = { decorators: [] }, a.gl = b); return b; }; var J = /(.*?)\*(.*?)\*(.*)/,
    K = /([^?#]+)(\?[^#]*)?(#.*)?/,
    L = /(.*?)(^|&)_gl=([^&]*)&?(.*)/,
    N = function (a) {
      let b = [],
        c; for (c in a) if (a.hasOwnProperty(c)) { const d = a[c]; void 0 !== d && d === d && d !== null && d.toString() !== '[object Object]' && (b.push(c), b.push(E(String(d)))); }a = b.join('*'); return ['1', M(a), a].join('*');
    },
    M = function (a, b) {
      a = [window.navigator.userAgent, (new Date()).getTimezoneOffset(), window.navigator.userLanguage || window.navigator.language, Math.floor((new Date()).getTime() / 60 / 1E3) - (void 0 === b ? 0 : b), a].join('*');
      if (!(b = G)) { b = Array(256); for (var c = 0; c < 256; c++) { for (var d = c, e = 0; e < 8; e++)d = d & 1 ? d >>> 1 ^ 3988292384 : d >>> 1; b[c] = d; } }G = b; b = 4294967295; for (c = 0; c < a.length; c++)b = b >>> 8 ^ G[(b ^ a.charCodeAt(c)) & 255]; return ((b ^ -1) >>> 0).toString(36);
    },
    Q = function (a) {
      return function (b) {
        let c = z(t.location.href),
          d = c.search.replace('?', ''); a: { var e = d.split('&'); for (var g = 0; g < e.length; g++) { const f = e[g].split('='); if (decodeURIComponent(f[0]).replace(/\+/g, ' ') == '_gl') { e = f.slice(1).join('='); break a; } }e = void 0; }b.query = O(e || '') || {}; e = y(c, 'fragment');
        g = e.match(L); b.fragment = O(g && g[3] || '') || {}; a && P(c, d, e);
      };
    }; function R(a) {
    const b = L.exec(a); if (b) {
      let c = b[2],
        d = b[4]; a = b[1]; d && (a = a + c + d);
    } return a;
  }
  var P = function (a, b, c) { function d(a, b) { a = R(a); a.length && (a = b + a); return a; }t.history && t.history.replaceState && (L.test(b) || L.test(c)) && (a = y(a, 'path'), b = d(b, '?'), c = d(c, '#'), t.history.replaceState({}, void 0, `${a}${b}${c}`)); },
    O = function (a) {
      var b = void 0 === b ? 3 : b; try {
        if (a) {
          a: { for (let c = 0; c < 3; ++c) { const d = J.exec(a); if (d) { var e = d; break a; }a = decodeURIComponent(a); }e = void 0; } if (e && e[1] === '1') {
            let g = e[2],
              f = e[3]; a: { for (e = 0; e < b; ++e) if (g === M(f, e)) { var h = !0; break a; }h = !1; } if (h) {
              b = {}; const p = f ? f.split('*') : []; for (f = 0; f < p.length; f +=
2)b[p[f]] = F(p[f + 1]); return b;
            }
          }
        }
      } catch (Y) {}
    }; function S(a, b, c) { function d(a) { a = R(a); const b = a.charAt(a.length - 1); a && b !== '&' && (a += '&'); return a + f; }c = void 0 === c ? !1 : c; let e = K.exec(b); if (!e) return ''; b = e[1]; let g = e[2] || ''; e = e[3] || ''; var f = `_gl=${a}`; c ? e = `#${d(e.substring(1))}` : g = `?${d(g.substring(1))}`; return `${b}${g}${e}`; }
  function T(a, b, c) { for (var d = {}, e = {}, g = I().decorators, f = 0; f < g.length; ++f) { const h = g[f]; (!c || h.forms) && H(h.domains, b) && (h.fragment ? n(e, h.callback()) : n(d, h.callback())); }q(d) && (b = N(d), c ? U(b, a) : V(b, a, !1)); !c && q(e) && (c = N(e), V(c, a, !0)); } function V(a, b, c) { b.href && (a = S(a, b.href, void 0 === c ? !1 : c), r.test(a) && (b.href = a)); }
  function U(a, b) { if (b && b.action) { let c = (b.method || '').toLowerCase(); if (c === 'get') { c = b.childNodes || []; for (var d = !1, e = 0; e < c.length; e++) { const g = c[e]; if (g.name === '_gl') { g.setAttribute('value', a); d = !0; break; } }d || (c = u.createElement('input'), c.setAttribute('type', 'hidden'), c.setAttribute('name', '_gl'), c.setAttribute('value', a), b.appendChild(c)); } else c === 'post' && (a = S(a, b.action), r.test(a) && (b.action = a)); } }
  let W = function (a) { try { a: { let b = a.target || a.srcElement || {}; for (a = 100; b && a > 0;) { if (b.href && b.nodeName.match(/^a(?:rea)?$/i)) { var c = b; break a; }b = b.parentNode; a--; }c = null; } if (c) { const d = c.protocol; d !== 'http:' && d !== 'https:' || T(c, c.hostname, !1); } } catch (e) {} },
    X = function (a) { try { const b = a.target || a.srcElement || {}; if (b.action) { const c = y(z(b.action), 'host'); T(b, c, !0); } } catch (d) {} }; l('google_tag_data.glBridge.auto', (a, b, c, d) => {
    const e = I(); e.init || (v('mousedown', W), v('keyup', W), v('submit', X), e.init = !0); a = {
      callback: a, domains: b, fragment: c === 'fragment', forms: !!d,
    }; I().decorators.push(a);
  }); l('google_tag_data.glBridge.decorate', (a, b, c) => { c = !!c; a = N(a); if (b.tagName) { if (b.tagName.toLowerCase() == 'a') return V(a, b, c); if (b.tagName.toLowerCase() == 'form') return U(a, b); } if (typeof b === 'string') return S(a, b, c); }); l('google_tag_data.glBridge.generate', N);
  l('google_tag_data.glBridge.get', (a, b) => { let c = Q(!!b); b = I(); b.data || (b.data = { query: {}, fragment: {} }, c(b.data)); c = {}; if (b = b.data)n(c, b.query), a && n(c, b.fragment); return c; });
}(window));
(function () {
  function La(a) {
    let b = 1,
      c; if (a) for (b = 0, c = a.length - 1; c >= 0; c--) { let d = a.charCodeAt(c); b = (b << 6 & 268435455) + d + (d << 14); d = b & 266338304; b = d != 0 ? b ^ d >> 21 : b; } return b;
  } const $c = function (a) { this.w = a || []; }; $c.prototype.set = function (a) { this.w[a] = !0; }; $c.prototype.encode = function () { for (var a = [], b = 0; b < this.w.length; b++) this.w[b] && (a[Math.floor(b / 6)] ^= 1 << b % 6); for (b = 0; b < a.length; b++)a[b] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.charAt(a[b] || 0); return `${a.join('')}~`; }; const vd = new $c(); function J(a) { vd.set(a); } var Td = function (a) { a = Dd(a); a = new $c(a); for (var b = vd.w.slice(), c = 0; c < a.w.length; c++)b[c] = b[c] || a.w[c]; return (new $c(b)).encode(); },
    Dd = function (a) { a = a.get(Gd); ka(a) || (a = []); return a; }; var ea = function (a) { return typeof a === 'function'; },
    ka = function (a) { return Object.prototype.toString.call(Object(a)) == '[object Array]'; },
    qa = function (a) { return void 0 != a && (`${a.constructor}`).indexOf('String') > -1; },
    D = function (a, b) { return a.indexOf(b) == 0; },
    sa = function (a) { return a ? a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : ''; },
    ra = function () {
      for (var a = O.navigator.userAgent + (M.cookie ? M.cookie : '') + (M.referrer ? M.referrer : ''), b = a.length, c = O.history.length; c > 0;)a += c-- ^ b++; return [hd() ^ La(a) & 2147483647, Math.round((new Date()).getTime() /
1E3)].join('.');
    },
    ta = function (a) { const b = M.createElement('img'); b.width = 1; b.height = 1; b.src = a; return b; },
    ua = function () {},
    K = function (a) { if (encodeURIComponent instanceof Function) return encodeURIComponent(a); J(28); return a; },
    L = function (a, b, c, d) { try { a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent(`on${b}`, c); } catch (e) { J(27); } },
    f = /^[\w\-:/.?=&%!\[\]]+$/,
    wa = function (a, b, c) {
      a && (c ? (c = '', b && f.test(b) && (c = ` id="${b}"`), f.test(a) && M.write(`<script${c} src="${a}">\x3c/script>`)) : (c = M.createElement('script'),
      c.type = 'text/javascript', c.async = !0, c.src = a, b && (c.id = b), a = M.getElementsByTagName('script')[0], a.parentNode.insertBefore(c, a)));
    },
    be = function (a, b) { return E(M.location[b ? 'href' : 'search'], a); },
    E = function (a, b) { return (a = a.match(`(?:&|#|\\?)${K(b).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')}=([^&#]*)`)) && a.length == 2 ? a[1] : ''; },
    xa = function () { const a = `${M.location.hostname}`; return a.indexOf('www.') == 0 ? a.substring(4) : a; },
    de = function (a, b) {
      const c = a.indexOf(b); if (c == 5 || c == 6) {
        if (a = a.charAt(c + b.length), a == '/' || a == '?' ||
a == '' || a == ':') return !0;
      } return !1;
    },
    ya = function (a, b) { const c = M.referrer; if (/^(https?|android-app):\/\//i.test(c)) { if (a) return c; a = `//${M.location.hostname}`; if (!de(c, a)) return b && (b = `${a.replace(/\./g, '-')}.cdn.ampproject.org`, de(c, b)) ? void 0 : c; } },
    za = function (a, b) { if (b.length == 1 && b[0] != null && typeof b[0] === 'object') return b[0]; for (var c = {}, d = Math.min(a.length + 1, b.length), e = 0; e < d; e++) if (typeof b[e] === 'object') { for (const g in b[e])b[e].hasOwnProperty(g) && (c[g] = b[e][g]); break; } else e < a.length && (c[a[e]] = b[e]); return c; }; const ee = function () { this.keys = []; this.values = {}; this.m = {}; }; ee.prototype.set = function (a, b, c) { this.keys.push(a); c ? this.m[`:${a}`] = b : this.values[`:${a}`] = b; }; ee.prototype.get = function (a) { return this.m.hasOwnProperty(`:${a}`) ? this.m[`:${a}`] : this.values[`:${a}`]; }; ee.prototype.map = function (a) {
    for (let b = 0; b < this.keys.length; b++) {
      let c = this.keys[b],
        d = this.get(c); d && a(c, d);
    }
  }; var O = window,
    M = document,
    va = function (a, b) { return setTimeout(a, b); }; let F = window,
    Ea = document,
    G = function (a) {
      let b = F._gaUserPrefs; if (b && b.ioo && b.ioo() || a && !0 === F[`ga-disable-${a}`]) return !0; try { var c = F.external; if (c && c._gaUserPrefs && c._gaUserPrefs == 'oo') return !0; } catch (g) {}a = []; b = String(Ea.cookie || document.cookie).split(';'); for (c = 0; c < b.length; c++) {
        let d = b[c].split('='),
          e = d[0].replace(/^\s*|\s*$/g, ''); e && e == 'AMP_TOKEN' && ((d = d.slice(1).join('=').replace(/^\s*|\s*$/g, '')) && (d = decodeURIComponent(d)), a.push(d));
      } for (b = 0; b < a.length; b++) if (a[b] == '$OPT_OUT') return !0; return !1;
    }; var Ca = function (a) {
      let b = [],
        c = M.cookie.split(';'); a = new RegExp(`^\\s*${a}=\\s*(.*?)\\s*$`); for (let d = 0; d < c.length; d++) { const e = c[d].match(a); e && b.push(e[1]); } return b;
    },
    zc = function (a, b, c, d, e, g) {
      e = G(e) ? !1 : eb.test(M.location.hostname) || c == '/' && vc.test(d) ? !1 : !0; if (!e) return !1; b && b.length > 1200 && (b = b.substring(0, 1200)); c = `${a}=${b}; path=${c}; `; g && (c += `expires=${(new Date((new Date()).getTime() + g)).toGMTString()}; `); d && d !== 'none' && (c += `domain=${d};`); d = M.cookie; M.cookie = c; if (!(d = d != M.cookie)) {
        a: {
          a = Ca(a);
          for (d = 0; d < a.length; d++) if (b == a[d]) { d = !0; break a; }d = !1;
        }
      } return d;
    },
    Cc = function (a) { return encodeURIComponent ? encodeURIComponent(a).replace(/\(/g, '%28').replace(/\)/g, '%29') : a; },
    vc = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    eb = /(^|\.)doubleclick\.net$/i; let oc,
    Id = /^.*Version\/?(\d+)[^\d].*$/i,
    ne = function () { if (void 0 !== O.__ga4__) return O.__ga4__; if (void 0 === oc) { let a = O.navigator.userAgent; if (a) { let b = a; try { b = decodeURIComponent(a); } catch (c) {} if (a = !(b.indexOf('Chrome') >= 0) && !(b.indexOf('CriOS') >= 0) && (b.indexOf('Safari/') >= 0 || b.indexOf('Safari,') >= 0))b = Id.exec(b), a = (b ? Number(b[1]) : -1) >= 11; oc = a; } else oc = !1; } return oc; }; var Fa,
    Ga,
    fb,
    Ab,
    ja = /^https?:\/\/[^/]*cdn\.ampproject\.org\//,
    Ue = /^(?:www\.|m\.|amp\.)+/,
    Ub = [],
    da = function (a) {
      a: {
        if (ja.test(M.referrer)) {
          var b = M.location.hostname.replace(Ue, ''); b: {
            var c = M.referrer; c = c.replace(/^https?:\/\//, ''); var d = c.replace(/^[^/]+/, '').split('/'),
              e = d[2]; d = (d = e == 's' ? d[3] : e) ? decodeURIComponent(d) : d; if (!d) { if (c.indexOf('xn--') == 0) { c = ''; break b; }(c = c.match(/(.*)\.cdn\.ampproject\.org\/?$/)) && c.length == 2 && (d = c[1].replace(/-/g, '.').replace(/\.\./g, '-')); }c = d ? d.replace(Ue, '') : '';
          } if (b ==
c) { b = !0; break a; } else J(78);
        }b = !1;
      } if (b && !1 !== a[Kd] && (void 0 === Ab && (b = (b = De.get()) && b._ga || void 0) && (Ab = b, J(81)), void 0 !== Ab)) return a[Q] || (a[Q] = Ab), !1; if (a[Kd]) {
        J(67); if (a[ac] && a[ac] != 'cookie') return !1; if (void 0 !== Ab)a[Q] || (a[Q] = Ab); else {
          a:if (b = String(a[W] || xa()), c = String(a[Yb] || '/'), d = Ca(String(a[U] || '_ga')), b = na(d, b, c), !b || jd.test(b))b = !0; else if (b = Ca('AMP_TOKEN'), b.length == 0)b = !0; else {
            if (b.length == 1 && (b = decodeURIComponent(b[0]), b == '$RETRIEVING' || b == '$OPT_OUT' || b == '$ERROR' || b == '$NOT_FOUND')) {
              b = !0;
              break a;
            }b = !1;
          } if (b && tc(ic, String(a[Na]))) return !0;
        }
      } return !1;
    },
    ic = function () { Z.D([ua]); },
    tc = function (a, b) {
      let c = Ca('AMP_TOKEN'); if (c.length > 1) return J(55), !1; c = decodeURIComponent(c[0] || ''); if (c == '$OPT_OUT' || c == '$ERROR' || G(b)) return J(62), !1; if (!ja.test(M.referrer) && c == '$NOT_FOUND') return J(68), !1; if (void 0 !== Ab) return J(56), va(() => { a(Ab); }, 0), !0; if (Fa) return Ub.push(a), !0; if (c == '$RETRIEVING') return J(57), va(() => { tc(a, b); }, 1E4), !0; Fa = !0; c && c[0] != '$' || (xc('$RETRIEVING', 3E4), setTimeout(Mc, 3E4),
      c = ''); return Pc(c, b) ? (Ub.push(a), !0) : !1;
    },
    Pc = function (a, b, c) {
      if (!window.JSON) return J(58), !1; let d = O.XMLHttpRequest; if (!d) return J(59), !1; let e = new d(); if (!('withCredentials' in e)) return J(60), !1; e.open('POST', `${c || 'https://ampcid.google.com/v1/publisher:getClientId'}?key=AIzaSyA65lEHUEizIsNtlbNo-l2K18dT680nsaM`, !0); e.withCredentials = !0; e.setRequestHeader('Content-Type', 'text/plain'); e.onload = function () {
        Fa = !1; if (e.readyState == 4) {
          try {
            e.status != 200 && (J(61), Qc('', '$ERROR', 3E4)); const d = JSON.parse(e.responseText);
            d.optOut ? (J(63), Qc('', '$OPT_OUT', 31536E6)) : d.clientId ? Qc(d.clientId, d.securityToken, 31536E6) : !c && d.alternateUrl ? (Ga && clearTimeout(Ga), Fa = !0, Pc(a, b, d.alternateUrl)) : (J(64), Qc('', '$NOT_FOUND', 36E5));
          } catch (ca) { J(65), Qc('', '$ERROR', 3E4); }e = null;
        }
      }; d = { originScope: 'AMP_ECID_GOOGLE' }; a && (d.securityToken = a); e.send(JSON.stringify(d)); Ga = va(() => { J(66); Qc('', '$ERROR', 3E4); }, 1E4); return !0;
    },
    Mc = function () { Fa = !1; },
    xc = function (a, b) {
      if (void 0 === fb) {
        fb = ''; for (let c = id(), d = 0; d < c.length; d++) {
          const e = c[d]; if (zc(
            'AMP_TOKEN',
            encodeURIComponent(a), '/', e, '', b,
          )) { fb = e; return; }
        }
      }zc('AMP_TOKEN', encodeURIComponent(a), '/', fb, '', b);
    },
    Qc = function (a, b, c) { Ga && clearTimeout(Ga); b && xc(b, c); Ab = a; b = Ub; Ub = []; for (c = 0; c < b.length; c++)b[c](a); }; var oe = function () { return `${Ba || M.location.protocol == 'https:' ? 'https:' : 'http:'}//www.google-analytics.com`; },
    Da = function (a) { this.name = 'len'; this.message = `${a}-8192`; },
    ba = function (a, b, c) { c = c || ua; if (b.length <= 2036)wc(a, b, c); else if (b.length <= 8192)x(a, b, c) || wd(a, b, c) || wc(a, b, c); else throw ge('len', b.length), new Da(b.length); },
    pe = function (a, b, c, d) { d = d || ua; wd(`${a}?${b}`, '', d, c); },
    wc = function (a, b, c) { const d = ta(`${a}?${b}`); d.onload = d.onerror = function () { d.onload = null; d.onerror = null; c(); }; },
    wd = function (a, b, c, d) {
      const e = O.XMLHttpRequest;
      if (!e) return !1; let g = new e(); if (!('withCredentials' in g)) return !1; a = a.replace(/^http:/, 'https:'); g.open('POST', a, !0); g.withCredentials = !0; g.setRequestHeader('Content-Type', 'text/plain'); g.onreadystatechange = function () {
        if (g.readyState == 4) {
          if (d) {
            try {
              const a = g.responseText; if (a.length < 1)ge('xhr', 'ver', '0'), c(); else if (a.charAt(0) != '1')ge('xhr', 'ver', String(a.length)), c(); else if (d.count++ > 3)ge('xhr', 'tmr', `${d.count}`), c(); else if (a.length == 1)c(); else {
                const b = a.charAt(1); if (b == 'd') {
                  pe(
                    'https://stats.g.doubleclick.net/j/collect',
                    d.U, d, c,
                  );
                } else if (b == 'g') { const e = 'https://www.google.%/ads/ga-audiences'.replace('%', 'com'); wc(e, d.google, c); const w = a.substring(2); if (w) if (/^[a-z.]{1,6}$/.test(w)) { const ha = 'https://www.google.%/ads/ga-audiences'.replace('%', w); wc(ha, d.google, ua); } else ge('tld', 'bcc', w); } else ge('xhr', 'brc', b), c();
              }
            } catch (ue) { ge('xhr', 'rsp'), c(); }
          } else c(); g = null;
        }
      }; g.send(b); return !0;
    },
    x = function (a, b, c) { return O.navigator.sendBeacon ? O.navigator.sendBeacon(a, b) ? (c(), !0) : !1 : !1; },
    ge = function (a, b, c) {
      100 * Math.random() >= 1 || G('?') ||
(a = ['t=error', `_e=${a}`, '_v=j72', 'sr=1'], b && a.push(`_f=${b}`), c && a.push(`_m=${K(c.substring(0, 100))}`), a.push('aip=1'), a.push(`z=${hd()}`), wc('https://www.google-analytics.com/u/d', a.join('&'), ua));
    }; const h = function (a) { const b = O.gaData = O.gaData || {}; return b[a] = b[a] || {}; }; const Ha = function () { this.M = []; }; Ha.prototype.add = function (a) { this.M.push(a); }; Ha.prototype.D = function (a) { try { for (var b = 0; b < this.M.length; b++) { const c = a.get(this.M[b]); c && ea(c) && c.call(O, a); } } catch (d) {}b = a.get(Ia); b != ua && ea(b) && (a.set(Ia, ua, !0), setTimeout(b, 10)); }; function Ja(a) { if (a.get(Ka) != 100 && La(P(a, Q)) % 1E4 >= 100 * R(a, Ka)) throw 'abort'; } function Ma(a) { if (G(P(a, Na))) throw 'abort'; } function Oa() { const a = M.location.protocol; if (a != 'http:' && a != 'https:') throw 'abort'; }
  function Pa(a) { try { O.navigator.sendBeacon ? J(42) : O.XMLHttpRequest && 'withCredentials' in new O.XMLHttpRequest() && J(40); } catch (c) {}a.set(ld, Td(a), !0); a.set(Ac, R(a, Ac) + 1); const b = []; Qa.map((c, d) => { d.F && (c = a.get(c), void 0 != c && c != d.defaultValue && (typeof c === 'boolean' && (c *= 1), b.push(`${d.F}=${K(`${c}`)}`))); }); b.push(`z=${Bd()}`); a.set(Ra, b.join('&'), !0); }
  function Sa(a) {
    let b = P(a, gd) || `${oe()}/collect`,
      c = a.get(qe),
      d = P(a, fa); !d && a.get(Vd) && (d = 'beacon'); if (c)pe(b, P(a, Ra), c, a.get(Ia)); else if (d) { c = d; d = P(a, Ra); let e = a.get(Ia); e = e || ua; c == 'image' ? wc(b, d, e) : c == 'xhr' && wd(b, d, e) || c == 'beacon' && x(b, d, e) || ba(b, d, e); } else ba(b, P(a, Ra), a.get(Ia)); b = a.get(Na); b = h(b); c = b.hitcount; b.hitcount = c ? c + 1 : 1; b = a.get(Na); delete h(b).pending_experiments; a.set(Ia, ua, !0);
  }
  function Hc(a) { (O.gaData = O.gaData || {}).expId && a.set(Nc, (O.gaData = O.gaData || {}).expId); (O.gaData = O.gaData || {}).expVar && a.set(Oc, (O.gaData = O.gaData || {}).expVar); let b = a.get(Na); if (b = h(b).pending_experiments) { const c = []; for (d in b)b.hasOwnProperty(d) && b[d] && c.push(`${encodeURIComponent(d)}.${encodeURIComponent(b[d])}`); var d = c.join('!'); } else d = void 0; d && a.set(m, d, !0); } function cd() { if (O.navigator && O.navigator.loadPurpose == 'preview') throw 'abort'; }
  function yd(a) { const b = O.gaDevIds; ka(b) && b.length != 0 && a.set('&did', b.join(','), !0); } function vb(a) { if (!a.get(Na)) throw 'abort'; } var hd = function () { return Math.round(2147483647 * Math.random()); },
    Bd = function () { try { const a = new Uint32Array(1); O.crypto.getRandomValues(a); return a[0] & 2147483647; } catch (b) { return hd(); } }; function Ta(a) {
    let b = R(a, Ua); b >= 500 && J(15); let c = P(a, Va); if (c != 'transaction' && c != 'item') {
      c = R(a, Wa); let d = (new Date()).getTime(),
        e = R(a, Xa); e == 0 && a.set(Xa, d); e = Math.round(2 * (d - e) / 1E3); e > 0 && (c = Math.min(c + e, 20), a.set(Xa, d)); if (c <= 0) throw 'abort'; a.set(Wa, --c);
    }a.set(Ua, ++b);
  } var Ya = function () { this.data = new ee(); },
    Qa = new ee(),
    Za = []; Ya.prototype.get = function (a) {
    let b = $a(a),
      c = this.data.get(a); b && void 0 == c && (c = ea(b.defaultValue) ? b.defaultValue() : b.defaultValue); return b && b.Z ? b.Z(this, a, c) : c;
  }; var P = function (a, b) { a = a.get(b); return void 0 == a ? '' : `${a}`; },
    R = function (a, b) { a = a.get(b); return void 0 == a || a === '' ? 0 : 1 * a; }; Ya.prototype.set = function (a, b, c) { if (a) if (typeof a === 'object') for (const d in a)a.hasOwnProperty(d) && ab(this, d, a[d], c); else ab(this, a, b, c); };
  var ab = function (a, b, c, d) { if (void 0 != c) switch (b) { case Na: wb.test(c); } const e = $a(b); e && e.o ? e.o(a, b, c, d) : a.data.set(b, c, d); },
    bb = function (a, b, c, d, e) { this.name = a; this.F = b; this.Z = d; this.o = e; this.defaultValue = c; },
    $a = function (a) {
      let b = Qa.get(a); if (!b) {
        for (let c = 0; c < Za.length; c++) {
          let d = Za[c],
            e = d[0].exec(a); if (e) { b = d[1](e); Qa.set(b.name, b); break; }
        }
      } return b;
    },
    yc = function (a) { let b; Qa.map((c, d) => { d.F == a && (b = d); }); return b && b.name; },
    S = function (a, b, c, d, e) { a = new bb(a, b, c, d, e); Qa.set(a.name, a); return a.name; },
    cb = function (
      a,
      b,
    ) { Za.push([new RegExp(`^${a}$`), b]); },
    T = function (a, b, c) { return S(a, b, c, void 0, db); },
    db = function () {}; var gb = qa(window.GoogleAnalyticsObject) && sa(window.GoogleAnalyticsObject) || 'ga',
    jd = /^(?:utma\.)?\d+\.\d+$/,
    kd = /^amp-[\w.-]{22,64}$/,
    Ba = !1,
    hb = T('apiVersion', 'v'),
    ib = T('clientVersion', '_v'); S('anonymizeIp', 'aip'); var jb = S('adSenseId', 'a'),
    Va = S('hitType', 't'),
    Ia = S('hitCallback'),
    Ra = S('hitPayload'); S('nonInteraction', 'ni'); S('currencyCode', 'cu'); S('dataSource', 'ds'); var Vd = S('useBeacon', void 0, !1),
    fa = S('transport'); S('sessionControl', 'sc', ''); S('sessionGroup', 'sg'); S('queueTime', 'qt'); var Ac = S('_s', '_s');
  S('screenName', 'cd'); let kb = S('location', 'dl', ''),
    lb = S('referrer', 'dr'),
    mb = S('page', 'dp', ''); S('hostname', 'dh'); let nb = S('language', 'ul'),
    ob = S('encoding', 'de'); S('title', 'dt', () => M.title || void 0); cb('contentGroup([0-9]+)', a => new bb(a[0], `cg${a[1]}`)); let pb = S('screenColors', 'sd'),
    qb = S('screenResolution', 'sr'),
    rb = S('viewportSize', 'vp'),
    sb = S('javaEnabled', 'je'),
    tb = S('flashVersion', 'fl'); S('campaignId', 'ci'); S('campaignName', 'cn'); S('campaignSource', 'cs');
  S('campaignMedium', 'cm'); S('campaignKeyword', 'ck'); S('campaignContent', 'cc');
  let ub = S('eventCategory', 'ec'),
    xb = S('eventAction', 'ea'),
    yb = S('eventLabel', 'el'),
    zb = S('eventValue', 'ev'),
    Bb = S('socialNetwork', 'sn'),
    Cb = S('socialAction', 'sa'),
    Db = S('socialTarget', 'st'),
    Eb = S('l1', 'plt'),
    Fb = S('l2', 'pdt'),
    Gb = S('l3', 'dns'),
    Hb = S('l4', 'rrt'),
    Ib = S('l5', 'srt'),
    Jb = S('l6', 'tcp'),
    Kb = S('l7', 'dit'),
    Lb = S('l8', 'clt'),
    Ve = S('l9', '_gst'),
    We = S('l10', '_gbt'),
    Xe = S('l11', '_cst'),
    Ye = S('l12', '_cbt'),
    Mb = S('timingCategory', 'utc'),
    Nb = S('timingVar', 'utv'),
    Ob = S('timingLabel', 'utl'),
    Pb = S('timingValue', 'utt');
  S('appName', 'an'); S('appVersion', 'av', ''); S('appId', 'aid', ''); S('appInstallerId', 'aiid', ''); S('exDescription', 'exd'); S('exFatal', 'exf'); var Nc = S('expId', 'xid'),
    Oc = S('expVar', 'xvar'),
    m = S('exp', 'exp'),
    Rc = S('_utma', '_utma'),
    Sc = S('_utmz', '_utmz'),
    Tc = S('_utmht', '_utmht'),
    Ua = S('_hc', void 0, 0),
    Xa = S('_ti', void 0, 0),
    Wa = S('_to', void 0, 20); cb('dimension([0-9]+)', a => new bb(a[0], `cd${a[1]}`)); cb('metric([0-9]+)', a => new bb(a[0], `cm${a[1]}`)); S('linkerParam', void 0, void 0, Bc, db);
  var Ze = T('_cd2l', void 0, !1),
    ld = S('usage', '_u'),
    Gd = S('_um'); S('forceSSL', void 0, void 0, () => Ba, (a, b, c) => { J(34); Ba = !!c; }); let ed = S('_j1', 'jid'),
    ia = S('_j2', 'gjid'); cb('\\&(.*)', (a) => {
    let b = new bb(a[0], a[1]),
      c = yc(a[0].substring(1)); c && (b.Z = function (a) { return a.get(c); }, b.o = function (a, b, g, ca) { a.set(c, g, ca); }, b.F = void 0); return b;
  });
  var Qb = T('_oot'),
    dd = S('previewTask'),
    Rb = S('checkProtocolTask'),
    md = S('validationTask'),
    Sb = S('checkStorageTask'),
    Uc = S('historyImportTask'),
    Tb = S('samplerTask'),
    Vb = S('_rlt'),
    Wb = S('buildHitTask'),
    Xb = S('sendHitTask'),
    Vc = S('ceTask'),
    zd = S('devIdTask'),
    Cd = S('timingTask'),
    Ld = S('displayFeaturesTask'),
    oa = S('customTask'),
    V = T('name'),
    Q = T('clientId', 'cid'),
    n = T('clientIdTime'),
    xd = T('storedClientId'),
    Ad = S('userId', 'uid'),
    Na = T('trackingId', 'tid'),
    U = T('cookieName', void 0, '_ga'),
    W = T('cookieDomain'),
    Yb = T(
      'cookiePath',
      void 0, '/',
    ),
    Zb = T('cookieExpires', void 0, 63072E3),
    Hd = T('cookieUpdate', void 0, !0),
    $b = T('legacyCookieDomain'),
    Wc = T('legacyHistoryImport', void 0, !0),
    ac = T('storage', void 0, 'cookie'),
    bc = T('allowLinker', void 0, !1),
    cc = T('allowAnchor', void 0, !0),
    Ka = T('sampleRate', 'sf', 100),
    dc = T('siteSpeedSampleRate', void 0, 1),
    ec = T('alwaysSendReferrer', void 0, !1),
    I = T('_gid', '_gid'),
    la = T('_gcn'),
    Kd = T('useAmpClientId'),
    ce = T('_gclid'),
    fe = T('_gt'),
    he = T('_ge', void 0, 7776E6),
    ie = T('_gclsrc'),
    je = T('storeGac', void 0, !0),
    gd = S('transportUrl'),
    Md = S('_r', '_r'),
    qe = S('_dp'),
    Ud = S('allowAdFeatures', void 0, !0); function X(a, b, c, d) { b[a] = function () { try { return d && J(d), c.apply(this, arguments); } catch (e) { throw ge('exc', a, e && e.name), e; } }; } let Od = function () { this.V = 100; this.$ = this.fa = !1; this.oa = 'detourexp'; this.groups = 1; },
    Ed = function (a) {
      let b = new Od(),
        c; if (b.fa && b.$) return 0; b.$ = !0; if (a) { if (b.oa && void 0 !== a.get(b.oa)) return R(a, b.oa); if (a.get(dc) == 0) return 0; } if (b.V == 0) return 0; void 0 === c && (c = Bd()); return c % b.V == 0 ? Math.floor(c / b.V) % b.groups + 1 : 0;
    }; function fc() {
    let a,
      b; if ((b = (b = O.navigator) ? b.plugins : null) && b.length) for (let c = 0; c < b.length && !a; c++) { const d = b[c]; d.name.indexOf('Shockwave Flash') > -1 && (a = d.description); } if (!a) try { var e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7'); a = e.GetVariable('$version'); } catch (g) {} if (!a) try { e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6'), a = 'WIN 6,0,21,0', e.AllowScriptAccess = 'always', a = e.GetVariable('$version'); } catch (g) {} if (!a) try { e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'), a = e.GetVariable('$version'); } catch (g) {}a &&
(e = a.match(/[\d]+/g)) && e.length >= 3 && (a = `${e[0]}.${e[1]} r${e[2]}`); return a || void 0;
  } var aa = function (a) { const b = Math.min(R(a, dc), 100); return La(P(a, Q)) % 100 >= b ? !1 : !0; },
    gc = function (a) { const b = {}; if (Ec(b) || Fc(b)) { const c = b[Eb]; void 0 == c || Infinity == c || isNaN(c) || (c > 0 ? (Y(b, Gb), Y(b, Jb), Y(b, Ib), Y(b, Fb), Y(b, Hb), Y(b, Kb), Y(b, Lb), Y(b, Ve), Y(b, We), Y(b, Xe), Y(b, Ye), va(() => { a(b); }, 10)) : L(O, 'load', () => { gc(a); }, !1)); } },
    Ec = function (a) {
      let b = O.performance || O.webkitPerformance; b = b && b.timing; if (!b) return !1; const c = b.navigationStart; if (c == 0) return !1; a[Eb] = b.loadEventStart - c; a[Gb] = b.domainLookupEnd - b.domainLookupStart;
      a[Jb] = b.connectEnd - b.connectStart; a[Ib] = b.responseStart - b.requestStart; a[Fb] = b.responseEnd - b.responseStart; a[Hb] = b.fetchStart - c; a[Kb] = b.domInteractive - c; a[Lb] = b.domContentLoadedEventStart - c; a[Ve] = N.L - c; a[We] = N.ya - c; O.google_tag_manager && O.google_tag_manager._li && (b = O.google_tag_manager._li, a[Xe] = b.cst, a[Ye] = b.cbt); return !0;
    },
    Fc = function (a) {
      if (O.top != O) return !1; let b = O.external,
        c = b && b.onloadT; b && !b.isValidLoadTime && (c = void 0); c > 2147483648 && (c = void 0); c > 0 && b.setPageReadyTime(); if (void 0 == c) return !1;
      a[Eb] = c; return !0;
    },
    Y = function (a, b) { const c = a[b]; if (isNaN(c) || Infinity == c || c < 0)a[b] = void 0; },
    Fd = function (a) {
      return function (b) {
        if (b.get(Va) == 'pageview' && !a.I) {
          a.I = !0; let c = aa(b),
            d = E(b.get(kb), 'gclid').length > 0; (c || d) && gc((b) => { c && a.send('timing', b); d && a.send('adtiming', b); });
        }
      };
    }; var hc = !1,
    mc = function (a) {
      if (P(a, ac) == 'cookie') {
        if (a.get(Hd) || P(a, xd) != P(a, Q)) { var b = 1E3 * R(a, Zb); ma(a, Q, U, b); }ma(a, I, la, 864E5); if (a.get(je)) {
          let c = a.get(ce); if (c) {
            let d = Math.min(R(a, he), 1E3 * R(a, Zb)); d = Math.min(d, 1E3 * R(a, fe) + d - (new Date()).getTime()); a.data.set(he, d); b = {}; let e = a.get(fe),
              g = a.get(ie),
              ca = kc(P(a, Yb)),
              l = lc(P(a, W)); a = P(a, Na); g && g != 'aw.ds' ? b && (b.ua = !0) : (c = ['1', e, Cc(c)].join('.'), d > 0 && (b && (b.ta = !0), zc(`_gac_${Cc(a)}`, c, ca, l, a, d))); le(b);
          }
        } else J(75);
      }
    },
    ma = function (a, b, c, d) {
      let e = nd(a, b); if (e) {
        c =
P(a, c); let g = kc(P(a, Yb)),
          ca = lc(P(a, W)),
          l = P(a, Na); if (ca != 'auto')zc(c, e, g, ca, l, d) && (hc = !0); else { J(32); for (let k = id(), w = 0; w < k.length; w++) if (ca = k[w], a.data.set(W, ca), e = nd(a, b), zc(c, e, g, ca, l, d)) { hc = !0; return; }a.data.set(W, 'auto'); }
      }
    },
    nc = function (a) { if (P(a, ac) == 'cookie' && !hc && (mc(a), !hc)) throw 'abort'; },
    Yc = function (a) {
      if (a.get(Wc)) {
        let b = P(a, W),
          c = P(a, $b) || xa(),
          d = Xc('__utma', c, b); d && (J(19), a.set(Tc, (new Date()).getTime(), !0), a.set(Rc, d.R), (b = Xc('__utmz', c, b)) && d.hash == b.hash && a.set(Sc, b.R));
      }
    },
    nd = function (a, b) {
      b =
Cc(P(a, b)); let c = lc(P(a, W)).split('.').length; a = jc(P(a, Yb)); a > 1 && (c += `-${a}`); return b ? ['GA1', c, b].join('.') : '';
    },
    Xd = function (a, b) { return na(b, P(a, W), P(a, Yb)); },
    na = function (a, b, c) {
      if (!a || a.length < 1)J(12); else {
        for (var d = [], e = 0; e < a.length; e++) { let g = a[e]; let ca = g.split('.'); const l = ca.shift(); (l == 'GA1' || l == '1') && ca.length > 1 ? (g = ca.shift().split('-'), g.length == 1 && (g[1] = '1'), g[0] *= 1, g[1] *= 1, ca = { H: g, s: ca.join('.') }) : ca = kd.test(g) ? { H: [0, 0], s: g } : void 0; ca && d.push(ca); } if (d.length == 1) return J(13), d[0].s; if (d.length == 0)J(12);
        else { J(14); d = Gc(d, lc(b).split('.').length, 0); if (d.length == 1) return d[0].s; d = Gc(d, jc(c), 1); d.length > 1 && J(41); return d[0] && d[0].s; }
      }
    },
    Gc = function (a, b, c) { for (var d = [], e = [], g, ca = 0; ca < a.length; ca++) { const l = a[ca]; l.H[c] == b ? d.push(l) : void 0 == g || l.H[c] < g ? (e = [l], g = l.H[c]) : l.H[c] == g && e.push(l); } return d.length > 0 ? d : e; },
    lc = function (a) { return a.indexOf('.') == 0 ? a.substr(1) : a; },
    id = function () {
      let a = [],
        b = xa().split('.'); if (b.length == 4) { var c = b[b.length - 1]; if (parseInt(c, 10) == c) return ['none']; } for (c = b.length - 2; c >= 0; c--)a.push(b.slice(c).join('.'));
      b = M.location.hostname; eb.test(b) || vc.test(b) || a.push('none'); return a;
    },
    kc = function (a) { if (!a) return '/'; a.length > 1 && a.lastIndexOf('/') == a.length - 1 && (a = a.substr(0, a.length - 1)); a.indexOf('/') != 0 && (a = `/${a}`); return a; },
    jc = function (a) { a = kc(a); return a == '/' ? 1 : a.split('/').length; },
    le = function (a) { a.ta && J(77); a.na && J(74); a.pa && J(73); a.ua && J(69); }; function Xc(a, b, c) {
    b == 'none' && (b = ''); let d = [],
      e = Ca(a); a = a == '__utma' ? 6 : 2; for (let g = 0; g < e.length; g++) { const ca = (`${e[g]}`).split('.'); ca.length >= a && d.push({ hash: ca[0], R: e[g], O: ca }); } if (d.length != 0) return d.length == 1 ? d[0] : Zc(b, d) || Zc(c, d) || Zc(null, d) || d[0];
  } function Zc(a, b) { if (a == null) var c = a = 1; else c = La(a), a = La(D(a, '.') ? a.substring(1) : `.${a}`); for (let d = 0; d < b.length; d++) if (b[d].hash == c || b[d].hash == a) return b[d]; } var od = new RegExp(/^https?:\/\/([^\/:]+)/),
    De = O.google_tag_data.glBridge,
    pd = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/,
    me = /(.*)([?&#])(?:_gac=[^&#]*)(?:&?)(.*)/; function Bc(a) {
    if (a.get(Ze)) return J(35), De.generate($e(a)); let b = a.get(Q),
      c = a.get(I) || ''; b = `_ga=2.${K(`${pa(c + b, 0)}.${c}-${b}`)}`; (a = af(a)) ? (J(44), a = `&_gac=1.${K([pa(a.qa, 0), a.timestamp, a.qa].join('.'))}`) : a = ''; return b + a;
  }
  function Ic(a, b) {
    let c = new Date(),
      d = O.navigator,
      e = d.plugins || []; a = [a, d.userAgent, c.getTimezoneOffset(), c.getYear(), c.getDate(), c.getHours(), c.getMinutes() + b]; for (b = 0; b < e.length; ++b)a.push(e[b].description); return La(a.join('.'));
  } function pa(a, b) {
    let c = new Date(),
      d = O.navigator,
      e = c.getHours() + Math.floor((c.getMinutes() + b) / 60); return La([a, d.userAgent, d.language || '', c.getTimezoneOffset(), c.getYear(), c.getDate() + Math.floor(e / 24), (24 + e) % 24, (60 + c.getMinutes() + b) % 60].join('.'));
  }
  const Dc = function (a) { J(48); this.target = a; this.T = !1; }; Dc.prototype.ca = function (a, b) { if (a) { if (this.target.get(Ze)) return De.decorate($e(this.target), a, b); if (a.tagName) { if (a.tagName.toLowerCase() == 'a') { a.href && (a.href = qd(this, a.href, b)); return; } if (a.tagName.toLowerCase() == 'form') return rd(this, a); } if (typeof a === 'string') return qd(this, a, b); } };
  var qd = function (a, b, c) { let d = pd.exec(b); d && d.length >= 3 && (b = d[1] + (d[3] ? d[2] + d[3] : '')); (d = me.exec(b)) && d.length >= 3 && (b = d[1] + (d[3] ? d[2] + d[3] : '')); a = a.target.get('linkerParam'); const e = b.indexOf('?'); d = b.indexOf('#'); c ? b += (d == -1 ? '#' : '&') + a : (c = e == -1 ? '?' : '&', b = d == -1 ? b + (c + a) : b.substring(0, d) + c + a + b.substring(d)); b = b.replace(/&+_ga=/, '&_ga='); return b = b.replace(/&+_gac=/, '&_gac='); },
    rd = function (a, b) {
      if (b && b.action) {
        if (b.method.toLowerCase() == 'get') {
          a = a.target.get('linkerParam').split('&'); for (let c = 0; c < a.length; c++) {
            let d =
a[c].split('='),
              e = d[1]; d = d[0]; for (var g = b.childNodes || [], ca = !1, l = 0; l < g.length; l++) if (g[l].name == d) { g[l].setAttribute('value', e); ca = !0; break; }ca || (g = M.createElement('input'), g.setAttribute('type', 'hidden'), g.setAttribute('name', d), g.setAttribute('value', e), b.appendChild(g));
          }
        } else b.method.toLowerCase() == 'post' && (b.action = qd(a, b.action));
      }
    };
  Dc.prototype.S = function (a, b, c) {
    function d(c) { try { c = c || O.event; a: { let d = c.target || c.srcElement; for (c = 100; d && c > 0;) { if (d.href && d.nodeName.match(/^a(?:rea)?$/i)) { var g = d; break a; }d = d.parentNode; c--; }g = {}; }(g.protocol == 'http:' || g.protocol == 'https:') && sd(a, g.hostname || '') && g.href && (g.href = qd(e, g.href, b)); } catch (k) { J(26); } } var e = this; this.target.get(Ze) ? De.auto(() => $e(e.target), a, b ? 'fragment' : '', c) : (this.T || (this.T = !0, L(M, 'mousedown', d, !1), L(M, 'keyup', d, !1)), c && L(M, 'submit', (b) => {
      b = b || O.event;
      if ((b = b.target || b.srcElement) && b.action) { const c = b.action.match(od); c && sd(a, c[1]) && rd(e, b); }
    }));
  }; function sd(a, b) { if (b == M.location.hostname) return !1; for (let c = 0; c < a.length; c++) if (a[c] instanceof RegExp) { if (a[c].test(b)) return !0; } else if (b.indexOf(a[c]) >= 0) return !0; return !1; } function ke(a, b) { return b != Ic(a, 0) && b != Ic(a, -1) && b != Ic(a, -2) && b != pa(a, 0) && b != pa(a, -1) && b != pa(a, -2); } function $e(a) { const b = af(a); return { _ga: a.get(Q), _gid: a.get(I) || void 0, _gac: b ? [b.qa, b.timestamp].join('.') : void 0 }; }
  function af(a) { function b(a) { return void 0 == a || a === '' ? 0 : Number(a); } const c = a.get(ce); if (c && a.get(je)) { const d = b(a.get(fe)); if (1E3 * d + b(a.get(he)) <= (new Date()).getTime())J(76); else return { timestamp: d, qa: c }; } } let p = /^(GTM|OPT)-[A-Z0-9]+$/,
    q = /;_gaexp=[^;]*/g,
    r = /;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g,
    Aa = /^https?:\/\/[\w\-.]+\.google.com(:\d+)?\/optimize\/opt-launch\.html\?.*$/,
    t = function (a) { function b(a, b) { b && (c += `&${a}=${K(b)}`); } var c = `https://www.google-analytics.com/gtm/js?id=${K(a.id)}`; a.B != 'dataLayer' && b('l', a.B); b('t', a.target); b('cid', a.clientId); b('cidt', a.ka); b('gac', a.la); b('aip', a.ia); a.sync && b('m', 'sync'); b('cycle', a.G); a.qa && b('gclid', a.qa); Aa.test(M.referrer) && b('cb', String(hd())); return c; }; var Jd = function (a, b, c) { this.aa = b; (b = c) || (b = (b = P(a, V)) && b != 't0' ? Wd.test(b) ? `_gat_${Cc(P(a, Na))}` : `_gat_${Cc(b)}` : '_gat'); this.Y = b; this.ra = null; },
    Rd = function (a, b) { const c = b.get(Wb); b.set(Wb, (b) => { Pd(a, b, ed); Pd(a, b, ia); const d = c(b); Qd(a, b); return d; }); const d = b.get(Xb); b.set(Xb, (b) => { const c = d(b); if (se(b)) { if (ne() !== H(a, b)) { J(80); const e = { U: re(a, b, 1), google: re(a, b, 2), count: 0 }; pe('https://stats.g.doubleclick.net/j/collect', e.U, e); } else ta(re(a, b, 0)); b.set(ed, '', !0); } return c; }); },
    Pd = function (a, b, c) {
      !1 === b.get(Ud) ||
b.get(c) || (Ca(a.Y)[0] == '1' ? b.set(c, '', !0) : b.set(c, `${hd()}`, !0));
    },
    Qd = function (a, b) { se(b) && zc(a.Y, '1', b.get(Yb), b.get(W), b.get(Na), 6E4); },
    se = function (a) { return !!a.get(ed) && a.get(Ud); },
    re = function (a, b, c) {
      let d = new ee(),
        e = function (a) { $a(a).F && d.set($a(a).F, b.get(a)); }; e(hb); e(ib); e(Na); e(Q); e(ed); if (c == 0 || c == 1)e(Ad), e(ia), e(I); d.set($a(ld).F, Td(b)); let g = ''; d.map((a, b) => { g += `${K(a)}=`; g += `${K(`${b}`)}&`; }); g += `z=${hd()}`; c == 0 ? g = a.aa + g : c == 1 ? g = `t=dc&aip=1&_r=3&${g}` : c == 2 && (g = `t=sr&aip=1&_r=4&slf_rd=1&${g}`); return g;
    },
    H = function (a, b) { a.ra === null && (a.ra = Ed(b) === 1, a.ra && J(33)); return a.ra; },
    Wd = /^gtm\d+$/; const fd = function (a, b) { a = a.b; if (!a.get('dcLoaded')) { const c = new $c(Dd(a)); c.set(29); a.set(Gd, c.w); b = b || {}; let d; b[U] && (d = Cc(b[U])); b = new Jd(a, 'https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&', d); Rd(b, a); a.set('dcLoaded', !0); } }; const Sd = function (a) { if (!a.get('dcLoaded') && a.get(ac) == 'cookie') { const b = new Jd(a); Pd(b, a, ed); Pd(b, a, ia); Qd(b, a); if (se(a)) { const c = ne() !== H(b, a); a.set(Md, 1, !0); c ? (J(79), a.set(gd, `${oe()}/j/collect`, !0), a.set(qe, { U: re(b, a, 1), google: re(b, a, 2), count: 0 }, !0)) : a.set(gd, `${oe()}/r/collect`, !0); } } }; const Lc = function () { const a = O.gaGlobal = O.gaGlobal || {}; return a.hid = a.hid || hd(); }; let ad,
    bd = function (a, b, c) {
      if (!ad) {
        let d = M.location.hash; let e = O.name,
          g = /^#?gaso=([^&]*)/; if (e = (d = (d = d && d.match(g) || e && e.match(g)) ? d[1] : Ca('GASO')[0] || '') && d.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))zc('GASO', `${d}`, c, b, a, 0), window._udo || (window._udo = b), window._utcp || (window._utcp = c), a = e[1], wa(`https://www.google.com/analytics/web/inpage/pub/inpage.js?${a ? `prefix=${a}&` : ''}${hd()}`, '_gasojs'); ad = !0;
      }
    }; var wb = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
    pc = function (a) {
      function b(a, b) { d.b.data.set(a, b); } function c(a, c) { b(a, c); d.filters.add(a); } var d = this; this.b = new Ya(); this.filters = new Ha(); b(V, a[V]); b(Na, sa(a[Na])); b(U, a[U]); b(W, a[W] || xa()); b(Yb, a[Yb]); b(Zb, a[Zb]); b(Hd, a[Hd]); b($b, a[$b]); b(Wc, a[Wc]); b(bc, a[bc]); b(cc, a[cc]); b(Ka, a[Ka]); b(dc, a[dc]); b(ec, a[ec]); b(ac, a[ac]); b(Ad, a[Ad]); b(n, a[n]); b(Kd, a[Kd]); b(je, a[je]); b(Ze, a[Ze]); b(hb, 1); b(ib, 'j72'); c(Qb, Ma); c(oa, ua); c(dd, cd); c(Rb, Oa); c(md, vb); c(Sb, nc); c(Uc, Yc); c(
        Tb,
        Ja,
      ); c(Vb, Ta); c(Vc, Hc); c(zd, yd); c(Ld, Sd); c(Wb, Pa); c(Xb, Sa); c(Cd, Fd(this)); Kc(this.b); Jc(this.b, a[Q]); this.b.set(jb, Lc()); bd(this.b.get(Na), this.b.get(W), this.b.get(Yb));
    },
    Jc = function (a, b) {
      let c = P(a, U); a.data.set(la, c == '_ga' ? '_gid' : `${c}_gid`); if (P(a, ac) == 'cookie') {
        hc = !1; c = Ca(P(a, U)); c = Xd(a, c); if (!c) { c = P(a, W); var d = P(a, $b) || xa(); c = Xc('__utma', d, c); void 0 != c ? (J(10), c = `${c.O[1]}.${c.O[2]}`) : c = void 0; }c && (hc = !0); if (d = c && !a.get(Hd)) {
          if (d = c.split('.'), d.length != 2)d = !1; else if (d = Number(d[1])) {
            var e = R(a, Zb); d = d + e <
(new Date()).getTime() / 1E3;
          } else d = !1;
        } d && (c = void 0); c && (a.data.set(xd, c), a.data.set(Q, c), c = Ca(P(a, la)), (c = Xd(a, c)) && a.data.set(I, c)); if (a.get(je) && (c = a.get(ce), d = a.get(ie), !c || d && d != 'aw.ds')) {
          c = {}; if (M) {
            d = []; e = M.cookie.split(';'); for (var g = /^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/, ca = 0; ca < e.length; ca++) { const l = e[ca].match(g); l && d.push({ ja: l[1], value: l[2] }); }e = {}; if (d && d.length) {
              for (g = 0; g < d.length; g++) {
                (ca = d[g].value.split('.'), ca[0] != '1' || ca.length != 3) ? c && (c.na = !0) : ca[1] && (e[d[g].ja] ? c && (c.pa = !0) : e[d[g].ja] =
[], e[d[g].ja].push({ timestamp: ca[1], qa: ca[2] }));
              }
            }d = e;
          } else d = {}; d = d[P(a, Na)]; le(c); d && d.length != 0 && (c = d[0], a.data.set(fe, c.timestamp), a.data.set(ce, c.qa));
        }
      } if (a.get(Hd) && (c = be('_ga', a.get(cc)), d = be('_gl', a.get(cc)), e = De.get(a.get(cc)), g = e._ga, d && d.indexOf('_ga') > 0 && !g && J(30), c || g)) {
        if (c && g && J(36), a.get(bc)) {
          if (g && (J(38), a.data.set(Q, g), e._gid && (J(51), a.data.set(I, e._gid)), e._gac && (d = e._gac.split('.')) && d.length == 2 && (J(37), a.data.set(ce, d[0]), a.data.set(fe, d[1]))), c) {
            b:if (d = c.indexOf('.'), d == -1)J(22);
            else { e = c.substring(0, d); g = c.substring(d + 1); d = g.indexOf('.'); c = g.substring(0, d); g = g.substring(d + 1); if (e == '1') { if (d = g, ke(d, c)) { J(23); break b; } } else if (e == '2') { d = g.indexOf('-'); e = ''; d > 0 ? (e = g.substring(0, d), d = g.substring(d + 1)) : d = g.substring(1); if (ke(e + d, c)) { J(53); break b; }e && (J(2), a.data.set(I, e)); } else { J(22); break b; }J(11); a.data.set(Q, d); if (c = be('_gac', a.get(cc)))c = c.split('.'), c[0] != '1' || c.length != 4 ? J(72) : ke(c[3], c[1]) ? J(71) : (a.data.set(ce, c[3]), a.data.set(fe, c[2]), J(70)); }
          }
        } else J(21);
      } b && (J(9), a.data.set(
        Q,
        K(b),
      )); a.get(Q) || ((b = (b = O.gaGlobal && O.gaGlobal.vid) && b.search(jd) != -1 ? b : void 0) ? (J(17), a.data.set(Q, b)) : (J(8), a.data.set(Q, ra()))); a.get(I) || (J(3), a.data.set(I, ra())); mc(a);
    },
    Kc = function (a) {
      let b = O.navigator,
        c = O.screen,
        d = M.location; a.set(lb, ya(a.get(ec), a.get(Kd))); if (d) { var e = d.pathname || ''; e.charAt(0) != '/' && (J(31), e = `/${e}`); a.set(kb, `${d.protocol}//${d.hostname}${e}${d.search}`); }c && a.set(qb, `${c.width}x${c.height}`); c && a.set(pb, `${c.colorDepth}-bit`); c = M.documentElement; let g = (e = M.body) && e.clientWidth && e.clientHeight,
        ca = []; c && c.clientWidth && c.clientHeight && (M.compatMode === 'CSS1Compat' || !g) ? ca = [c.clientWidth, c.clientHeight] : g && (ca = [e.clientWidth, e.clientHeight]); c = ca[0] <= 0 || ca[1] <= 0 ? '' : ca.join('x'); a.set(rb, c); a.set(tb, fc()); a.set(ob, M.characterSet || M.charset); a.set(sb, b && typeof b.javaEnabled === 'function' && b.javaEnabled() || !1); a.set(nb, (b && (b.language || b.browserLanguage) || '').toLowerCase()); a.data.set(ce, be('gclid', !0)); a.data.set(ie, be('gclsrc', !0)); a.data.set(fe, Math.round((new Date()).getTime() / 1E3)); if (d && a.get(cc) &&
(b = M.location.hash)) { b = b.split(/[?&#]+/); d = []; for (c = 0; c < b.length; ++c)(D(b[c], 'utm_id') || D(b[c], 'utm_campaign') || D(b[c], 'utm_source') || D(b[c], 'utm_medium') || D(b[c], 'utm_term') || D(b[c], 'utm_content') || D(b[c], 'gclid') || D(b[c], 'dclid') || D(b[c], 'gclsrc')) && d.push(b[c]); d.length > 0 && (b = `#${d.join('&')}`, a.set(kb, a.get(kb) + b)); }
    }; pc.prototype.get = function (a) { return this.b.get(a); }; pc.prototype.set = function (a, b) { this.b.set(a, b); }; const qc = {
    pageview: [mb], event: [ub, xb, yb, zb], social: [Bb, Cb, Db], timing: [Mb, Nb, Pb, Ob],
  };
  pc.prototype.send = function (a) { if (!(arguments.length < 1)) { if (typeof arguments[0] === 'string') { var b = arguments[0]; var c = [].slice.call(arguments, 1); } else b = arguments[0] && arguments[0][Va], c = arguments; b && (c = za(qc[b] || [], c), c[Va] = b, this.b.set(c, void 0, !0), this.filters.D(this.b), this.b.data.m = {}); } }; pc.prototype.ma = function (a, b) { const c = this; u(a, c, b) || (v(a, () => { u(a, c, b); }), y(String(c.get(V)), a, void 0, b, !0)); }; let rc = function (a) { if (M.visibilityState == 'prerender') return !1; a(); return !0; },
    z = function (a) {
      if (!rc(a)) {
        J(16); var b = !1,
          c = function () {
            if (!b && rc(a)) {
              b = !0; let d = c,
                e = M; e.removeEventListener ? e.removeEventListener('visibilitychange', d, !1) : e.detachEvent && e.detachEvent('onvisibilitychange', d);
            }
          }; L(M, 'visibilitychange', c);
      }
    }; let td = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,
    sc = function (a) {
      if (ea(a[0])) this.u = a[0]; else {
        let b = td.exec(a[0]); b != null && b.length == 4 && (this.c = b[1] || 't0', this.K = b[2] || '', this.C = b[3], this.a = [].slice.call(a, 1), this.K || (this.A = this.C == 'create', this.i = this.C == 'require', this.g = this.C == 'provide', this.ba = this.C == 'remove'), this.i && (this.a.length >= 3 ? (this.X = this.a[1], this.W = this.a[2]) : this.a[1] && (qa(this.a[1]) ? this.X = this.a[1] : this.W = this.a[1]))); b = a[1]; a = a[2]; if (!this.C) throw 'abort'; if (this.i && (!qa(b) || b == '')) throw 'abort';
        if (this.g && (!qa(b) || b == '' || !ea(a))) throw 'abort'; if (ud(this.c) || ud(this.K)) throw 'abort'; if (this.g && this.c != 't0') throw 'abort';
      }
    }; function ud(a) { return a.indexOf('.') >= 0 || a.indexOf(':') >= 0; } let Yd,
    Zd,
    $d,
    A; Yd = new ee(); $d = new ee(); A = new ee(); Zd = { ec: 45, ecommerce: 46, linkid: 47 };
  var u = function (a, b, c) { b == N || b.get(V); const d = Yd.get(a); if (!ea(d)) return !1; b.plugins_ = b.plugins_ || new ee(); if (b.plugins_.get(a)) return !0; b.plugins_.set(a, new d(b, c || {})); return !0; },
    y = function (a, b, c, d, e) {
      if (!ea(Yd.get(b)) && !$d.get(b)) {
        Zd.hasOwnProperty(b) && J(Zd[b]); if (p.test(b)) {
          J(52); a = N.j(a); if (!a) return !0; c = d || {}; d = {
            id: b, B: c.dataLayer || 'dataLayer', ia: !!a.get('anonymizeIp'), sync: e, G: !1,
          }; a.get('&gtm') == b && (d.G = !0); const g = String(a.get('name')); g != 't0' && (d.target = g); G(String(a.get('trackingId'))) || (d.clientId =
String(a.get(Q)), d.ka = Number(a.get(n)), c = c.palindrome ? r : q, c = (c = M.cookie.replace(/^|(; +)/g, ';').match(c)) ? c.sort().join('').substring(1) : void 0, d.la = c, d.qa = E(a.b.get(kb) || '', 'gclid')); a = d.B; c = (new Date()).getTime(); O[a] = O[a] || []; c = { 'gtm.start': c }; e || (c.event = 'gtm.js'); O[a].push(c); c = t(d);
        }!c && Zd.hasOwnProperty(b) ? (J(39), c = `${b}.js`) : J(43); c && (c && c.indexOf('/') >= 0 || (c = `${Ba || M.location.protocol == 'https:' ? 'https:' : 'http:'}//www.google-analytics.com/plugins/ua/${c}`), d = ae(c), a = d.protocol, c = M.location.protocol,
        (a == 'https:' || a == c || (a != 'http:' ? 0 : c == 'http:')) && B(d) && (wa(d.url, void 0, e), $d.set(b, !0)));
      }
    },
    v = function (a, b) { const c = A.get(a) || []; c.push(b); A.set(a, c); },
    C = function (a, b) { Yd.set(a, b); b = A.get(a) || []; for (let c = 0; c < b.length; c++)b[c](); A.set(a, []); },
    B = function (a) {
      let b = ae(M.location.href); if (D(a.url, 'https://www.google-analytics.com/gtm/js?id=')) return !0; if (a.query || a.url.indexOf('?') >= 0 || a.path.indexOf('://') >= 0) return !1; if (a.host == b.host && a.port == b.port) return !0; b = a.protocol == 'http:' ? 80 : 443; return a.host ==
'www.google-analytics.com' && (a.port || b) == b && D(a.path, '/plugins/') ? !0 : !1;
    },
    ae = function (a) {
      function b(a) {
        let b = a.hostname || '',
          c = b.indexOf(']') >= 0; b = b.split(c ? ']' : ':')[0].toLowerCase(); c && (b += ']'); c = (a.protocol || '').toLowerCase(); c = 1 * a.port || (c == 'http:' ? 80 : c == 'https:' ? 443 : ''); a = a.pathname || ''; D(a, '/') || (a = `/${a}`); return [b, `${c}`, a];
      } const c = M.createElement('a'); c.href = M.location.href; let d = (c.protocol || '').toLowerCase(),
        e = b(c),
        g = c.search || '',
        ca = `${d}//${e[0]}${e[1] ? `:${e[1]}` : ''}`; D(a, '//') ? a = d + a : D(a, '/') ? a = ca + a : !a || D(a, '?') ? a = ca + e[2] +
(a || g) : a.split('/')[0].indexOf(':') < 0 && (a = `${ca + e[2].substring(0, e[2].lastIndexOf('/'))}/${a}`); c.href = a; d = b(c); return {
        protocol: (c.protocol || '').toLowerCase(), host: d[0], port: d[1], path: d[2], query: c.search || '', url: a || '',
      };
    }; var Z = { ga() { Z.f = []; } }; Z.ga(); Z.D = function (a) { let b = Z.J(...arguments); b = Z.f.concat(b); for (Z.f = []; b.length > 0 && !Z.v(b[0]) && !(b.shift(), Z.f.length > 0););Z.f = Z.f.concat(b); }; Z.J = function (a) { for (var b = [], c = 0; c < arguments.length; c++) try { const d = new sc(arguments[c]); d.g ? C(d.a[0], d.a[1]) : (d.i && (d.ha = y(d.c, d.a[0], d.X, d.W)), b.push(d)); } catch (e) {} return b; };
  Z.v = function (a) {
    try {
      if (a.u)a.u.call(O, N.j('t0')); else {
        let b = a.c == gb ? N : N.j(a.c); if (a.A) { if (a.c == 't0' && (b = N.create(...a.a), b === null)) return !0; } else if (a.ba)N.remove(a.c); else if (b) {
          if (a.i) { if (a.ha && (a.ha = y(a.c, a.a[0], a.X, a.W)), !u(a.a[0], b, a.W)) return !0; } else if (a.K) {
            let c = a.C,
              d = a.a,
              e = b.plugins_.get(a.K); e[c](...d);
          } else b[a.C](...a.a);
        }
      }
    } catch (g) {}
  }; var N = function (a) { J(1); Z.D.apply(Z, [arguments]); }; N.h = {}; N.P = []; N.L = 0; N.ya = 0; N.answer = 42; const uc = [Na, W, V]; N.create = function (a) { let b = za(uc, [].slice.call(arguments)); b[V] || (b[V] = 't0'); const c = `${b[V]}`; if (N.h[c]) return N.h[c]; if (da(b)) return null; b = new pc(b); N.h[c] = b; N.P.push(b); return b; }; N.remove = function (a) { for (let b = 0; b < N.P.length; b++) if (N.P[b].get(V) == a) { N.P.splice(b, 1); N.h[a] = null; break; } }; N.j = function (a) { return N.h[a]; }; N.getAll = function () { return N.P.slice(0); };
  N.N = function () {
    gb != 'ga' && J(49); let a = O[gb]; if (!a || a.answer != 42) {
      N.L = a && a.l; N.ya = 1 * new Date(); N.loaded = !0; let b = O[gb] = N; X('create', b, b.create); X('remove', b, b.remove); X('getByName', b, b.j, 5); X('getAll', b, b.getAll, 6); b = pc.prototype; X('get', b, b.get, 7); X('set', b, b.set, 4); X('send', b, b.send); X('requireSync', b, b.ma); b = Ya.prototype; X('get', b, b.get); X('set', b, b.set); if (M.location.protocol != 'https:' && !Ba) {
        a: {
          b = M.getElementsByTagName('script'); for (let c = 0; c < b.length && c < 100; c++) {
            const d = b[c].src; if (d && d.indexOf('https://www.google-analytics.com/analytics') == 0) {
              b =
!0; break a;
            }
          }b = !1;
        }b && (Ba = !0);
      }(O.gaplugins = O.gaplugins || {}).Linker = Dc; b = Dc.prototype; C('linker', Dc); X('decorate', b, b.ca, 20); X('autoLink', b, b.S, 25); C('displayfeatures', fd); C('adfeatures', fd); a = a && a.q; ka(a) ? Z.D.apply(N, a) : J(50);
    }
  }; N.da = function () { for (let a = N.getAll(), b = 0; b < a.length; b++)a[b].get(V); }; let Nd = N.N,
    te = O[gb]; te && te.r ? Nd() : z(Nd); z(() => { Z.D(['provide', 'render', ua]); });
}(window));
