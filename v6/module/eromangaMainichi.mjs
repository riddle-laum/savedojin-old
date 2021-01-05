// 毎日エロ漫画
// http://eromanga-mainichi.com/

export function getImgList(){
  const r = {urls:[],title:''};
  var dom;
  for(dom of document.getElementsByClassName('content-img')) r.urls.push(dom.src);
  r.title = 'eromanga-mainichi-';
  r.title += (()=>{
    var locate, res;
    if((res = (locate = location.href.split('/'))[locate.length - 1].replace(/%/g,'')) == '') res = locate[locate.length - 2].replace(/%/g,'');
    return res;
  })();
  return r;
}