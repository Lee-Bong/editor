export default {
  state: {
    phoneWidth: 375,
    phoneHeight: 667,
    layoutKey: 0, // 层级管理，从0累加
    dragTexts: [], // 组件-文本
    dragImages: [], // 组件-图片
    dragLinks: [], // 热区
    dragImgLists: [], // 多图
    dragAudios: [], // 音频
    dragVideos: [], // 视频
    textActive: 0, // 当前活跃组件
    linkActive: 0,
    imgActive: 0,
    imgListActive: 0,
    audioActive: 0,
    videoActive: 0,
    textSet: false, // 是否显示文本设置
    isTextSet: false, // 是否显示文本设置
    imgSet: false,
    isImgSet: false,
    imgListSet: false,
    isImgListSet: false,
    videoSet: false, // 是否显示视频设置
    isVideoSet: false,
    audioSet: false, // 是否显示音频设置
    isAudioSet: false,
    linkSet: false, // 是否显示热区设置
    isLinkSet: false, // 是否显示文本设置
    layerLists: [], // 图层管理,
    layerActive: 0, // 值为-1表示当前没有任何激活图层
    typeCat: {
      1: ['dragTexts', 'textSet', 'isTextSet', 'textActive'],
      2: ['dragImages', 'imgSet', 'isImgSet', 'imgActive'],
      3: ['dragLinks', 'linkSet', 'isLinkSet', 'linkActive'],
      4: ['dragImgLists', 'imgListSet', 'isImgListSet', 'imgListActive'],
      5: ['dragVideos', 'videoSet', 'isVideoSet', 'videoActive'],
      6: ['dragAudios', 'audioSet', 'isAudioSet', 'audioActive'],
    },
    pageSet: true,
    mediaHeight: 300,
  },
};
