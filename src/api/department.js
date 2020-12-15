import request from '../util/request'

export const findDeptAndCount = () => {
  return request({
    url: '/system/tb-department/findDeptAndCount',
    method: 'get'
  })
}
