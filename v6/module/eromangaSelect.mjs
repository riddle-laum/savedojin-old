// 
// https://eromanga-select.com/

export function getImgList(){
  console.warn('----- operation check not performed -----');
  const r = {urls:[],title:''};
  for(var dom of document.querySelector('section').children)
    if(dom.querySelector('img').src) r.urls.push(dom.querySelector('img').src);
  r.title = 'eromanga-selection-' + location.href.split('/')[4].replace(/%/g,'');
  return r;
}


// ----- OPERATION CHECK NOT PERFORMED ----- //



// https://eromanga-select.com/ >> no response 2021/01/09 18:20