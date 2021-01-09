// ヒメブック
// http://hime-book.net/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of document.querySelector('.article-body-inner').children)
    if(dom.tagName == 'A' && dom.querySelector('img') && dom.querySelector('img').src)
      r.urls.push(dom.querySelector('img').src);
  r.title = 'hime-book-' + location.href.split('/')[3];
  return r;
}