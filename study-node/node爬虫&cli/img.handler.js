const superagent = require("superagent");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const cliProgress = require("cli-progress");

const bar = new cliProgress.SingleBar(
  {
    clearOnComplete: false,
  },
  cliProgress.Presets.shades_classic
);

let total = 0;
let finished = 0;

const word = "柯基";

const header = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.01,image/avif,iamge/webp,image/apng,*/*;q=0.02,application/signed-exchange;v=b3;q=0.01",
  "Accept-Encoding": "gzip, deflat, br",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  "Cache-Control": "max-age=0",
  Connection: "keep-alive",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
  "sec-ch-ua":
    '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
};

function getValueListByReg(str, key) {
  const reg = new RegExp(`"${key}":"(.*?)"`, "g");
  const matchResult = str.match(reg);

  const resultList = matchResult.map((item) => {
    const result = item.match(/:"(.*?)"/g);
    return RegExp.$1;
  });

  return resultList;
}

function mkImageDir(pathname) {
  const fullPath = path.resolve(__dirname, pathname);

  if (fs.existsSync(fullPath)) {
    // console.log(`${pathname}已经存在，跳过此步骤`);
    // return;
    removeDir(fullPath);
  }

  fs.mkdirSync(fullPath);
  console.log("目录创建成功！目录为" + pathname);
}

function removeDir(pathname) {
  const fullPath = path.resolve(__dirname, pathname);
  console.log(`${pathname}已经存在，准备执行删除`);

  fs.rmdirSync(fullPath, {
    force: true,
    recursive: true,
  });

  console.log(`目录${pathname}已经删除`);

  // const process = require('child_process')
  // process.execSync(`rm -rf ${fullPath}`)
}

function downloadImage(url, name, index) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(
      __dirname,
      "images",
      `${index + 1}.${name.replace("?", "").replace("|", "")}.png`
    );
    if (fs.existsSync(fullPath)) {
      console.log("图片已经存在", fullPath);
      return reject("图片已经存在" + fullPath);
    }

    superagent.get(url).end((err, res) => {
      if (err) {
        console.log(`链接获取错误，错误信息为：${err}`);
        return reject(`链接获取错误，错误信息为：${err}`);
      }
      if (JSON.stringify(res.body) === "{}") {
        console.log(`第${index + 1}张图内容为空`);
        return reject(`第${index + 1}张图内容为空`);
      }

      fs.writeFile(fullPath, res.body, "binary", (err) => {
        if (err) {
          console.log(`第${index + 1}张图下载失败！`);
          return reject(`第${index + 1}张图下载失败！`);
        }
        return resolve(`第${index + 1}张图片下载成功！`);
      });
    });
  });
}

function request(url) {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .set("Accept", header["Accept"])
      .set("Accept-Encoding", header["Accept-Encoding"])
      .set("Accept-Language", header["Accept-Language"])
      .set("Cache-Control", header["Cache-Control"])
      .set("Connection", header["Connection"])
      .set("User-Agent", header["User-Agent"])
      .set("sec-ch-ua", header["sec-ch-ua"])
      .end((err, res) => {
        if (err) {
          console.log("访问出错，错误原因是：", err);
          reject(err);
        }

        resolve(res);
      });
  });
}

function runImg(keyword, counts) {
  request(
    `http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(
      keyword
    )}`
  ).then(async (res) => {
    const htmlText = res.text;
    // console.log(htmlText);
    // const $ = cheerio.load(htmlText);

    // $("meta").each((index, ele) => {
    //   console.log(`${index}: ${$(ele).attr("content")}`);
    // });

    const imageUrlList = getValueListByReg(htmlText, "objURL");
    const titleList = getValueListByReg(htmlText, "fromPageTitle").map((item) =>
      item.replace("<strong>", "").replace("<\\/strong>", "")
    );

    // const imageMatches = htmlText.match(/"objURL":"(.*?)",/g);
    // // "objURL": "XXXXXX"
    // const imageUrlList = imageMatches.map((item) => {
    //   const imageUrl = item.match(/:"(.*?)"/g);
    //   return RegExp.$1;
    // });

    // const titleMatches = htmlText.match(/"fromPageTitle":"(.*?)",/g);
    // const titleList = titleMatches.map((item) => {
    //   const title = item.match(/:"(.*?)"/g);
    //   return RegExp.$1;
    // });

    let allImageUrls = imageUrlList.map((imageUrl, index) => {
      return {
        imageUrl,
        title: titleList[index],
      };
    });

    const firstPageCount = allImageUrls.length;

    if (counts > firstPageCount) {
      const restImgUrls = await getImageByPage(firstPageCount, counts, keyword);
      const formatImgUrls = restImgUrls
        .filter((item) => item.middleURL)
        .map((item) => {
          return {
            imageUrl: item.middleURL,
            title: item.fromPageTitle
              .replace("<strong>", "")
              .replace("</strong>", ""),
          };
        });

      allImageUrls = allImageUrls.concat(formatImgUrls);
    }

    // console.log(imageUrlList);
    // console.log(titleList);
    total = allImageUrls.length;

    try {
      await mkImageDir("images");

      bar.start(total, 0);

      imageUrlList.forEach((url, index) => {
        downloadImage(url, titleList[index], index)
          .then(() => {
            finished++;
            bar.update(finished);
          })
          .then(() => {
            if (finished === total) {
              bar.stop();
              console.log("恭喜，图片下载成功");
            }
          })
          .catch(() => {
            finished++;
            bar.update();
            console.log(`第${index + 1}张图出错`);
            if (finished === total) {
              bar.stop();
              console.log("恭喜，图片下载成功");
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  });
}

async function getImageByPage(start, total, word) {
  let allImages = [];

  while (start < total) {
    const size = Math.min(60, total - start);
    const res = await request(
      `http://image.baidu.com/search/acjson?tn=resultjson_com&word=${encodeURIComponent(
        word
      )}&queryWord=${encodeURIComponent(
        word
      )}&ie=utf-8&oe=utf-8&pn=${start}&rm=${size}&${Date.now()}=`,
      "Accept2"
    );

    allImages = allImages.concat(JSON.parse(res.text).data);
    start += size;
  }

  return allImages;
}

module.exports = {
  runImg,
};
