import { pluginList } from '../global-plugin-list';

export function loadCDN() {
  const promiseArr = [];
  const cssArr = pluginList.css;
  const jsArr = pluginList.js;
  if (cssArr.length) {
    cssArr.reduce((arr, link) => {
      const promise = new Promise((resolve, reject) => {
        const cssNode = document.createElement('link');
        cssNode.setAttribute('rel', 'stylesheet');
        cssNode.setAttribute('href', link);
        document.head.appendChild(cssNode);
        cssNode.onload = resolve;
      });
      arr.push(promise);
      return arr;
    }, promiseArr);
  }
  if (jsArr.length) {
    jsArr.reduce((arr, link) => {
      const promise = new Promise((resolve, reject) => {
        const jsNode = document.createElement('script');
        jsNode.src = link;
        jsNode.async = false;
        document.body.appendChild(jsNode);
        jsNode.onload = resolve;
      });
      arr.push(promise);
      return arr;
    }, promiseArr);
  }
  Promise.all(promiseArr);
}
