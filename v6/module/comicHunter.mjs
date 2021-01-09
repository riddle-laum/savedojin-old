// エロコミックハンター
// https://ero-comic-hunter.net/

export function getImgList(){
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.kijibox img'))
    if(/wp-image-.+/.test(dom.className) && dom.src) r.urls.push(dom.src);
  r.title = 'ero-comic-hunter-' + location.href.split('/')[3].split('.')[0];
  return r;
}

