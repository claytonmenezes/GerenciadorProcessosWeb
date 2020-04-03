import { date } from 'quasar'
import axios from 'axios'

export default {
  formataData (val) {
    return date.formatDate(val, 'DD/MM/YYYY')
  },
  copyArray (array) {
    const copy = []
    if (array) {
      array.forEach(e => {
        const objTarget = Object.assign({}, e)
        for (const property in objTarget) {
          if (Array.isArray(objTarget[property])) {
            objTarget[property] = this.copyArray(objTarget[property])
          } else if (objTarget[property] && typeof objTarget[property] === 'object') {
            objTarget[property] = this.copyObject(objTarget[property])
          }
        }
        copy.push(objTarget)
      })
    }
    return copy
  },
  copyObject (original) {
    const copy = Object.assign({}, original)
    for (const property in copy) {
      if (Array.isArray(copy[property])) {
        copy[property] = this.copyArray(copy[property])
      } else if (copy[property] && typeof copy[property] === 'object') {
        copy[property] = this.copyObject(copy[property])
      }
    }
    return copy
  },
  async Ufs () {
    return await axios({
      url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      method: 'get'
    }).then(response => { return response.data })
  }
}
