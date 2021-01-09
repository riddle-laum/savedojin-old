// エロ艦娘
// http://kankoredoujin.blog.fc2.com/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('img'))
    if(dom.alt && !(dom.alt == 'QR') && !(dom.alt == 'FC2 Analyzer') && dom.src) r.urls.push(dom.src);
  r.title = 'ero-kanmusu-' + location.href.split(/\.|\/|-/)[8];
  return r;
}