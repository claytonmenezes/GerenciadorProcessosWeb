import cookie from './cookie'
import axios from 'axios'
import global from './globals'

export default {
  authenticate (user, password) {
    const sha = require('sha.js')
    const details = {
      grant_type: 'password',
      username: user,
      password: sha('sha256').update(password).digest('hex')
    }

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    return axios({
      method: 'POST',
      url: global.urlApi + '/security/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formBody
    }).then(response => {
      const token = response.data.access_token
      cookie.setCookie('gerenciadoProcessos', token, 365)
    }).catch(error => {
      cookie.deleteCookie('gerenciadoProcessos')
      if (error.response && error.response.data.error_description) {
        throw new Error(error.response.data.error_description)
      } else {
        throw new Error(error.message)
      }
    })
  },
  logoff () {
    cookie.deleteCookie('gerenciadoProcessos')
  }
}
