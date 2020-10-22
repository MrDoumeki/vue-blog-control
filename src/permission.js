// import router from './router'
// import store from './store'
//
// // 设置白名单
// const whiteList = ['/login']
//
// function relogin () {}
//
// router.beforeEach(async (to, from, next) => {
//   // 避免跳转页面后请求仍在进行
//   if (window.axiosPromiseArr) {
//     window.axiosPromiseArr.forEach(ele => {
//       ele.cancle()
//     })
//     window.axiosPromiseArr = []
//   }
//   // 获取token
//   const token = 'token'
//   // 如果已经获取到token怎么跳转至首页
//   if (token) {
//     if (to.path === '/login') {
//       next({ path: 'home/page' })
//     } else {
//       // 如果token为空则获取store里的用户信息
//       const user = store.getters.user
//       // 获取到用户信息进行下一步
//       if (user) {
//         next()
//       } else {
//         // 如果用户信息为空则调用store里的方法请求获取信息
//         const res = 'store.dispatch(getUserInfo)'
//         // 将请求的response中的权限进行处理匹配菜单
//         if (res) {
//           const accessRoutes = 'await store.dispatch(generationRoute)'
//           router.addRoutes(accessRoutes)
//           next({ ...to, replace: true })
//         } else {
//           // reponse为空说明登陆过期 重新登陆
//           relogin()
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {}
//   }
// })
