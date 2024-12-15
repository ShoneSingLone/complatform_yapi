const ApiUser = require('../api/User');

module.exports = {
  definitions: {
    UserAvatar: {
      type: 'string',
      format: 'binary'
    }
  },
  tag: {
    description: '用户信息'
  },
  paths: {
    '/reg': ApiUser.paths['/user/reg'],
    '/login': ApiUser.paths['/user/login'],
    '/logout': ApiUser.paths['/user/logout'],
    '/user/new_varify_code': ApiUser.paths['/user/new_varify_code'],
    '/user/search': ApiUser.paths['/user/search'],
  }
};
