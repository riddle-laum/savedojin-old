// 同人ドルチ
// http://doujin-dolci.com/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of document.getElementsByClassName('content')[0].getElementsByTagName('a')) r.urls.push(dom.href);
  r.title = 'dojin-dolci-' + location.href.split('/')[4].replace(/%/g,'');
  return r;
}