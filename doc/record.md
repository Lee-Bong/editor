## 编辑器

+ zIndex管理  
同类型组件，zindex的创建按照顺利，从0开始累加，
当前点击的组件，zindex: 1000
当前组件的设置面板： zindex: 1001

drag: index: 图层zIndex(决定最终生成)
listIndex: 该组件在组件数组里面的序列
zIndex: 作用于展示的zIndex

###  交互文档地址

https://axhub.im/pro/2aa8447594400b26  密码：meiyou123
新交互地址：
https://axhub.im/pro/b3ca8072ecf0a0d8/#g=1&p=%E5%B0%81%E9%9D%A2  密码：meiyou123


###  API
短信验证
http://apidoc.seeyouyima.com/edit/5c00a0363b82db1c76e4443c

### ga统计
### 站内使用协议上报 

    > const params = {
      page_id: '82ec-b5f959276113', // page_id
      type: 'pv|click|share', // 统计类型
      value: 'event_id'  // 触发元素 ID,
      label: '',
      category: ''
    };
    jssdk.callNative('ga', {
      '/bfe_event',
      params,
    });

### 站外用接口统计
https://ga.seeyouyima.com/bfe_event
method: post

> ga统计上报注意： 注意不要上报中文参试

> 验证
注意因为ga只统计正式环境数据，要验证测试环境的数据准确性，就需要将测试数据的统计数据上报到正式环境。
实用ios 测试包摇一摇，切换到正式环境，用扫一扫，扫扫描测试的网页，操作上报数据
核对上报数据无误（上报参数跟上报地址无误），从平台的数据管理页点击【查看报表进入】，目前不要通过刷新查看，因为热区名称是从上个页面带入，但是后期功能加强，这个就可以避免

### 一些交互说明

1.表单-单项/多项 选择 

选项至少一个，初始化默认一个，超出一个才显示删除按钮
不限制选项添加个数，当添加项目超出面板，需要用户自行拖动面板高度，代码不自动

## url参数说明
h5: query 
  is_formal=1网页已发布状态，预览的页面没有该参数
  mywtb_name=h5_editor 采用静态模版化

判断一个网页是否被删除：
发布： public !== ''
上线： visible: true
下线： visible: false
删除： public === ''
h5判断页面状态

发布过的页面： this.$route.is_formal && （!visible || !public） （visible: false只表示线上数据被下线）
草稿： !this.$route.is_formal && !draft

http://static.seeyouyima.com/bfe/we/view-23b0b741.9aa8e005.zip

## 命名规范
css命名规范
css 类名使用的是BEM命名规范，
元素命名形式:ew-right-bar_contnet--active
ew是项目前缀，跟elemnt ui的el区分开来，ew-right-bar代表block，_contnet 内部元素 --active 状态／版本
不是全部的命名都需要使用BEM，如果元素的外部块不定，通用元素，就用普通的命名规范
普通命名规范：
ew-logo
js命名规范
变量、函数使用小驼峰，变量前缀使用名次，函数前缀使用动词
私有变量开头加下划线
常量 使用大写字母和下划线来组合命名，下划线用以分割单词
类，构造函数： 大驼峰式命名法，首字母大写，名词前缀
公共属性和方法：跟变量和函数的命名一样。
私有属性和方法：前缀为_(下划线)，后面跟公共属性和方法一样的命名方式

1 UI组件/基础组件
    开发的时候注意可拓展性，支持数据传参进行渲染，支持插槽slot
    设置有mixin，mixin中放了基础信息和方法
    2 容器组件
    和当前业务耦合性比较高，由多个基础组件组成，可承载当前页的业务接口请求和数据(vuex)
    3 组件存放位置
    1）ui组件存放在src/components/ 中
    包含xxx.vue和 xxmixin.js 和 readme.md。
   （2）业务组件就放在业务模块部分即可
图片命名：
图片名称_图片作用
blueArrow_icon

注释说明：
/* TODO: xxxx by name 2013-04-13 18:32 *//* BUGFIX: xxxx by name
