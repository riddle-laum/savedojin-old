// 快楽同人
// http://kairakudoujin.net/

export function getImgList(){
  const r = {urls:[],title:''};
  for(let dom of document.getElementsByClassName('entry')[0].children)
    if(dom.tagName == 'IMG') r.urls.push(dom.src);
  var locate = location.href.split(/\/|\.|-/g);
  if(locate[locate.length - 1] == '' || locate[locate.length - 1] == 'html')
    r.title = 'kairakudoujin-' + locate[locate.length - 2];
  else r.title = 'kairakudoujin-' + locate[locate.length - 1];
  return r;
}