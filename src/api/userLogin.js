import request from '@/utils/request'

export function userLogin (form) {
  return request({
    url: 'BlogSystem/ManagerLogin',
    method: 'post',
    params: {
      username: form.username,
      pwd: form.pwd
    }
  })
}

export function userRegister (form) {
  return request({
    url: 'BlogSystem/ManagerRegister',
    method: 'post',
    params: {
      username: form.username,
      pwd: form.pwd,
      sex: form.sex,
      age: form.age,
      nickname: form.nickname
    }
  })
}

export function getUserInfo (id) {
  return request({
    url: 'BlogSystem/getManagerInfo',
    method: 'get',
    params: {
      cId: id
    }
  })
}

export function updUserInfo (form) {
  return request({
    url: 'BlogSystem/updManagerInfo',
    method: 'post',
    params: {
      id: form.id,
      username: form.name,
      nickname: form.nickname,
      pwd: form.pwd,
      sex: form.sex,
      age: form.age
    }
  })
}

export function getPie () {
  return request({
    url: 'BlogSystem/BlogTypeInfo',
    method: 'get'
  })
}

export function getLine () {
  return request({
    url: 'BlogSystem/BlogCountInfo',
    method: 'get'
  })
}
