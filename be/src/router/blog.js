const {
  getList,
  getDetail,
  addBlog,
  deleteBlog,
  updateBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model');

const handleBlogRoute = (req, res) => {
  const method = req.method;
  
  // 博客列表路由
  if (method === 'GET' && req.path === '/blog/getList') {
    const author = req.body.author || '';
    const keyword = req.query.keyword || '';
    const pageSize = req.query.pageSize || 10;
    const pageNo = req.query.pageNo || 1;
    return getList(author, keyword, pageNo, pageSize).then(data => {
      const json = {
        list: [],
        total: 0,
      }
      if (data.length) {
        json.total = data[0].total;
        json.list = data.map(item => {
          delete item.total;
          return item;
        });
      }
      return new SuccessModel(json);
    });
  }

  // 博客详情路由
  if (method === 'GET' && req.path === '/blog/getDetail') {
    const id = req.query.id || '';
    return getDetail(id).then(data => {
      if (data[0].author) {
        return new SuccessModel(data[0]);
      } else {
        return new ErrorModel('获取博客详情失败');
      }
    })
  }

  // 新增博客路由
  if (method === 'POST' && req.path === '/blog/add') {
    const title = req.body.title || '';
    const content = req.body.content || '';
    const author = req.body.author || '';
    return addBlog(author, title, content).then(data => {
      if (data.insertId) {
        return new SuccessModel('添加博客成功');
      } else {
        return new ErrorModel('添加博客失败');
      }
    })
  }

  // 更新博客路由
  if (method === 'POST' && req.path === '/blog/update') {
    const id = req.body.id || '';
    const title = req.body.title || '';
    const content = req.body.content || '';
    return updateBlog(id, title, content).then(data => {
      if (data.affectedRows > 0) {
        return new SuccessModel('更新博客成功');
      } else {
        return new ErrorModel('更新博客失败');
      }
    });
  }

  // 删除博客路由
  if (method === 'POST' && req.path === '/blog/delete') {
    const id = req.body.id || '';
    return deleteBlog(id).then(data => {
      if (data.affectedRows > 0) {
        return new SuccessModel('删除博客成功');
      } else {
        return new ErrorModel('删除博客失败');
      }
    });
  }
}

module.exports = handleBlogRoute;