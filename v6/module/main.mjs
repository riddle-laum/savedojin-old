// saveDojin.main //

const siteList = {
  // 'domain' : 'file'

  // version 6.0.0 (alpha)
  'eromanga-yoru' : 'yoru',
  'dd-smart' : 'dojinsmart',
  'buhidoh' : 'buhidoh',
  'eromanga-school' : 'eromangaSchool',
  'eromanag-ace' : 'eromangaAce',
  'eromanga-mainichi' : 'eromangaMainichi',
  'ero-manga-kingdom' : 'eromangaKingdom',
  'kairakudoujin' : 'kairakudojin',
  'eromanga-milf' : 'eromangaMilf',
  'hentai-books' : 'hentaiBooks',
  'erocool' : 'erocool'
};
const version = 'version 6.0.0 (alpha)';
const jsdelivr = 'https://cdn.jsdelivr.net/gh/riddle-laum/savedojin@master/v6/module.min/';


export async function main(){
  // show info
  console.log('saveDOJIN made by Riddle : ' + version);

  // get website domain
  const website = (()=>{
    const [site,sub] = location.href.split('/')[2].split('.');
    if(site == 'www' || site == 'ja') return sub;
    return site;
  })();
  console.log('website: ' + website);

  // find new script and load it
  if(siteList[website]){
    // supported
    const {getImgList} = await import(jsdelivr + siteList[website] + '.min.mjs');
    if(typeof(getImgList) !== 'function') throw new Error('getImgList is not function');
    makedom(await getImgList());
  } else console.warn(website + ' is not supported by saveDOJIN ' + version);
}

// makedom
function makedom({urls, title}){
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
    dom.getElementsByTagName('div')[0].appendChild(elm);
  }
  document.getElementsByTagName('html')[0].remove();
  document.appendChild(dom);
  if(title !== void 0) document.title = title;
  return; 
}