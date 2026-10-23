const scenes=[...document.querySelectorAll('.scene')];
const rail=document.querySelector('.rail i');
const count=document.querySelector('.count');
const chapter=document.querySelector('.chapter');
const labels=['INICIO','EL COSTE ACTUAL','EL COSTE EN EL TIEMPO','SOFÍA + JORDAN','ASISTENCIA 24/7','LA PROPUESTA','STARTED–AI'];
let target=0,current=0,ticking=false;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const ease=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2;

function draw(){
  current+=(target-current)*.095;
  if(Math.abs(target-current)<.0001)current=target;
  const max=scenes.length-1;
  scenes.forEach((scene,i)=>{
    const d=i-current,a=clamp(1-Math.abs(d)*1.35);
    scene.classList.toggle('live',Math.abs(d)<1.12);
    scene.style.opacity=a;
    scene.style.transform=`translate3d(${d*18}vw,0,${-Math.abs(d)*420}px) rotateY(${d*-8}deg) scale(${1-Math.abs(d)*.09})`;
    scene.style.filter=`blur(${Math.abs(d)*2.2}px) brightness(${.62+a*.38})`;
    const local=clamp(current-i+.5),main=scene.querySelector('.main'),back=scene.querySelector('.back'),glass=scene.querySelector('.glass'),cover=scene.querySelector('.cover-art');
    if(main)main.style.transform=`scale(${.91+ease(local)*.12}) translate3d(${(local-.5)*-2.5}vw,${(local-.5)*-1.5}vh,${local*90}px)`;
    if(back)back.style.transform=`scale(${1.12-local*.06}) translateX(${(local-.5)*5}vw)`;
    if(glass)glass.style.transform=`translateX(${(local-.5)*34}vw) skewX(-4deg)`;
    if(cover)cover.style.transform=`scale(${1+local*.24}) translate3d(${local*-8}vw,0,${local*190}px) rotateY(${local*-8}deg)`;
  });
  const index=Math.min(max,Math.max(0,Math.round(current)));
  count.textContent=`${String(index).padStart(2,'0')} / 06`;
  chapter.textContent=labels[index];
  rail.style.height=`${current/max*100}%`;
  if(Math.abs(target-current)>.0001)requestAnimationFrame(draw);else ticking=false;
}

function update(){
  const maxScroll=document.documentElement.scrollHeight-innerHeight;
  target=clamp(scrollY/maxScroll)*6;
  if(!ticking){ticking=true;requestAnimationFrame(draw)}
}

addEventListener('scroll',update,{passive:true});
addEventListener('resize',update);
document.querySelector('[data-restart]').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
document.addEventListener('keydown',e=>{
  if(['ArrowDown','ArrowRight',' '].includes(e.key)){e.preventDefault();scrollBy({top:innerHeight*.92,behavior:'smooth'})}
  if(['ArrowUp','ArrowLeft'].includes(e.key)){e.preventDefault();scrollBy({top:-innerHeight*.92,behavior:'smooth'})}
});
update();draw();
