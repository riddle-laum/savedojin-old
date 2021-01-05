// http://dd-smart.jp/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of document.getElementById('comic-area').getElementsByTagName('img')) r.urls.push(dom.src);
  r.title = 'd-smart-' + location.href.split(/\?|&/)[1].split('=')[1].replace('/','-');
  return r;
}