import service from './service';

// 获取设置
export function getSettingItems(name) {
  return service({
    url: `/sys_setting/items?name=${name}`,
    method: 'get',
  });
}

// 获取用户数据
export function getUserList() {
  return service({
    url: '/all_users',
    method: 'get',
  });
}

// 获取评论数据
export function getCommentList(params) {
  return service({
    url: '/comments',
    method: 'get',
    params: params,
  });
}

// 发表评论
export function publishComment(data) {
  return service({
    url: '/comments',
    method: 'post',
    data: data,
  });
}
