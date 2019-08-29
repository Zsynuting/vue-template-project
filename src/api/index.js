import models from './models'

import {
  makeRequest
} from './shared'

export default {
  login(user) {
    return new Promise(resolve => {
      makeRequest('/api/auth/signin', 'post', user).then(({
        data: {
          content
        }
      }) => {
        localStorage.setItem('access-token', content['access-token'])
        resolve(content.userName);
      });
    })
  },
  ...models
}
