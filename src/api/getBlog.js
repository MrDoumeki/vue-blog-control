import request from '@/utils/request'

export function getBlog (id, currentPage) {
  return request({
    url: 'BlogSystem/getAllBlog',
    method: 'get',
    params: {
      cId: id,
      pn: currentPage,
      ps: 10
    }
  })
}

export function delBlog (id) {
  return request({
    url: 'BlogSystem/BlogDelAction',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function editBlog (form) {
  return request({
    url: 'BlogSystem/BlogUpdateAction',
    method: 'post',
    params: {
      id: form.bid,
      uid: form.uid,
      title: form.title,
      content: form.content,
      TID: form.labelid
    }
  })
}

export function addBlog (form) {
  return request({
    url: 'BlogSystem/BlogAddAction',
    method: 'post',
    params: {
      uid: form.uid,
      title: form.title,
      content: form.content,
      labelid: form.labelid
    }
  })
}

export function getBlogType () {
  return request({
    url: 'BlogSystem/BlogTypeAction',
    method: 'get'
  })
}
