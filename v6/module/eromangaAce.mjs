// エロ漫画エース
// http://eromanga-ace.com/

export async function getImgList(){
  return await _getImgList(document);
}
async function _getImgList(parent){
  const r = {urls:[],title:''};
  for(let dom of parent.getElementsByClassName('content-img')) r.urls.push(dom.src);
  r.title = 'eromanga-ace-';
  r.title += (()=>{
    var locate, res;
    if((res = (locate = location.href.split('/'))[locate.length - 1].replace(/%/g,'')) == '')
      res = locate[locate.length - 2].replace(/%/g,'');
    return res;
  })();
  if(parent.getElementsByClassName('nextpage')[0] && parent.getElementsByClassName('nextpage')[0].getElementsByClassName('next')[0]){
    // next page exist
    let dom = document.createElement('html');
    dom.innerHTML = await getNextPageDom();
    r.urls = [...r.urls, ...(await _getImgList(dom)).urls];
  }
  return r;
}

async function getNextPageDom(){
  const locate = document.getElementsByClassName('nextpage')[0].children[0].href;
  var dom;
  await new Promise((resolve, reject)=>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', locate);
    xhr.addEventListener('load', ()=>{
      dom = xhr.responseText;
      resolve();
    });
    xhr.addEventListener('error', ()=>{
      reject();
    });
    xhr.send();
  });
  return dom;
}