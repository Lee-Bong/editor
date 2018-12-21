##  欢乐小游戏地址
https://bfe.meiyou.com/we/view?page_id=c98d3d76-1070-4f18-b568-5aa818038455&public=1&is_share=1&avater=219113733&name=%E5%B0%8F%E6%9F%9A%E5%AD%90

### 参数说明：
 is_share=1是否是站外地址
avater：用户id
name：用户名（记得解码）

### 自定义代码：
>   if (!sdk.query.is_share) {
    $('#fdzeclgdnz').remove();
    } else {
    const imgSrc = `${window.location.protocol}//sc.seeyouyima.com/avatar_${sdk.query.avater}?imageView/1/w/120/h/120/q/100/${sdk.query.avater}`;
    const name = decodeURIComponent(sdk.query.name);
    const top = parseInt($('#fdzeclgdnz').parent().css('top')) + 48*sdk.scale;
    const top1 = top + 4;
    const top2 = top + 4+11;
    const img = `<div style="width: 40px;height: 40px;background:#fff url(${imgSrc}) center center/cover;z-index: 1001;overflow: hidden;border:0;border-radius: 100%;border-radius: 80px;margin:4px;"></div><div style="z-index: 100;text-align: center;color: #fff;position: absolute; top: ${top2}px;font-size: 12px;width: 100%;">${name}</div>`;
    const avaterWrap = `<div style="width: 48px;height: 48px;border-radius:100%;overflow:hidden;position: absolute;top: ${top}px;left:50%;margin-left:-24px;z-index: 100;"><div class="bg" style="width: 100%;height:100%;overflow:hidden;background:rgba(255,255,255,1);opacity:0.2;position:absolute;top:0;left:0;"></div>${img}<div>`;


    $('body').append(avaterWrap);
    }
