// export function isEmpty(val, options = {}) {
//   return {
//     required: true,
//     trigger: 'blur',
//     message: `${val}`,
//     whitespace: true,
//     ...options
//   }
// }

export function isPassword () {
  return {
    required: true,
    min: 6,
    max: 20,
    message: '密码不能为空且应在6~20位之间',
    trigger: 'blur'
  }
}

export function isUsername () {
  return {
    required: true,
    min: 2,
    max: 20,
    message: '账号不能为空且应在2~20位之间',
    trigger: 'blur'
  }
}

export function isNickname () {
  return {
    required: true,
    min: 2,
    max: 20,
    message: '昵称不能为空且应在2~20位之间',
    trigger: 'blur'
  }
}

export function isContent () {
  return {
    required: true,
    min: 2,
    max: 500,
    message: '正文内容不能为空且在2-500字之间',
    trigger: 'blur'
  }
}

export function isTypeName () {
  return {
    required: true,
    min: 2,
    max: 20,
    message: '类型名字不能为空且在2-20之间',
    trigger: 'blur'
  }
}
