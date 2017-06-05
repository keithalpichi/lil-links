export const getJWTFromStorage = () => window.localStorage.getItem('lil-link-jwt')
export const setJWTInStorage = jwt => window.localStorage.setItem('lil-link-jwt', jwt)
export const removeJWTFromStorage = () => window.localStorage.removeItem('lil-link-jwt')
export const createJWTHeader = token => {
  let jwt = token || getJWTFromStorage()
  if (jwt) {
    return {
      'Authorization': `Bearer ${jwt}`
    }
  }
}
