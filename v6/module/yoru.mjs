// https://eromanga-yoru.com/

export function getImgList(){
  var urls = [];
  for(var dom of document.getElementsByClassName('entry-content')[0].getElementsByTagName('img')) urls.push(dom.src);
  return {urls: urls, title: 'eromanga-yoru-' + location.href.split('/')[4]};
}