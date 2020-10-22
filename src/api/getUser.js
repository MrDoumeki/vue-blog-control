import request from '@/utils/request'

export function getAllUser (id, currentPage) {
  return request({
    url: 'BlogSystem/UserListAction',
    method: 'get',
    params: {
      pn: currentPage,
      ps: 10
    }
  })
}

export function updUser (form) {
  return request({
    url: 'BlogSystem/UserUpdateAction',
    method: 'get',
    params: {
      id: form.id,
      username: form.username,
      nickname: form.nickname,
      gender: form.gender,
      age: form.age,
      isSuperuser: form.isSuperuser
    }
  })
}

export function addUser (form) {
  return request({
    url: 'BlogSystem/UserInsertAction',
    method: 'get',
    params: {
      username: form.username,
      nickname: form.nickname,
      gender: form.gender,
      age: form.age,
      isSuperuser: form.isSuperuser,
      password: form.pwd
    }
  })
}

export function delUser (id) {
  return request({
    url: 'BlogSystem/UserDelAction',
    method: 'post',
    params: {
      id: id
    }
  })
}
