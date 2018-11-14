const ua = navigator.userAgent;
const isWeixin = !!ua.match(/MicroMessenger/i);
const isAndroid = !!ua.match(/Android|Adr/i);
const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const isInApp = !!ua.match(/MeetYouClient/i);

export { ua, isWeixin, isAndroid, isIOS, isInApp };
