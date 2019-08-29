import {
  makeRequest,
  getQueryUrl,
  fillUrlParam,
  saveFileFromResponse
} from '../shared'

export default {
  endpoint: "",
  params: {},
  disableLoading: false,
  getUrl() {
    return fillUrlParam(this.endpoint, this.params);
  },
  post(data) {
    return makeRequest(this.getUrl(), 'post', data, this.disableLoading);
  },
  delete(data) {
    return makeRequest(this.getUrl() + '/' + data.id, 'delete', null, this.disableLoading);
  },
  put(data) {
    return makeRequest(this.getUrl() + "/" + data.id, 'put', data, this.disableLoading);
  },
  getAll() {
    return makeRequest(this.getUrl(), 'get', null, this.disableLoading);
  },
  get(query) {
    return makeRequest(this.getUrl() + getQueryUrl(query), 'get', null, this.disableLoading);
  },
  getOne(id) {
    return makeRequest(this.getUrl() + '/' + id, 'get', null, this.disableLoading);
  },
  downloadExample() {
    return makeRequest(this.getUrl() + '/excel-example', 'get', null, this.disableLoading, 'blob')
      .then(response => {
        saveFileFromResponse(response);
      });
  },
  exportFile(data) {
    return makeRequest(this.getUrl() + '/export', 'get', data, this.disableLoading, 'blob')
      .then(response => {
        saveFileFromResponse(response);
      });
  },
  importFile(formData) {
    return makeRequest(this.getUrl() + '/import',
      'post',
      formData,
      this.disableLoading,
      undefined, {
        'content-type': 'multipart/form-data'
      }
    );
  }
}
