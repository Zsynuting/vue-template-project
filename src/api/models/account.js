import base from '../base'
import {
  makeRequest
} from '../shared'

const account = Object.create(base);
account.endpoint = '/api/users'

const password = Object.create(base);
password.endpoint = '/api/users'
password.put = function (account) {
  return makeRequest(this.endpoint + "/" + account.id + '/password', 'put', account, this.disableLoading);
}

export default {
  default: account,
  password,
}
