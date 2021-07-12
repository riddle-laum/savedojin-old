// namespace
const savedojin = {};

// ----- constant ----- //
savedojin.version = 'v0.8.0 extends savedojinImportExportVersion6.0.0(alpha)';

// ----- main ----- //
savedojin.main = async ()=>{
  // show info
  console.log('saveDOJIN made by Riddle-Laum');
  console.log('version : ' + savedojin.version);

  // get website domain
  const website = (()=>{
    const [site, sub] = location.href.split('/')[2].split('.');
    if(site == 'www' || site == 'ja') return sub;
    return site;
  })();
  console.log('website : ' + website);

  // find module and run
  if(savedojin.modules[website]) savedojin.makedom(await savedojin.modules[website](savedojin.assets));
  else console.warn('"' + website + '" is not supported\nversion: ' + savedojin.version);
};

// ----- makedom ----- //
savedojin.makedom = ({urls, title})=>{
  if(urls == void 0) throw new Error();
  var dom = document.createElement('html');
  dom.appendChild(document.createElement('head'));
  dom.appendChild(document.createElement('body'));
  dom.getElementsByTagName('head')[0].appendChild(document.createElement('meta'));
  dom.getElementsByTagName('meta')[0].setAttribute('charset', 'utf-8');
  dom.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
  dom.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
  dom.getElementsByTagName('div')[0].setAttribute('id', 'main-contents');
  dom.getElementsByTagName('div')[1].setAttribute('id', 'scripts');
  var elm;
  for(let url of urls){
    elm = document.createElement('img');
    elm.setAttribute('src', url);
    elm.setAttribute('style', 'width:100%;');
    dom.getElementsByTagName('div')[0].appendChild(elm);
  }
  document.getElementsByTagName('html')[0].remove();
  document.appendChild(dom);
  if(title !== void 0) document.title = title;
  return;
};

// ----- getList ----- //
savedojin.support = ()=>{
  console.log(Object.keys(savedojin.modules));
};

// ----- module ----- //

savedojin.modules = {};
savedojin.func = {};
















savedojin.modules['buhidoh'] = ()=>{
  const r =  {urls:[],title:''};
  for(var dom of document.querySelectorAll('.ently_text > a')) r.urls.push(dom.href);
  r.title = 'buhidoh-' + location.href.split(/\/|\./g)[4];
  return r;
};
savedojin.modules['daretoku-eromanga'] = ()=>{
  const r = {urls:[],title:''};
  var locate;
  for(var dom of document.querySelectorAll('.article a')) r.urls.push(dom.href);
  r.title = 'daretoku-eromanga-' + (locate = location.href.split('/'))[locate.length - 1];
  return r;
};
savedojin.modules['dd-smart'] = async()=>{
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
    parent = await savedojin.func._getdomfromurl(locate);
  }
  const r = {urls:[],title:''};
  for(var dom of parent.querySelector('#comic-area').querySelectorAll('img')) r.urls.push(dom.src);
  r.title = 'd-smart-' + locate.split(/\?|&/)[1].split('=')[1].replace('/','-');
  return r;
};
// dd-smart fuctions
savedojin.func._getdomfromurl = async(url)=>{
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
};
// dd-smart functions end
savedojin.modules['dojinwatch'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.article-body > p > a'))
    r.urls.push(dom.href);
  r.title = 'dojinwatch-' + location.href.substr(0, location.href.length - 1).split('/').pop();
  return r;
};
savedojin.modules['doujin-dolci'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.content a')) r.urls.push(dom.href);
  r.title = 'dojin-dolci-' + location.href.split('/')[4].replace(/%/g,'');
  return r;
};
savedojin.modules['doujin-eromanga'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.content-img')) r.urls.push(dom.src);
  r.title = 'anilog-' + location.href.split('=')[1];
  return r;
};
savedojin.modules['doujin-night'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.content-img'))
    r.urls.push(dom.src);
  if(!r.urls.length)
    for(var dom of document.querySelectorAll('#article > p > a > img'))
      r.urls.push(dom.src);
  var [,,,temp01,temp02] = location.href.toLowerCase().split('/');
  r.title = 'doujin-night-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
  return r;
};
savedojin.modules['doujincafe'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(let dom of document.querySelectorAll('.kijibox > p > a > img'))
    if(dom.className.indexOf('wp-image-') != -1)
      r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'doujincafe-' + location.href.split('/')[3].split('.')[0];
  return r;
};
savedojin.modules['doujinhibiki'] = ()=>{
  const r = {urls:[],title:''};
  r.urls.push(document.querySelector('.wp-post-image').src);
  for(let dom of document.querySelectorAll('.content_main > img'))
    r.urls.push(dom.src);
  for(let cnt in r.urls){
    r.urls[cnt] = r.urls[cnt].split('?')[0];
  }
  r.title = (()=>{
    let tarr = [void 0, void 0, void 0];
    [,,,tarr[0],tarr[1],tarr[2]] = location.href.split('/');
    return 'doujinhibiki-' + tarr.join('-'); 
  })();
  return r;
};
savedojin.modules['dousyoko'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.ently_text a[target=_blank]')) r.urls.push(dom.href);
  r.title = 'dousyoko-' + location.href.split('-')[2].split('.')[0];
  return r;
};

