// エロ漫画喫茶
// https://eromangacafe.com/

export function getImgList({srcsetParse}){
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.kijibox p'))
    if(dom.querySelector('img') && dom.querySelector('img').srcset) r.urls.push(dom.querySelector('img').srcset);
  r.urls = srcsetParse(r.urls);
  if(!r.urls.length)
    for(var dom of document.querySelectorAll('.kijibox p'))
      if(dom.querySelector('a') && dom.querySelector('a').href) r.urls.push(dom.querySelector('a').href);
  r.title = 'eromanga-cafe-' + location.href.split(/\.|\//)[4];
  return r;
}

