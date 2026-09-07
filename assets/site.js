(function(){
  var root=document.documentElement;
  var toggle=document.getElementById('langToggle');
  var titles={
    ja: document.title,
    en: (document.querySelector('meta[name="title-en"]')||{}).content || document.title
  };
  function setLang(l,persist){
    root.lang=l;
    document.title = titles[l] || document.title;
    if(persist){ try{localStorage.setItem('bakebake-lang',l);}catch(e){} }
  }
  setLang(root.lang==='en'?'en':'ja',false);
  if(toggle){ toggle.addEventListener('click',function(){ setLang(root.lang==='en'?'ja':'en',true); }); }

  // keep ?lang=en on internal links when EN is active
  document.querySelectorAll('a[data-internal]').forEach(function(a){
    var orig=a.getAttribute('href');
    a.addEventListener('click',function(){
      var i=orig.indexOf('#'), base=i<0?orig:orig.slice(0,i), hash=i<0?'':orig.slice(i);
      a.href = base + (root.lang==='en' && base.indexOf('?')<0 ? '?lang=en' : '') + hash;
    });
  });

  var btn=document.getElementById('menuBtn'), nav=document.getElementById('nav');
  if(btn&&nav){
    function closeNav(){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',closeNav); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&nav.classList.contains('open')){ closeNav(); btn.focus(); } });
    document.addEventListener('click',function(e){ if(nav.classList.contains('open')&&!nav.contains(e.target)&&!btn.contains(e.target)) closeNav(); });
  }

  var facade=document.getElementById('videoFacade');
  if(facade){
    facade.addEventListener('click',function(){
      var f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+facade.getAttribute('data-video')+'?autoplay=1';
      f.title=facade.getAttribute('data-title')||'video';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.referrerPolicy='strict-origin-when-cross-origin';
      f.allowFullscreen=true;
      facade.replaceWith(f);
    });
  }
})();
