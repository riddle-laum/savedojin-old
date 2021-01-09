// エロ漫画コレクター
// https://eromanga-collector.com/

export function getImgList({srcsetParse}){
  const r = {urls:[],title:''};
  for(let elm of document.getElementsByClassName('entry-content')[0].children) if(elm.srcset) r.urls.push(elm.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'eromanga-collector-' + document.getElementsByTagName('article')[0].id.split('-')[1];
  return r;
}