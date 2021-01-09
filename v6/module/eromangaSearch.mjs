// エロ漫画サーチ
// http://eromanga-search.com/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of (()=>{
    for(var temp of document.querySelector('.article').children)
      if(temp.tagName == 'P') return temp.querySelectorAll('img');
  })()) if(dom.src) r.urls.push(dom.src);
  r.title = 'eromanga-search-' + location.href.split(/\/|\./)[5];
  return r;
}

