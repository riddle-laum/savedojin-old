// in bookmarklet

javascript:
(async ()=>{
  const jsdelivr = 'https://cdn.jsdelivr.net/gh/riddle-laum/savedojin@master/v6/module.min/', {main} = await import(jsdelivr + 'main.min.js'); // dynamic import
  if(typeof(main) !== 'function') throw new Error();
  main();
})();