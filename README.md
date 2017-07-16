## 启动项目
+ 克隆 `git clone git@github.com:dj940212/baby-server.git`
+ 安装依赖 `npm install`
+ 启动MongoDB 数据库
+ 运行 `node app`
+ 查看 `http://localhost:1234`

## 接口
+ 获取七牛上传签名
`http://localhost:1234/api/signature`
body:
{
    type: video/photo,
    accessToken: accessToken
}

+ 保存视频&照片信息
`http://localhost:1234/api/photoVideo/save`
body:
{
    accessToken: accessToken,
    type: video/photo
}

+ 获取视频照片列表
`http://localhost:1234/api/photoVideo/list`
query:
{
    accessToken: accessToken,
}
