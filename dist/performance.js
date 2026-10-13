(()=>{
let low=false;try{const saved=localStorage.getItem('onam-low-data');low=saved==='true'||(saved===null&&(navigator.connection?.saveData||['slow-2g','2g'].includes(navigator.connection?.effectiveType)));}catch{}
let ready=false;const observed=new WeakSet();const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!low&&ready){const img=entry.target;img.src=img.dataset.src;img.decoding='async';observer.unobserve(img);}}),{rootMargin:'120px'});
function scan(){document.querySelectorAll('img[data-src]').forEach(img=>{if(!observed.has(img)){observed.add(img);observer.observe(img);}});}
const button=document.createElement('button');button.className='photo-mode';button.type='button';const update=()=>{button.textContent=low?'Low-data mode · show photos':'Photos on · use less data';button.setAttribute('aria-pressed',String(low));document.documentElement.classList.toggle('low-data',!!low);};button.addEventListener('click',()=>{low=!low;try{localStorage.setItem('onam-low-data',String(low));}catch{}update();if(!low)document.querySelectorAll('img[data-src]:not([src])').forEach(img=>{observer.unobserve(img);observer.observe(img);});});
const anchor=document.querySelector('.menu-caption')||document.querySelector('.hero-actions');anchor?.appendChild(button);update();
new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
function start(){ready=true;scan();if(!low)setTimeout(()=>document.querySelectorAll('link[data-font-href]').forEach(link=>{link.href=link.dataset.fontHref;}),1000);}
if(document.readyState==='complete')setTimeout(start,150);else window.addEventListener('load',()=>setTimeout(start,150),{once:true});
})();
