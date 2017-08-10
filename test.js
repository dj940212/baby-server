// 登录验证
exports.register = function *(next) {
  var jscode = this.request.body.jscode
  var nickname = this.request.body.nickname

  axios.get('https://api.weixin.qq.com/sns/jscode2session',{
    params: {
      appid: 'wx0cabd8483ff83d59',
      secret: '67095a452704f90ce9d890c269ebac72',
      js_code: jscode,
      grant_type: authorization_code
    }
  }).then(function(response) {
    var openid = response.openid 
    var user = yield User.findOne({openid: openid})
    if (!user) {
      user = new User({
        openid: openid,
        nickname: nickname,
        authorization: false
      })
    }else{
      this.body = {
        message: "用户已注册"
      }
    }

    try {
      user = yield user.save()
    }
    catch (e) {
      this.body = {
        err: '保存失败'
      }
      return next
    }
    this.body = {
      success: '保存成功',
      nickname: nickname
    }
  })
  .catch(function (error) {
    console.log(error);
  })
}