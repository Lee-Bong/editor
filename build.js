const fs = require('fs');
const views = fs.readdirSync(`${__dirname}/dist/`);

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
      const shell = 'cd dist/view/ && zip -qrd view11.zip . && cd -';
      require('child_process').exec(shell);
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

