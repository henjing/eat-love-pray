## 下载项目

1) 使用git方式 git clone https://github.com/henjing/eat-love-pray.git
2) 直接下载Zip包

## 安装项目

执行 npm install 安装 项目依赖

## 运行

执行 npm run dev

## 打包

执行 npm run build

build的路径需要根据个人情况来修改：

```js
const exec = require('child_process').exec;
const CDN = '/static';

// build的路径
let huangXingBin = {
    html: '/Users/gttx/Documents/6464/root/application/index/view/',
    resources: '/Users/gttx/Documents/6464/root/public/static/'
};
let huangEnJing = {
    html: '/Users/enjing/Documents/myWebProject/heshi/heshi_api/application/index/view/',
    resources: '/Users/enjing/Documents/myWebProject/heshi/heshi_api/public/static/'
};
let qinHaiLang = {
    html: '/Users/qhl/svn/heshi/application/index/view/',
    resources: '/Users/qhl/svn/heshi/public/static/'
};
let luYuQiu = {
	html: '../kongdian_hs/application/index/view/',
	resources: '../kongdian_hs/public/static/'
};

// 以上是不同开发人员的build路径，你需要根据自己的情况来改

let targetRoute = huangEnJing; // 需要build到哪个路径就把它赋值给这个变量

```

## git使用

1）通用的的git提交流程：

第一步：git status，查看本地git仓库状态
第二步：git add *
第三步：git commit -m "your comment"
第四步：git pull origin master (或者origin的其它分支)
第五步（重要）：git checkout [<commit>] -- gulpfile.js (恢复gulpfile.js至你的本地版本）
第六步：解决冲突,然后 git add * => git commit -m "your merge comment"
第七步：git push origin master (或者origin的其它分支)

2) 解除git对某个文件的版本控制：

在第四步以后，第六步之前执行：

git rm --cached -rf src/css/maps
rm src/css/maps

git rm --cached -rf src/tmp
rm src/tmp
