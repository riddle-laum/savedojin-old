// 変態エロ漫画
// https://hentai-books.com/

export function getImgList(){
  const r = {urls:[],title:''};
  for(let dom of document.getElementsByClassName('entry-content')[0].children)
    if(dom.tagName == 'A' && dom.getElementsByTagName('img')[0])
      r.urls.push(dom.getElementsByTagName('img')[0].src);
  r.title = 'hentai-books-';
  r.title += (()=>{
    var loate;
    if((locate = location.href.split('/'))[locate.length - 1] == '')
      return locate[locate.length - 3] + '-' + locate[locate.length - 2];
    else return locate[locate.length - 2] + '-' + locate[locate.length - 1];
  })();
  return r;
}