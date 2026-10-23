const scenes=[...document.querySelectorAll('.scene')];
const topbar=document.querySelector('.topbar');
const controls=document.querySelector('.controls');
const counter=document.querySelector('#counter');
const progress=document.querySelector('.progress i');
let current=0;
let transitioning=false;

const cosmos=document.querySelector('.cosmos');
for(let i=0;i<42;i++){
  const spark=document.createElement('i');
  spark.className='spark';
  spark.style.setProperty('--x',`${Math.random()*100}%`);
  spark.style.setProperty('--y',`${Math.random()*100}%`);
  spark.style.setProperty('--s',`${1+Math.random()*3}px`);
  spark.style.setProperty('--d',`${2.8+Math.random()*4}s`);
  spark.style.setProperty('--delay',`${Math.random()*-6}s`);
  spark.style.setProperty('--dx',`${(Math.random()-.5)*90}px`);
  spark.style.setProperty('--dy',`${(Math.random()-.5)*90}px`);
  cosmos.appendChild(spark);
}

function show(index){
  current=Math.max(0,Math.min(index,scenes.length-1));
  scenes.forEach((scene,i)=>scene.classList.toggle('active',i===current));
  const inSlides=current>=1&&current<=5;
  topbar.hidden=!inSlides;
  controls.hidden=current===0||current===6;
  if(inSlides){counter.textContent=`${current} de 5`;progress.style.width=`${current*20}%`}
  document.querySelector('[data-prev]').style.visibility=current<=1?'hidden':'visible';
  const next=document.querySelector('.controls [data-next] span');
  if(next)next.textContent=current===5?'Finalizar':'Siguiente';
}

function next(){
  if(transitioning)return;
  if(current===0){
    transitioning=true;
    scenes[0].classList.add('leaving');
    setTimeout(()=>{show(1);scenes[0].classList.remove('leaving');transitioning=false},1320);
    return;
  }
  show(current+1);
}

document.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',next));
document.querySelector('[data-prev]').addEventListener('click',()=>show(current-1));
document.querySelector('[data-restart]').addEventListener('click',()=>show(0));
document.addEventListener('keydown',event=>{
  if(['ArrowRight','Enter',' '].includes(event.key)){event.preventDefault();next()}
  if(event.key==='ArrowLeft'){event.preventDefault();show(current-1)}
  if(event.key==='Escape')show(0);
});
let startX=0;
document.addEventListener('touchstart',e=>startX=e.changedTouches[0].clientX,{passive:true});
document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>60){if(dx<0)next();else show(current-1)}},{passive:true});
show(0);
