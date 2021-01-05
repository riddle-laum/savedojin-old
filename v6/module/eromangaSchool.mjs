// えろまんがらんどせる
// https://eromanga-school.com/

export function getImgList(){
  const r = {urls:[],title:''};
  for(let temp of document.getElementsByClassName('entry-content')[0].children)
    if(temp.tagName == 'A' && temp.getElementsByTagName('img')[0])
      r.urls.push(temp.getElementsByTagName('img')[0].src);
  if(r.urls.length == 0) throw new Error('no image list');
  r.title = 'eromanga-school-' + (()=>{
    var locate, res;
    if((res = (locate = location.href.split('/'))[locate.length - 1]) == '')
      res = locate[locate.length - 2];
    return res;
  })();
  return r;
}