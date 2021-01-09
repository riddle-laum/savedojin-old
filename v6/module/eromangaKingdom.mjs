// エロ漫画キングダム
// https://ero-manga-kingdom.com/

export function getImgList({srcsetParse}){
  const r = {urls:[],title:''};
  var imgdom;
  for(let dom of document.getElementsByClassName('description')[0].children)
    if(dom.tagName == 'A')
      if(dom.getElementsByTagName('IMG')[0]) if(dom.getElementsByTagName('IMG')[0].srcset) r.urls.push(dom.getElementsByTagName('IMG')[0].srcset);
  r.urls = srcsetParse(r.urls);
  var locate = location.href.split(/\/|\./g);
  r.title = locate[locate.length - 1];
  if(r.title == 'html' || r.title == '') r.title = locate[locate.length - 2];
  r.title = 'ero-manga-kingdom-' + r.title;
  return r;
}

// https://img.ero-manga-kingdom.com/wp-content/uploads/2015/12/DT821_R-650x924.jpg 650w, https://img.ero-manga-kingdom.com/wp-content/uploads/2015/12/DT821_R-721x1024.jpg 721w, https://img.ero-manga-kingdom.com/wp-content/uploads/2015/12/DT821_R.jpg 760w