savedojin.modules['ero-comic-hunter'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.kijibox img'))
    if(/wp-image-.+/.test(dom.className) && dom.src) r.urls.push(dom.src);
  r.title = 'ero-comic-hunter-' + location.href.split('/')[3].split('.')[0];
  return r;
};
savedojin.modules['ero-manga-kingdom'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.description > a > img')) r.urls.push(dom.srcset);
  if(r.urls.length == 0)
    for(var dom of document.querySelectorAll('.description > img')) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  var locate = location.href.split(/\/|\./g);
  r.title = locate[locate.length - 1];
  if(r.title == 'html' || r.title == '') r.title = locate[locate.length - 2];
  r.title = 'ero-manga-kingdom-' + r.title;
  return r;
};
savedojin.modules['ero-mangalife'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content .alignnone'))
    if(dom.srcset) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'eromanga-life-' + location.href.split(/\/|\./)[4];
  return r;
};
savedojin.modules['ero-mangasokuhou'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.kijibox img'))
    if(dom.srcset) r.urls.push(dom.srcset);
    else if(dom.dataset.lazySrcset) r.urls.push(dom.dataset.lazySrcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'eromanga-sokuho-' + location.href.split(/\/|\./)[4];
  return r;
};
savedojin.modules['erocool'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.vimg')) r.urls.push(dom.dataset.src);
  var locate;
  r.title = 'ercool-' + (locate = location.href.split(/\/|\./g))[locate.length - 1] == '' || locate[locate.length - 1] == 'html' ? locate[locate.length - 2] : locate[locate.length - 1];
  return r;
};
savedojin.modules['erodoujinjohoukan'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.ently_text > p > a > img'))
    r.urls.push(dom.src);
  r.title = 'erodoujinnjohoukan-' + location.href.split('/')[3];
  return r;
};
savedojin.modules['erodoujinshi-world'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.kijibox img')) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'erodoujinshi-world-' + location.href.split(/\.|\//)[4];
  return r;
}
savedojin.modules['eromanga-ace'] = async()=>{
  return await savedojin.func._getimglist(document);
};
// ace functions
savedojin.func._getimglist = async(parent)=>{
  const r = {urls:[],title:''};
  for(let dom of parent.querySelectorAll('.content-img')) r.urls.push(dom.src);
  r.title = 'eromanga-ace-';
  r.title += (()=>{
    var locate, res;
    if((res = (locate = location.href.split('/'))[locate.length - 1].replace(/%/g,'')) == '')
      res = locate[locate.length - 2].replace(/%/g,'');
    return res;
  })();
  if(parent.querySelector('.nextpage') && parent.querySelector('.nextpage .next')){
    // next page exist
    let dom = document.createElement('html');
    dom.innerHTML = await savedojin.func._getnextpagedom(parent);
    r.urls = [...r.urls, ...(await savedojin.func._getimglist(dom)).urls];
  }
  return r;
};
savedojin.func._getnextpagedom = async(parent)=>{
  var locate = parent.querySelector('.nextpage .next').parentNode.href;
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
};
// ace functions end
savedojin.modules['eromanga-celeb'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.article_inner > p > a > img'))
    r.urls.push(dom.src);
  var [,,,temp01,temp02] = location.href.split('/');
  r.title = 'eromanga-celeb-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
  return r;
};
savedojin.modules['eromanga-collector'] = async ({srcsetParse})=>{
  const r = {urls:[],title:['eromanga-collector']};
  for(let url of savedojin.func._col_getSeries()){
    let dom = document;
    if(url != location.href) dom = await savedojin.func._col_getDomFromUrl(url);
    const result = savedojin.func._col_getImageUrlList(dom)
    r.urls.push(...result.urls);
    r.title.push(result.title);
  }
  if(r.urls.length)
    r.urls = srcsetParse(r.urls);
  r.title = r.title.join('-');
  return r;
};
// eromanga-collector functions
savedojin.func._col_getDomFromUrl = async (url)=>{
  const dom = document.createElement('html');
  await new Promise(resolve=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = ()=>{
      dom.innerHTML = xhr.responseText;
      resolve();
    };
    xhr.onerror = err=>console.log(err);
    xhr.send();
  });
  return dom;
};
savedojin.func._col_getImageUrlList = (parent)=>{
  const r = {urls:[],title:''};
  var domlist = parent.querySelectorAll('.entry-content > img');
  if(!domlist.length)
    domlist = parent.querySelectorAll('.entry-content > p > img');
  for(var dom of domlist) if(dom.srcset) r.urls.push(dom.srcset);
  r.title = parent.getElementsByTagName('article')[0].id.split('-')[1];
  return r;
};
savedojin.func._col_getSeries = ()=>{
  if(!document.querySelector('.easy-series-toc')) return [location.href];
  const list = [];
  for(let dom of document.querySelector('.easy-series-toc').querySelectorAll('tbody td'))
    if(dom.querySelector('a') && !dom.querySelector('a').href.match(/%E9%95%B7%E7%B7%A8|%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA/i)) list.push(dom.querySelector('a').href);
    else if(dom.querySelector('span') && dom.querySelector('span').innerHTML.match(/(n|N)ow/)) list.push(location.href);
  return list;
};
// end eromanga-collector functions
savedojin.modules['eromanga-daisuki'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content img'))
    if(dom.srcset) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'eromanga-daisuki-' + location.href.split('/')[4];
  return r;
};
savedojin.modules['eromanga-jkschool'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(let dom of document.querySelectorAll('.entry-content > img[class]'))
    if(dom.className.indexOf('wp-image-') != -1)
      r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  var [,,,temp01,temp02] = location.href.split('/');
  r.title = 'eromanga-jkschool-' + temp01.toLowerCase().replace(/%/g,'') + '-' + temp02;
  return r;
};
savedojin.modules['eromanga-kong'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('#article > p > a > img'))
    r.urls.push(dom.src);
  var [,,,temp01,temp02] = location.href.toLowerCase().split('/');
  r.title = 'eromanga-kong-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
  return r;
};
savedojin.modules['eromanga-mainichi'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.content-img')) r.urls.push(dom.src);
  if(r.urls.length == 0)
    for(var dom of document.querySelectorAll('.article > p > a')) r.urls.push(dom.href);
  r.title = 'eromanga-mainichi-' + (()=>{
    var locate, res;
    if((res = (locate = location.href.split('/'))[locate.length - 1].replace(/%/g,'')) == '') res = locate[locate.length - 2].replace(/%/g,'');
    return res;
  })();
  return r;
};
savedojin.modules['eromanga-milf'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > img')) r.urls.push(dom.src);
  var locate = location.href.split('/');
  if(locate[locate.length - 1] == '') r.title = 'eromanga-milf-' + locate[locate.length - 3].replace('%','') + '-' + locate[locate.length - 2];
  else r.title = 'eromanga-milf-' + locate[locate.length - 2].replace(/%/g,'') + '-' + locate[locate.length - 1];
  return r;
};
savedojin.modules['eromanga-school'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > p a img')) r.urls.push(dom.src);
  for(var dom of document.querySelectorAll('.entry-content > a img')) r.urls.push(dom.src);
  r.title = 'eromanga-school-' + (()=>{
    var locate, res;
    if((res = (locate = location.href.split('/'))[locate.length - 1]) == '')
      res = locate[locate.length - 2];
    return res;
  })();
  return r;
};
savedojin.modules['eromanga-search'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.article > p img')) r.urls.push(dom.src);
  r.title = 'eromaga-search-' + location.href.split(/\/|\./)[5];
  return r;
};
savedojin.modules['eromanga-select'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('section > a > img')) r.urls.push(dom.src);
  r.title = 'eromanga-selection-' + location.href.split('/')[4].replace(/%/g,'');
  return r;
};
savedojin.modules['eromanga-time'] = async ({srcsetParse})=>{
  const r = savedojin.func._getImgUrl(srcsetParse, document);
  r.title = 'eromanga-time-' + r.title;
  for(var url of savedojin.func._getSeriesUrl()){
    var {urls} = savedojin.func._getImgUrl(srcsetParse, await savedojin.func._getPageDom(url));
    r.urls.push(...urls);
    r.title += '-' + url.split('/')[4];;
  }
  return r;
};
// eromanta-time functions
savedojin.func._getImgUrl = (srcsetParse, parent)=>{
  const r = {urls:[],title:''};
  for(var dom of parent.querySelectorAll('.entry-content img'))
    if(dom.srcset) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = location.href.split('/')[4];
  return r;
};
savedojin.func._getSeriesUrl = ()=>{
  let urllist = [];
  for(let dom of document.querySelectorAll('.easy-series-toc a'))
    if(dom.href.match(/\/content\//) && !urllist.includes(dom.href))
      urllist.push(dom.href);
  return urllist;
};
savedojin.func._getPageDom = async (url)=>{
  let dom = document.createElement('html');
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  await new Promise((resolve, reject)=>{
    xhr.onload = ()=>{
      dom.innerHTML = xhr.responseText;
      resolve();
    };
    xhr.onerror = ()=>{
      reject();
    };
    xhr.send();
  });
  return dom;
};
// eromanga-time functions end
savedojin.modules['eromanga-yasan'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content img'))
    if(dom.srcset) r.urls.push(dom.srcset);
    else r.urls.push(dom.src);
  if(document.querySelector('.entry-content img').srcset) r.urls = srcsetParse(r.urls);
  r.title = 'eromanga-yasan-' + location.href.split('/')[3];
  return r;
};
savedojin.modules['eromanga-yoru'] = async ()=>{
  const r = {urls:[],title:[]};
  const series = savedojin.func._yoru_getSeries();
  r.title.push('eromanga-yoru');
  for(let url of series){
    r.title.push(url.split('/')[4]);
    let parent;
    if(url == location.href) parent = document;
    else parent = await savedojin.func._yoru_getDom(url);
    r.urls.push(...savedojin.func._yoru_getImgList(parent));
  }
  r.title = r.title.join('-');
  return r;
};
// yoru fuunctions
savedojin.func._yoru_getSeries = ()=>{
  const series = [];
  if(!document.querySelector('.box_rensaku') && !document.querySelector('.easy-series-toc')) return [location.href];
  if(document.querySelector('.box_rensaku'))
    for(var dom of document.querySelector('.box_rensaku').querySelectorAll('a')) series.push(dom.href);
  else{
    series.push(location.href);
    for(var dom of document.querySelector('.easy-series-toc').querySelectorAll('a')) series.push(dom.href);
  }
  return series;
};
savedojin.func._yoru_getDom = async (url)=>{
  if(url == location.href) return document;
  let xhr = new XMLHttpRequest();
  let dom = document.createElement('html');
  await new Promise((resolve, reject)=>{
    xhr.open('GET', url);
    xhr.onload = ()=>{
      dom.innerHTML = xhr.responseText;
      resolve();
    };
    xhr.onerror = ()=>reject();
    xhr.send();
  });
  return dom;
};
savedojin.func._yoru_getImgList = (parent)=>{
  const urls = [];
  for(var dom of parent.querySelectorAll('.entry-content img')) urls.push(dom.src);
  return urls;
};
// end yoru functions
savedojin.modules['eromangacafe'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.kijibox p img'))
    if(dom.srcset) r.urls.push(dom.srcset);
  if(!r.urls.length) for(var dom of document.querySelectorAll('.kijibox p > a')) r.urls.push(dom.href);
  else r.urls = srcsetParse(r.urls);
  r.title = 'eromanga-cafe-' + location.href.split(/\.|\//)[4];
  return r;
};
savedojin.modules['eromangafucks'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > p > img'))
    if(dom.srcset) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'eromangafucks-' + location.href.split('/').pop();
  return r;
};
savedojin.modules['eromanganomori'] = ()=>{
  const r = {urls:[],title:''};
  let temp;
  for(var dom of document.querySelectorAll('.article-body > span > a')) r.urls.push(dom.href);
  r.title = 'eromanganomori-' + location.href.split('/').pop();
  return r;
};
savedojin.modules['eromangaosa-mu'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.main_article > a')) r.urls.push(dom.href);
  r.title = 'eromanga-osamu-' + location.href.split('/')[3].replace(/%/g,'');
  return r;
};
savedojin.modules['eroproject'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(let dom of document.querySelectorAll('.entry-content > a > img'))
    if(dom.className.indexOf('wp-image-') != -1)
      r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'eroproject-' + location.href.split('/')[3];
  return r;
};

savedojin.modules['hentai-books'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > a > img')) r.urls.push(dom.src);
  r.title = 'hentai-books-' + (()=>{
    var locate;
    if((locate = location.href.split('/'))[locate.length - 1] == '') return locate[locate.length - 3] + '-' + locate[locate.length - 2];
    return locate[locate.length - 2] + '-' + locate[locate.length - 1];
  })();
  return r;
};
savedojin.modules['hime-book'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.article-body-inner > a > img')) r.urls.push(dom.src);
  r.title = 'hime-book-' + location.href.split('/')[3];
  return r;
};
savedojin.modules['hmangamatome'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > p > a > img'))
    r.urls.push(dom.src);
  r.title = 'hmangamatome-' + location.href.split(/\/|\./g)[4];
  return r;
};

savedojin.modules['itaeromanga'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > img'))
    if(dom.srcset) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'itaeromanga-' + location.href.split('/').pop();
  return r;
};

savedojin.modules['kairakudoujin'] = ()=>{
  const r = {urls:[],title:''};
  for(let dom of document.querySelectorAll('.entry > img')) r.urls.push(dom.src);
  var locate = location.href.split(/\/|\.|-/g);
  if(locate[locate.length - 1] == '' || locate[locate.length - 1] == 'html')
    r.title = 'kairakudoujin-' + locate[locate.length - 2];
  else r.title = 'kairakudoujin-' + locate[locate.length - 1];
  return r;
};
savedojin.modules['kankoredoujin'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('img'))
    if(dom.alt && !(dom.alt == 'QR') && !(dom.alt == 'FC2 Analyzer') && dom.src) r.urls.push(dom.src);
  r.title = 'ero-kanmusu-' + location.href.split(/\.|\/|-/)[8];
  return r;
};

savedojin.modules['manga100ka'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.item_file > a'))
    r.urls.push(dom.href);
  r.title = 'manga100ka-' + location.href.split('=')[1];
  return r;
};
savedojin.modules['mangalear'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('#the-content a > img')) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'mangalear-' + location.href.split('/')[4].split('doujinshi-')[1];
  return r;
};
savedojin.modules['moeero-library'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  var locate;
  for(var dom of document.querySelectorAll('.kijibox a'))
    if(dom.className == '' && /\.png|\.jpg|\.jpeg/.test(dom.href))
      r.urls.push(dom.href);
  if(r.urls.length == 0){
    for(var dom of document.querySelectorAll('.kijibox > p > img')) r.urls.push(dom.srcset);
    r.urls = srcsetParse(r.urls);
  }
  r.title = 'moeero-library-' + (locate = location.href.split('/'))[locate.length - 1].split('.')[0];
  return r;
};

savedojin.modules['nhentai'] = async()=>{
  const r = {urls:[],title:''};
  for(let dom of document.querySelectorAll('.thumb-container > a')){
    let res = await savedojin.func._getNthPageImgUrl(dom.href)
      .catch(err=>{
        return void 0;
      });
    if(!res) continue;
    r.urls.push(res);
  }
  let temp = location.href.split('/');
  r.title = 'nhentai-' + temp[3] + '-' + temp[4];
  return r;
};
// nhentai function start
savedojin.func._getNthPageImgUrl = async(url)=>{
  var html = document.createElement('html');
  await new Promise((resolve, reject)=>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = ()=>{
      html.innerHTML = '' + xhr.responseText;
      resolve();
    };
    xhr.onerror = (err)=>{
      reject(err);
    };
    xhr.send();
  });
  return html.querySelector('#image-container > a > img').src;
};
// nhentai function end
savedojin.modules['nijioma'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > p > a > img'))
    if(dom.className.indexOf('wp-image-') != -1)
      r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'nijioma-' + location.href.split('/')[3];
  return r;
};
savedojin.modules['nukemanga'] = ({srcsetParse})=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content > p img')) if(dom.srcset) r.urls.push(dom.srcset);
  r.urls = srcsetParse(r.urls);
  r.title = 'nukeman-' + location.href.split('/')[3];
  return r;
};
savedojin.modules['nyahentai'] = async ()=>{
  const r = {urls:[],title:''};
  let rescnt = 0;
  await new Promise(async(resolve, reject)=>{
    for(var dom of document.querySelectorAll('.gallerythumb'))
      (async()=>{
        rescnt++;
        r.urls.push(await savedojin.func._nyahentai_getPageImg(dom.href));
        rescnt--;
        if(rescnt == 0) resolve();
      })();
  });
  r.title = 'nyahentai-' + location.href.substr(0,location.href.length - 1).split('/').pop();
  return r;
};
// ----- nyahentai functions ----- //
savedojin.func._nyahentai_getPageImg = async (url)=>{
  let html = document.createElement('html');
  await new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = ()=>{
      html.innerHTML = xhr.responseText;
      resolve();
    };
    xhr.onerror = ()=>{
      reject();
    };
    xhr.send();
  });
  return html.querySelector('.current-img').src;
};
// ----- nyahentai functions end ----- //

