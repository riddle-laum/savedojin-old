// 同書庫
// http://www.dousyoko.net/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.ently_text a[target=_blank]')) r.urls.push(dom.href);
  r.title = 'dousyoko-' + location.href.split('-')[2].split('.')[0];
  return r;
}