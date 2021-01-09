// 萌え萌えアニメログ
// http://doujin-eromanga.com/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of document.getElementsByClassName('content-img')) r.urls.push(dom.src);
  r.title = 'anilog-' + location.href.split('=')[1];
  return r;
}