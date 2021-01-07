// エロ漫画の艶
// https://eromanga-milf.com/

export function getImgList(){
  const r = {urls:[],title:''};
  for(let dom of document.getElementsByClassName('entry-content')[0].children)
    if(dom.tagName == 'IMG') r.urls.push(dom.src);
  var locate = location.href.split('/');
  if(locate[locate.length - 1] == '') r.title = 'eromanga-milf-' + locate[locate.length - 3].replace('%','') + '-' + locate[locate.length - 2];
  else r.title = 'eromanga-milf-' + locate[locate.length - 2].replace(/%/g,'') + '-' + locate[locate.length - 1];
  return r;
}