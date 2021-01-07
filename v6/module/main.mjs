// saveDojin.main //

const siteList = [
  // {site:'',file:''},

  // version 6.0.0 (alpha)
  {site:'eromanga-yoru',file:'yoru'},
  {site:'dd-smart',file:'dojinsmart'},
  {site:'buhidoh',file:'buhidoh'},
  {site:'eromanga-school',file:'eromangaSchool'},
  {site:'eromanag-ace',file:'eromangaAce'},
  {site:'eromanga-mainichi',file:'eromangaMainichi'},
  {site:'ero-manga-kingdom',file:'eromangaKingdom'},
  {site:'kairakudoujin',file:'kairakudojin'},
  {site:'eromanga-milf',file:'eromangaMilf'},
  {site:'hentai-books',file:'hentaiBooks'},
  {site:'erocool',file:'erocool'}
];
const version = 'version 6.0.0 (alpha)';

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
  for(let site of [...siteList, void 0]){
    if(site === void 0) console.warn(website + ' is not supported by saveDOJIN ' + version);
    else if(site.site == website){
      // load script
      const url = jsdelivr + website.file + '.min.mjs';
      const {getImgList} = await import(url);
      if(typeof(getImgList) !== 'function') throw new Error();
      makedom(await getImgList());
      return;
    }
  }
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