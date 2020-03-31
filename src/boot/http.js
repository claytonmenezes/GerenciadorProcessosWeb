import http from 'src/lib/http'

export default ({ Vue }) => {
  Vue.prototype.$http = http
}
