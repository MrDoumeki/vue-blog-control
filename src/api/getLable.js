import request from '@/utils/request'

export function getLable (currentPage) {
  return request({
    url: 'BlogSystem/LableListAction',
    method: 'get',
    params: {
      pn: currentPage,
      ps: 10
    }
  })
}

export function delLable (id) {
  return request({
    url: 'BlogSystem/LableDelAction',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function editLable (form) {
  return request({
    url: 'BlogSystem/LableUpdateAction',
    method: 'post',
    params: {
      id: form.id,
      name: form.name,
      con: form.con
    }
  })
}

export function addLable (form) {
  return request({
    url: 'BlogSystem/LableInsertAction',
    method: 'post',
    params: {
      name: form.name,
      con: form.con
    }
  })
}
