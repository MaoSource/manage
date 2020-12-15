import request from '../util/request'

export const deleteFile = (file) => {
  return request({
    url: '/upload/deleteFile',
    method: 'post',
    params: {
      file: file
    }
  })
}
