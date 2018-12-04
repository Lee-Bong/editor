export default {
  state: {
    layoutKey: 1, // 层级管理，从1累加
    dragTexts: [], // 组件-文本
    dragImages: [], // 组件-图片
    dragLinks: [], // 热区
    dragImgLists: [], // 多图
    dragAudios: [], // 音频
    dragVideos: [], // 视频
    dragFormTexts: [], // 表单-单行文本
    dragFormTextareas: [], // 表单-多行文本
    dragFormRadios: [], // 表单-单项选择
    dragFormCheckboxs: [], // 表单-多项选择
    dragFormSmscodes: [], // 表单-手机短信
    dragFormSubmits: [], // 表单-提交按钮
    textActive: 0, // 当前活跃组件
    linkActive: 0,
    imgActive: 0,
    imgListActive: 0,
    audioActive: 0,
    videoActive: 0,
    fTextActive: 0,
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
    fTextSet: false,
    isFTextSet: false,
    fTextareaSet: false,
    isFTextareaSet: false,
    fRadioSet: false,
    isFRadioSet: false,
    fCheckboxSet: false,
    isFCheckboxSet: false,
    fSmsSet: false,
    isFSmsSet: false,
    fSubmitSet: false,
    isFSubmitSet: false,
    layerLists: [], // 图层管理,
    layerActive: 0, // 值为-1表示当前没有任何激活图层
    typeCat: {
      1: ['dragTexts', 'textSet', 'isTextSet', 'textActive'],
      2: ['dragImages', 'imgSet', 'isImgSet', 'imgActive'],
      3: ['dragLinks', 'linkSet', 'isLinkSet', 'linkActive'],
      4: ['dragImgLists', 'imgListSet', 'isImgListSet', 'imgListActive'],
      5: ['dragVideos', 'videoSet', 'isVideoSet', 'videoActive'],
      6: ['dragAudios', 'audioSet', 'isAudioSet', 'audioActive'],
      7: ['dragFormTexts', 'fTextSet', 'isFTextSet', 'fTextActive'],
      8: ['dragFormTextareas', 'fTextareaSet', 'isFTextareaSet', 'fTextareaActive'],
      9: ['dragFormRadios', 'fRadioSet', 'isFRadioSet', 'fRadioActive'],
      10: ['dragFormCheckboxs', 'fCheckboxSet', 'isFCheckboxSet', 'fCheckboxActive'],
      11: ['dragFormSmscodes', 'fSmsSet', 'isFSmsSet', 'fSmsActive'],
      12: ['dragFormSubmits', 'fSubmitSet', 'isFSubmitSet', 'fSubmitActive'],
    },
    pageSet: true,
    mediaHeight: 300,
    audioHeight: 82,
    isSubmit: true, // 是否可以添加提交按钮，一个页面目前最多只能添加一个
    isPhone: true, // 是否可以添加提交按钮，一个页面目前最多只能添加一个
  },
};
