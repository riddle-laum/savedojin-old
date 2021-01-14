// 萌えエロ図書館
// https://moeero-library.com/

export function getImgList(){
  const r = {urls:[],title:''};
  var locate;
  for(var dom of document.querySelectorAll('.kijibox a'))
    if(dom.className == '' && /\.png|\.jpg|\.jpeg/.test(dom.href))
      r.urls.push(dom.href);
  r.title = 'moeero-library-' + (locate = location.href.split('/'))[locate.length - 1].split('.')[0];
  return r;
}
