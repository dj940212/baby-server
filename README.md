openid: onUjx0FxeSU2-w4WFkVeTGNVLkbQ

## 启动项目
#### 克隆 
>git clone git@github.com:dj940212/baby-server.git
#### 安装依赖 
>npm install
#### 运行 
>node app

## 接口目录

[1、手机号注册](#1手机号注册)<br/>
[2、验证码验证](#2验证码验证)<br/>
[3、用户信息更新](#3用户信息更新)<br/>
[4、获取七牛上传签名](#4获取七牛上传签名)<br/>
[5、获取视频照片列表](#5获取视频照片列表)<br/>

## 接口列表

### 1、手机号注册

#### 请求URL
```
http://localhost:1234/api/u/signup
```

#### 示例: 

#### 请求方式
```
POST
```

#### 参数类型：param
| 参数        | 是否必选 | 类型    | 说明     |
| :------:    | :------: | :-----: | :------: |
| phoneNumber | Y        | string  | 手机号   |

#### 返回示例
> 成功
```javascript
{
    success: true
}
```

>失败
```javascript
{
  success: false,
  err: '短信服务异常'
}
```

### 2、验证码验证

#### 请求URL
```
http://localhost:1234/api/u/verify
```

#### 示例: 

#### 请求方式
```
POST
```

#### 参数类型：param
| 参数        | 是否必选 | 类型    | 说明       |
| :------:    | :------: | :-----: | :------:   |
| verifyCode  | Y        | String  | 短信验证码 |
| phoneNumber | Y        | String  | 手机号     |

#### 返回示例

> 成功

```javascript
{
      success: true,
      data: {
        nickname: user.nickname,
        accessToken: user.accessToken,
        avatar: user.avatar,
        _id: user._id
      }
}
```

>失败

```javascript
{
  success: false,
  err: '验证未通过'
}
```

### 3、用户信息更新

#### 请求URL
```
http://localhost:1234/api/u/update
```

#### 示例: 

#### 请求方式
```
POST
```

#### 参数类型：param
| 参数        | 是否必选 | 类型    | 说明     |
| :------:    | :------: | :-----: | :------: |
| accessToken | Y        | String  | 用户签名 |
| avatar      | N        | String  | 头像     |
| gender      | N        | String  | 性别     |
| age         | N        | String  | 年龄     |
| nickname    | N        | String  | 昵称     |
| breed       | N        | String  | 品种     |

#### 返回示例

> 成功

```javascript
{
      nickname: user.nickname,
      accessToken: user.accessToken,
      avatar: user.avatar,
      age: user.age,
      breed: user.breed,
      gender: user.gender,
      _id: user._id
}
```

>失败

```javascript
{
  success: false,
  err: '验证未通过'
}
```

### 4、获取七牛上传签名

#### 请求URL
```
http://localhost:1234/api/signature
```

#### 示例:

#### 请求方式
```
POST
```

#### 参数类型：param
| 参数        | 是否必选 | 类型    | 说明        |
| :------:    | :------: | :-----: | :------:    |
| type        | Y        | string  | photo/video |
| accessToken | Y        | string  | 用户签名    |

#### 返回示例
```javascript
{
    success: true,
    data: {
        uptoken: "489cc410-13a9-4a0a-a73d-33fb0f2e3a6e"
    }
}
```

### 5、获取视频照片列表

#### 请求URL
```
http://localhost:1234/api/photoVideo/list
```

#### 示例:
```
[http://localhost:1234/api/photoVideo/list?accessToken=489cc410-13a9-4a0a-a73d-33fb0f2e3a6e](http://localhost:1234/api/photoVideo/list?accessToken=489cc410-13a9-4a0a-a73d-33fb0f2e3a6e)
```
#### 请求方式
```
GET
```

#### 参数类型：query
| 参数        | 是否必选 | 类型    | 说明     |
| :------:    | :------: | :-----: | :------: |
| accessToken | Y        | string  | 用户签名 |

#### 返回示例
```javascript
{
    "_id" : ObjectId("596ff7a91220820478a4a2f8"),
    "meta" : {
        "createAt" : ISODate("2017-07-20T00:22:01.850Z"),
        "updateAt" : ISODate("2017-07-20T00:22:01.850Z")
    },
    "content" : "",
    "height" : "undefined",
    "width" : "undefined",
    "thumbnailUrl" : "",
    "photoVideoUrl" : [ 
        "http://ot2nmqx5r.bkt.clouddn.com/tmp_1984021442o6zAJs0qJDggmNsKmIogeSi9wsLQ5de985869890920dd4cc6486f0cf860d.jpg", 
        "http://ot2nmqx5r.bkt.clouddn.com/tmp_1984021442o6zAJs0qJDggmNsKmIogeSi9wsLQecaa0c545130942d471eb85919e36405.jpg"
    ],
    "type" : "photo",
    "id" : "id_5ea468e9-30cc-460f-a238-5e884c64044b",
    "__v" : 0
}

```
