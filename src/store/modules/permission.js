const asyncRoutes = 'import ....'
// 和route.meta里的roles比较，如果存在则返回该角色的role来确定所有的权限
export function hasPermission (role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.include(role)
  } else {
    return true
  }
}
// 权限过滤
export function filterAsyncRoutes (routes, role) {
  const tmp = '{...route}'
  if (hasPermission(role, tmp)) {
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, role)
    }
  }
}

const state = {}
const mutations = {}
const actions = {
  generateRoutes ({ commit }, role) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, role)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
