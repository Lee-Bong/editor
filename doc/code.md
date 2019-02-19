##  欢乐小游戏地址
https://bfe.meiyou.com/we/view?page_id=c98d3d76-1070-4f18-b568-5aa818038455&public=1&is_share=1&avater=219113733&name=%E5%B0%8F%E6%9F%9A%E5%AD%90

### 参数说明：
 is_share=1是否是站外地址
avater：用户id
name：用户名（记得解码） 

### 自定义代码：
> if (sdk.isMeetyouWebview) {
    $('#fdzeclgdnz').remove();
} else {
        const imgSrc = `${window.location.protocol}//sc.seeyouyima.com/avatar_${sdk.query.id}?imageView/1/w/120/h/120/q/100/${sdk.query.id}`;
        const urlName = decodeURIComponent(sdk.query.name);
        const name = urlName !== 'undefined' ? urlName : '小柚子'
        const top = parseInt($('#fdzeclgdnz').parent().css('top')) + 48*sdk.scale;
        const top1 = top + 4;
        const top2 = top + 4+11;
        const avaterImg = `<img id="${sdk.query.page_id}id" src=${imgSrc} style="width: 40px;height: 40px;z-index: 1001;overflow: hidden;border:0;border-radius: 100%;border-radius: 80px;margin:4px;"/><div style="z-index: 1001;text-align: center;color: #fff;font-size: 12px;width: 100%;margin-top: 8px">${name}</div>`;
        const avaterWrap = `<div style="width: 100%;height: 90px;text-align: center;position: absolute;top:${top}px;z-index: 100;"><div class="bg" style="width: 48px;height:48px;border-radius: 100%;overflow:hidden;background:rgba(255,255,255,1);opacity:0.2;position:absolute;top:0;left:50%;margin-left: -24px"></div>${avaterImg}<div>`;
        $('body').append(avaterWrap);
        document.getElementById(`${sdk.query.page_id}id`).addEventListener("error", ()=> {
        $(`#${sdk.query.page_id}id`).attr('src', `${window.location.protocol}//sc.seeyouyima.com/bfe/we/412e7ca84986aeb2871f74b7ef2a62bb.png`);
    }); 
}