// http://dd-smart.jp/

export async function getImgList(){
  var parent = document;
  var locate = location.href;
  if(location.href.indexOf('show-m') != -1 || location.href.indexOf('all=true') == -1){
    // in info page (not img list page or pdf page)
    let queryParameter = {};
    for(let param of location.href.split('?')[1].split('&')){
      if(typeof(param) !== 'string' || param.split('=').length < 2) throw new Error('query parameter parse error');
      let [key, value] = param.split('=');
      queryParameter[key] = value;
    }
    if(!queryParameter.cn && (!queryParameter.g || !queryParameter.dir)) throw new Error('invalid query parameter');
    locate = 'http://dd-smart.net/dl-m-m.php?cn=' + queryParameter.g + '/' + queryParameter.dir + '&all=true&from=img';
    if(queryParameter.cn) locate = 'http://dd-smart.net/dl-m-m.php?cn=' + queryParameter.cn + '&all=trube&from=img';
    parent = await getDomFromUrl(locate);
  }
  const r = {urls:[],title:''};
  for(var dom of parent.querySelector('#comic-area').querySelectorAll('img')) r.urls.push(dom.src);
  r.title = 'd-smart-' + locate.split(/\?|&/)[1].split('=')[1].replace('/','-');
  return r;
}

async function getDomFromUrl(url){
  var dom = document.createElement('html');
  await new Promise((resolve, reject)=>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', ()=>{
      dom.innerHTML = xhr.responseText;
      resolve();
    });
    xhr.addEventListener('error', (e)=>{
      reject(e);
    });
    xhr.send();
  });
  return dom;
}