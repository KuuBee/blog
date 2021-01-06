echo 开始打包
npm run build
echo 打包完成
echo 开始部署
echo 开始连接服务器。。。
ssh aili -t << EOF
echo 连接成功
cd /home/fontend/
ls
echo 删除文件
rm -rf ./ng-blog
exit
EOF
echo 删除成功
echo 开始上传文件
scp -r /Users/kuubee/Desktop/self_porject/fontend/ng-blog/dist/ng-blog aili:/home/fontend
echo 部署完成