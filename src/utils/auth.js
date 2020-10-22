import jsCookies from 'js-cookie'

const authToken = ''

export function setToken (value) {
  jsCookies.set(authToken, value)
}

export function getToken () {
  return jsCookies.get(authToken)
}

export function removeToken () {
  jsCookies.remove(authToken)
}
