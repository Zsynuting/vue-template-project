import axios from 'axios'
import _ from 'lodash'
import {
  Loading,
  Message,
} from 'element-ui'
let loadingCover = null;

export const makeRequest = (endpoint, method, data, disableLoading, responseType, headers) => {
  return new Promise((resolve, reject) => {
    if (!disableLoading) {
      loadingCover = Loading.service({
        lock: true,
        background: 'rgba(255, 255, 255, 0.6)'
      })
    }
    axios({
      method,
      url: endpoint,
      data: data || {},
      responseType,
      headers: {
        "access-token": localStorage.getItem('access-token'),
        ...headers
      }
    }).then((response) => {
      disableLoading || loadingCover.close();
      localStorage.setItem('access-token', response.headers['access-token']);
      resolve(response)
    }, ({
      response
    }) => {
      disableLoading || loadingCover.close();
      if (response) {
        if (response.status === 403) {
          localStorage.removeItem("access-token");
          localStorage.removeItem("project");
          window.location.href = "/"
        }
      } else {
        Message("服务器未响应");
      };
      reject(response);
    })
  })
}

export const getQueryUrl = (query) => {
  let queryComponents = [];
  for (let attr in query) {
    if (query[attr]) {
      queryComponents.push(encodeURIComponent(attr) + '=' + encodeURIComponent(query[attr]));
    }
  }
  return "?" + queryComponents.join('&');
}

const urlParamRegExp = /\{(.+)\}/
export const fillUrlParam = (urlPattern, params) => {
  return urlPattern.replace(urlParamRegExp, (match, placeholder) => {
    return params[_.camelCase(placeholder)] || match;
  })
}

export const saveFileFromResponse = ({
  data,
  headers
}) => {
  let fileName = decodeURI(
    headers["content-disposition"].split("filename=")[1]
  );
  let blob = new Blob([data], {
    type: "application/vnd.ms-excel"
  });
  if (navigator.msSaveBlob) {
    // IE内核下载
    navigator.msSaveBlob(blob, fileName);
  } else {
    // 非IE内核下载
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  }
}
