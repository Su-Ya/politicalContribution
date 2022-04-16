#!/usr/bin/env sh

# 當發生錯誤時終止腳本運行
set -e

# 打包
npm run build

# 移動至到打包後的 dist 目錄 
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

# 因為 dist 資料夾預設是被 ignore 的，因此在進入 dist 資料夾後初始化 git
git init
git checkout -b main
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Su-Ya/political-contribution.git main:gh-pages

cd -