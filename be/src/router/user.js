const {
  login,
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model');
const { set, del } = require('../db/redis');

// 过期时间
const getExpiresTime = () => {
  const expireTime = Date.now() + (24 * 60 * 60 * 1000);
  const time = new Date(expireTime);
  return time.toGMTString();
}

const handleUserRoute = (req, res) => {
  const method = req.method;
  // 登录路由
  if (method === 'POST' && req.path === '/user/login') {
    const username = req.body.username || '';
    const password = req.body.password || '';
    return login(username, password).then(data => {
      const user = data[0] || {};
      if (user.username) {
        set('username', user.username).then(res => {
          console.log('将session成功写入redis- ', res);
        })
        // res.setHeader('Set-Cookie', `username=${user.username}; path=/; httpOnly; expires=${getExpiresTime()}`);
        return new SuccessModel({ token: 'username' }, '登录成功');
      } else {
        return new ErrorModel('登录失败');
      }
    });
  }
  // 登出路由
  if (method === 'POST' && req.path === '/user/logout') {
    return del('username').then(data => {
      console.log(data);
      return new SuccessModel('退出成功');
    }).catch(err => {
      return new ErrorModel('退出失败');
    });
  }
}

module.exports = handleUserRoute;