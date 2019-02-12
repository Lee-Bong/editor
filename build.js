const fs = require('fs');
const views = fs.readdirSync(`${__dirname}/dist/`);
const now = new Date;
const buildAt = now.toLocaleString();
// step 1
if (!views.includes('view')) {
  fs.mkdir(`${__dirname}/dist/view`, 0777, (err) => {});
  // step2 生成config.json
  const config = JSON.stringify({
    'we/view': {
    index: 'view.html',
    api: '',
    buildAt,
  }});
  fs.writeFile(`${__dirname}/dist/view/config.json`, config, (err) => {
    if (err) {
      console.log('write config.json fail');
    } else {
      console.log('success');
    }
  });
}

const buildFiles = () => {
  try {
    views.map((item) => {
      if (item !== 'view' && item.indexOf('admin') === -1) {
        const curDir = `${__dirname}/dist/${item}`;
        const afterDir = `${__dirname}/dist/view/${item}`;
        traveFiles(curDir, afterDir, copeFiles);
      }
    });
    setTimeout(() => {
      console.log('build zip');
      const shell = 'cd dist/view/ && zip -qr view.zip . && cd -';
      require('child_process').exec(shell);
      // 移动zip到dist目录
      fs.renameSync(`${__dirname}/dist/view/view.zip`, `${__dirname}/dist/view.zip`)
      // 移除view目录 todo 需要遍历删除，空目录才可以删除
      // fs.rmdirSync(`${__dirname}/dist/view/`);
    }, 3000);
  } catch (e) {
    console.log('build fail');
  }
}

const copy = (src, dst) => {
  const data = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dst, data);
}
const copeFiles = (be, af) => {
  copy(be, af);
}

const traveFiles = (curDir, afterDir, callback) => {
  if (curDir !== 'view' && curDir.indexOf('admin') === -1) {
    fs.stat(curDir, function (err, stats) {
      const isDor = stats.isDirectory();
      if (!isDor) {
        callback(curDir, afterDir);
      } else {
        fs.mkdir(afterDir, 0777, (err) => {
          if (!err) {
            const files = fs.readdirSync(`${curDir}`);
            console.log('files', files);
            files.map((ele) => {
              traveFiles(`${curDir}/${ele}`, `${afterDir}/${ele}`, callback);
            });
          }
        });
      }
    });
  }
}

console.log('Runing webpack build.');
buildFiles();

