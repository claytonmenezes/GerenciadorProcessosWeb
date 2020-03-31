import axios from 'axios'
import globals from 'src/lib/globals'
import cookie from './cookie'
import router from 'src/router'
import { Dialog } from 'quasar'

export default {
  request (requestConfig) {
    const token = cookie.getCookie('gerenciadoProcessos')
    const headers = { Authorization: 'Bearer ' + token }
    if (!token) {
      router.push('/Login')
      throw new Error('Token não encontrado')
    }
    return axios({
      baseURL: globals.urlApi,
      url: requestConfig.url,
      method: requestConfig.method || 'get',
      params: requestConfig.params,
      data: requestConfig.data,
      responseType: requestConfig.responseType,
      headers: headers
    }).catch(error => {
      Dialog.create({
        title: 'Alerta',
        message: this.mensagemErro(error.response.data)
      })
    })
  },
  mensagemErro (dataError) {
    if (typeof dataError.InnerException !== 'undefined') {
      return this.mensagemErro(dataError.InnerException)
    } else {
      return dataError.ExceptionMessage || dataError.Message
    }
  }
}
