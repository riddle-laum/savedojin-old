// buhidoh

export function getImgList(){
  const r =  {urls:[],title:''};
  var imgdom;
  for(var dom of (imgdom = document.getElementsByClassName('entry_text')[0].children)) if(dom.tagName == 'A') urls.push(dom.href);
  if(!urls.length) 
  return r;
}