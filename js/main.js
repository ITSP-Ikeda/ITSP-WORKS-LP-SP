function drawQR(cv){
    const n=21, ctx=cv.getContext('2d'), s=cv.width/n;
    let seed=7;const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
    ctx.clearRect(0,0,cv.width,cv.height);ctx.fillStyle='#0E2547';
    for(let y=0;y<n;y++)for(let x=0;x<n;x++){if(rnd()>0.52 && !((x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9)))ctx.fillRect(x*s+ .5,y*s+.5,s-1,s-1);}
    [[0,0],[n-7,0],[0,n-7]].forEach(([ox,oy])=>{ctx.fillStyle='#0E2547';ctx.fillRect(ox*s,oy*s,7*s,7*s);ctx.clearRect((ox+1)*s,(oy+1)*s,5*s,5*s);ctx.fillRect((ox+2)*s,(oy+2)*s,3*s,3*s);});
  }
  document.querySelectorAll('canvas[data-qr]').forEach(drawQR);

  (function(){
    const slides=document.querySelectorAll('#heroSlider .hero-slide');
    if(slides.length<2) return;
    let i=0;
    setInterval(()=>{
      slides[i].classList.remove('active');
      i=(i+1)%slides.length;
      slides[i].classList.add('active');
    },7000);
  })();

  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.14});
  document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4*60)+'ms';io.observe(el);});

  (function(){
    const label=document.getElementById('navnow');
    const span=label.querySelector('span');
    const secs=[...document.querySelectorAll('[data-nav]')].map(el=>({el,t:el.getAttribute('data-nav')}));
    let cur='';
    function update(){
      let active=null;
      for(const s of secs){ if(s.el.getBoundingClientRect().top<=84) active=s; }
      const t=active?active.t:'';
      if(t!==cur){ cur=t; if(t){ span.textContent=t; label.classList.add('show'); } else { label.classList.remove('show'); } }
    }
    update();
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
  })();

  // auto-scroll the job cards to the left, pausing on user interaction
  (function(){
    const scroller=document.querySelector('.jobs-scroll');
    if(!scroller) return;
    let paused=false, resumeTimer=null;
    function step(){
      if(!paused){
        const max=scroller.scrollWidth-scroller.clientWidth;
        if(max>0){
          if(scroller.scrollLeft>=max-1){ scroller.scrollLeft=0; }
          else{ scroller.scrollLeft+=0.6; }
        }
      }
      requestAnimationFrame(step);
    }
    function pause(){ paused=true; clearTimeout(resumeTimer); }
    function resume(){ clearTimeout(resumeTimer); resumeTimer=setTimeout(()=>{paused=false;},2200); }
    ['pointerdown','wheel','touchstart'].forEach(ev=>scroller.addEventListener(ev,pause,{passive:true}));
    ['pointerup','touchend','mouseleave'].forEach(ev=>scroller.addEventListener(ev,resume,{passive:true}));
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){ requestAnimationFrame(step); }
  })();