savedojin.modules['oreno-erohon'] = ()=>{
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.entry-content img')) r.urls.push(dom.src);
  r.title = 'oreno-erohon-' + location.href.split('/')[4];
  return r;
};

savedojin.modules['pixiv'] = async ({sleep})=>{
  const r = {urls:[],title:''};
  let temp, extend = null;
  // search extend
  for(var dom of document.querySelectorAll('button'))
    if(dom.querySelector('div:nth-child(2)') && dom.querySelector('div:nth-child(2)').innerText == 'すべて見る'){
      extend = dom;
      break;
    }
  
  // open extend
  if(extend !== null){
    // some images in this page
    extend.click();
    await sleep(1000); // 1s(1000ms) for now, adjust later
  }
  for(var dom of document.querySelectorAll('.gtm-expand-full-size-illust'))
    r.urls.push(dom.href);
  r.title = 'pixiv-' + (temp = location.href.split('/'))[temp.length - 1];
  return r;
};

savedojin.modules['xn--gmq92kd2rm1kx34a'] = ()=>{ // zetsubo mangakan
  const r = {urls:[],title:''};
  for(var dom of document.querySelectorAll('.single-post img')) r.urls.push(dom.src);
  r.title = 'zetsubo-eromanga-' + location.href.split('/')[5].replace(/%/g,'');
  return r;
};


















// ----- assets ----- //
savedojin.assets = {};
savedojin.assets.srcsetParse = (srcsetArray)=>{
  if(!srcsetArray[0]) throw new Error('invalid arg');
  const urls = [];
  for(var srcset of srcsetArray){
    var max = {url:'',size:0};
    for(var temp of srcset.split(', ')){
      var [url, size] = temp.split(' ');
      size = +size.split('w')[0];
      if(max.size < size) max.url = url, max.size = size;
    }
    urls.push(max.url);
  }
  return urls;
};
savedojin.assets.sleep = async (delay)=>{
  if(+delay !== +delay) throw new Error('delay must be number (ms)');
  if(+delay < 0) throw new Error('delay must be bigger than 0');
  await new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve();
    }, delay);
  });
};

// ----- when loaded ----- //
savedojin.main();
