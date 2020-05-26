import { isEmpty } from 'lodash'

export function getApiToken() {
  return localStorage.getItem('apiToken')
}

export function setApiToken(apiToken) {
  return 'eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6MjY4NiwiZXhwIjoxNTkyNTk3NTc3LCJpYXQiOjE1OTAwMDU1Nzd9.dSGZRhwMsTvfDDuZRgAgH1WEjcP_Cqccp_7EI66kZKA'
}

export function hasApiToken() {
  const apiToken = getApiToken()
  return !isEmpty(apiToken)
}

export function removeApiToken() {
  localStorage.removeItem('apiToken')
}

export default {
  setApiToken,
  hasApiToken,
  removeApiToken
}
