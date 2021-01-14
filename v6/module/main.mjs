// saveDojin.main //

const siteList = {
  // 'domain' : 'file'

  // version 6.0.0 (alpha)
  'doujin-eromanga':'anilog',
  'eromanga-collector':'buhidoh',
  'eromanga-collector':'collector',
  'ero-comic-hunter':'comicHunter',
  'daretoku-eromanga':'daretoku',
  'dd-smart.jp':'dojinsmart',
  'doujin-dolci':'dolci',
  'dousyoko':'doshoko',
  'erocool':'erocool',
  'eromanga-ace':'eromangaAce',
  'eromangacafe':'eromangaCafe',
  'ero-manga-kingdom':'eromangaKingdom',
  'eromanga-mainichi':'eromangaMainichi',
  'eromanga-milf':'eromangaMilf',
  'eromanga-school':'eromangaSchool',
  'eromanga-search':'eromangaSearch',
  'eromanga-select':'eromangaSelect',
  'hentai-books':'hentaiBooks',
  'hime-book':'himebooj',
  'kairakudoujin':'kairakudojin',
  'kankoredoujin':'kancolleDojin',
  'moeero-library':'moeero',
  'eromanga-yoru':'yoru',
};
const version = 'version 6.0.0 (alpha)';
const jsdelivr = 'https://cdn.jsdelivr.net/gh/riddle-laum/savedojin@master/v6/module.min/';
const assets = {};
assets.srcsetParse = (srcsets)=>{
  const urls = [];
  for(var srcset of srcsets){
    var max = {url:'',size:0};
    for(var temp of srcset.split(', ')){
      var [url, size] = temp.split(' ');
      size = size.split('w')[0];
      if(max.size < size){
        max.url = url, max.size = +size;
      }
    }
    urls.push(max.url);
  }
  return urls;
};

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
    makedom(await getImgList(assets));
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