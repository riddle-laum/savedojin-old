// 誰得エロ漫画
// https://daretoku-eromanga.info/

export function getImgList(){
  const r = {urls:[],title:''};
  var locate;
  for(var dom of document.getElementsByClassName('article')[0].getElementsByTagName('a')) r.urls.push(dom.href);
  r.title = 'daretoku-eromanga-' + (locate = location.href.split('/'))[locate.length - 1];
  return r;
}