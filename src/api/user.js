import request from '../util/request'

export const findUser = (query) => {
  return request({
    url: '/system/tb-user/',
    method: 'get',
    params: query
  })
}

export const list = (query) => {
  return request({
    url: '/system/tb-user/list',
    method: 'get',
    params: query
  })
}

//  添加
export const addFile = (TbUser) => {
  return request({
    url: '/system/tb-user/addUser',
    method: 'post',
    data: TbUser
  })
}
