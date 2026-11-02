/* ===================== HELPERS ===================== */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const h = html=>{const tp=document.createElement('template');tp.innerHTML=html.trim();return tp.content.firstElementChild;};
const esc = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample = (a,n)=>shuffle(a).slice(0,n);
const pick = a=>a[Math.random()*a.length|0];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const STK_RE = new RegExp('['+Object.keys(STK).join('')+']','g');
const stkRaw = s=>String(s).replace(STK_RE,c=>`<span class="stk">${STK[c]}</span>`);
const stk = s=>stkRaw(esc(s));
const LETTER_RE = /[A-Za-zÀ-ɏſßḀ-ỿ꜠-ꟿ]/;
// Latin old spelling -> Fraktur string: long ſ everywhere except at the end of a word
const toFrak = s=>String(s).replace(/s(?=[A-Za-zâêîôûäöüſßłꞥꞣꞡŗꞩ])/g,'ſ');
const frH = (old,cls='')=>`<span class="fr ${cls}">${stk(toFrak(old))}</span>`;
const glyphH = c=>`<span class="fr">${stk(c)}</span>`;
const letterName = c=>L(LETTERS[c]?.name)||LETTERS[c]?.lat||c;
const norm = s=>String(s).toLowerCase().normalize('NFC').trim().replace(/\s+/g,' ').replace(/[.,!?;:…]/g,'');
const stripMarks = s=>norm(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l');
const cap1 = s=>s.charAt(0).toUpperCase()+s.slice(1);
const ROMAN=['I','II','III','IV','V','VI'];

const ICON = {
  learn:'<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-2 1"/><path d="M20 4v14h-6"/>',
  practice:'<path d="M15 4l5 5L9 20H4v-5z"/><path d="M13 6l5 5"/>',
  read:'<path d="M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2z"/><path d="M4 20V5M8 7h8M8 11h6"/>',
  profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  gear:'<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  candle:'<path class="flm" d="M12 2.2c1.6 2.1 2.2 3.6.9 5.3a1.3 1.3 0 0 1-1.8 0C9.8 5.8 10.4 4.3 12 2.2z"/><path d="M9 10.5h6V21H9z"/><path d="M12 8.6v1.9"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  flag:'<path d="M5 21V4h12l-2 4 2 4H5"/>',
  sound:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>',
  undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  clear:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  chev:'<path d="M9 6l6 6-6 6"/>',
  back:'<path d="M15 6l-6 6 6 6"/>',
  copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
  camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
};
const ic = (n,extra='')=>`<svg class="i i-${n}" viewBox="0 0 24 24" aria-hidden="true" ${extra}>${ICON[n]}</svg>`;
const STAR = '<svg viewBox="0 0 24 24" class="CL"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
const stars = n=>[0,1,2].map(i=>STAR.replace('CL',i<n?'on':'')).join('');

/* ===================== STATE ===================== */
const DAY = (d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const daysBetween=(a,b)=>Math.round((new Date(b+'T12:00')-new Date(a+'T12:00'))/864e5);
const KEY='gotika.v1';
const defaultLang=()=>{try{return /^en/i.test(navigator.language||'')?'en':'lv';}catch(e){return'lv';}};
function freshState(){return{v:2,xp:0,days:{},streak:0,best:0,lastGoalDay:null,freezes:0,lessons:{},letters:{},unitUnlocked:0,sceneSeen:0,
  stats:{lessons:0,draws:0,inkDraws:0,penDraws:0,pencilDraws:0,perfect:0,longS:0,taps:0,challenges:0,reviews:0,typed:0,feedback:0,paper:0,paperChecks:0,conv:0,owl:false,lark:false},
  ach:{},today:{date:DAY()},outbox:[],onboarded:false,
  settings:{lang:defaultLang(),theme:'system',tool:'pen',goal:40,sound:true,haptics:true,showModern:true,convStyle:'bible',convDbl:false},updatedAt:0};}
function deepMerge(base,o){for(const k in o){if(o[k]&&typeof o[k]==='object'&&!Array.isArray(o[k])&&base[k]&&typeof base[k]==='object')base[k]=deepMerge(base[k],o[k]);else base[k]=o[k];}return base;}
function loadState(){let s=freshState();try{const raw=localStorage.getItem(KEY);if(raw)s=deepMerge(s,JSON.parse(raw));}catch(e){}return s;}
let S=loadState();LANG=S.settings.lang||'lv';
function save(){S.updatedAt=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}cloudSave();}
function today(){if(S.today.date!==DAY())S.today={date:DAY()};return S.today;}
function bump(k,n=1){S.stats[k]=(S.stats[k]||0)+n;const td=today();td[k]=(td[k]||0)+n;}

function levelOf(xp){let n=1;while(25*(n+1)*n<=xp)n++;const lo=25*n*(n-1),hi=25*(n+1)*n;const tt=[...LEVEL_TITLES].reverse().find(x=>n>=x[0]);return{level:n,lo,hi,pct:(xp-lo)/(hi-lo),title:tt[1],titleEn:tt[2]};}
const levelTitle=lv=>LANG==='lv'?lv.title:`${lv.title} (${lv.titleEn})`;
function shownStreak(){if(!S.lastGoalDay)return 0;const gap=daysBetween(S.lastGoalDay,DAY());if(gap<=1)return S.streak;if(gap-1<=S.freezes)return S.streak;return 0;}
function todayXP(){return S.days[DAY()]||0;}
function addXP(n){
  const d=DAY();S.days[d]=(S.days[d]||0)+n;S.xp+=n;
  if(S.days[d]>=S.settings.goal&&S.lastGoalDay!==d){
    const gap=S.lastGoalDay?daysBetween(S.lastGoalDay,d):99;
    if(gap===1)S.streak++;
    else if(gap>1&&gap-1<=S.freezes&&S.lastGoalDay){S.freezes-=gap-1;S.streak++;}
    else S.streak=1;
    S.lastGoalDay=d;S.best=Math.max(S.best,S.streak);
    if(S.streak%7===0)S.freezes=Math.min(2,S.freezes+1);
    return true;
  }
  return false;
}
function unitDone(s,ui){return UNITS[ui].lessons.every(l=>s.lessons[l.id]);}
function unitOpen(ui){return ui===0||ui<=S.unitUnlocked||UNITS[ui-1].lessons.every(l=>S.lessons[l.id]);}
function firstUndoneInUnit(ui){const i=UNITS[ui].lessons.findIndex(l=>!S.lessons[l.id]);return i<0?99:i;}
function isUnlocked(l){return !!S.lessons[l.id]||(unitOpen(l.ui)&&l.li<=firstUndoneInUnit(l.ui));}
function nextLesson(){for(const l of ALL_LESSONS)if(!S.lessons[l.id]&&isUnlocked(l))return l;return null;}
function challengeToday(){const d=DAY();let n=0;for(const c of d)n=(n*31+c.charCodeAt(0))>>>0;return CHALLENGES[n%CHALLENGES.length];}
function proverbToday(){const d=new Date();const n=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);return PROVERBS[n%PROVERBS.length];}
function learnedLetters(){return ALL_LESSONS.filter(l=>l.k==='letters'&&S.lessons[l.id]).flatMap(l=>l.letters);}
function learnedWords(){
  const w=new Set();
  ALL_LESSONS.forEach(l=>{if(!S.lessons[l.id])return;if(l.k==='words')l.words.forEach(v=>w.add(v));if(l.k==='rule')RULES[l.rule].ex.forEach(([o])=>V[o.toLowerCase()]&&w.add(V[o.toLowerCase()]));});
  return[...w];
}

/* ===================== OLD → MODERN SPELLING ===================== */
const MOD_RULES = [
  ['sh',{en:'sch → š/ž, tsch → č',lv:'sch → š/ž, tsch → č'},s=>s.replace(/tsch/g,'č').replace(/dsch/g,'dž').replace(/sch/g,'š')],
  ['c',{en:'z → c, ds → dz',lv:'z → c, ds → dz'},s=>s.replace(/z/g,'c').replace(/ds/g,'dz')],
  ['ie',{en:'ee → ie',lv:'ee → ie'},s=>s.replace(/ee/g,'ie')],
  ['long',{en:'vowel + h → long vowel',lv:'patskanis + h → garais patskanis'},s=>s.replace(/([aeiu])h/g,(m,v)=>({a:'ā',e:'ē',i:'ī',u:'ū'})[v]).replace(/oh/g,'o').replace(/[âêîôû]/g,c=>({'â':'ā','ê':'ē','î':'ī','ô':'o','û':'ū'})[c]).replace(/à/g,'ā')],
  ['w',{en:'w → v',lv:'w → v'},s=>s.replace(/w/g,'v')],
  ['dbl',{en:'double consonant → single',lv:'dubults līdzskanis → viens'},s=>s.replace(/([bdfgklmnprtvc])\1/g,'$1').replace(/ss(?=[aeiouāēīū])/g,'s')],
  ['stk',{en:'crossed letters → ļ ņ ķ ģ',lv:'pārsvītrotie burti → ļ ņ ķ ģ'},s=>s.replace(/[łꞥꞣꞡŗ]/g,c=>({'ł':'ļ','ꞥ':'ņ','ꞣ':'ķ','ꞡ':'ģ','ŗ':'r'})[c])],
];
function modernize(old,skip){
  const up=old.charAt(0)!==old.charAt(0).toLowerCase();
  let s=old.toLowerCase().replace(/[ſꞩ]/g,'s');const used=[];
  for(const[id,label,f]of MOD_RULES){if(id===skip)continue;const n=f(s);if(n!==s)used.push(L(label));s=n;}
  return{text:up?cap1(s):s,used};
}
function wordDistractors(v,n=3){
  const correct=norm(v.mod);const out=new Set();
  const capLike=x=>v.mod.charAt(0)===v.mod.charAt(0).toUpperCase()?cap1(x):x.toLowerCase();
  shuffle(MOD_RULES).forEach(([id])=>{const x=capLike(modernize(v.old,id).text);if(norm(x)!==correct)out.add(x);});
  const plain=capLike(v.mod.normalize('NFD').replace(/[̦̄̌]/g,'').normalize('NFC'));
  if(norm(plain)!==correct)out.add(plain);
  let arr=shuffle([...out]).slice(0,n);
  for(const o of shuffle(VOCAB)){if(arr.length>=n)break;if(norm(o.mod)!==correct&&!arr.includes(o.mod))arr.push(o.mod);}
  return arr;
}
function gloss(word){
  const k=word.toLowerCase().replace(/ſ/g,'s');
  if(V[k])return{mod:V[k].mod,en:V[k].en,known:true};
  if(GLOSS_EXTRA[k])return{mod:GLOSS_EXTRA[k][0],en:GLOSS_EXTRA[k][1],known:true};
  const m=modernize(word);return{mod:m.text,en:null,known:false,used:m.used};
}

/* ===================== SOUND / HAPTICS / FX ===================== */
let AC=null;
function tone(seq){if(!S.settings.sound)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime;seq.forEach(([f,d,st,type='sine',vol=.12])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t0+st);g.gain.linearRampToValueAtTime(vol,t0+st+.01);g.gain.exponentialRampToValueAtTime(.001,t0+st+d);o.connect(g).connect(AC.destination);o.start(t0+st);o.stop(t0+st+d+.02);});}catch(e){}}
// bell-like tones (a nod to church bells rather than game chimes)
const sfx={good:()=>tone([[784,.25,0,'sine',.1],[1176,.35,.08,'sine',.06]]),bad:()=>tone([[196,.3,0,'triangle',.14]]),tap:()=>tone([[660,.04,0,'sine',.04]]),done:()=>tone([[523,.5,0,'sine',.1],[659,.5,.18,'sine',.09],[784,.6,.36,'sine',.09],[1047,.9,.54,'sine',.07]]),ach:()=>tone([[880,.4,0],[1320,.6,.12,'sine',.07]])};
function buzz(p){if(S.settings.haptics&&navigator.vibrate)try{navigator.vibrate(p);}catch(e){}}
function toast(html,ms=2800){const el=h(`<div class="toast">${html}</div>`);$('#toast').append(el);setTimeout(()=>el.remove(),ms);}
function confetti(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const c=$('#confetti');c.hidden=false;const x=c.getContext('2d');const W=c.width=innerWidth,H=c.height=innerHeight;
  const cs=getComputedStyle(document.documentElement);const cols=['--accent','--gold-2','--u2','--u4'].map(v=>cs.getPropertyValue(v).trim());
  // falling gold leaf rather than confetti
  const P=Array.from({length:60},()=>({x:Math.random()*W,y:-20-Math.random()*H*.4,vx:(Math.random()-.5)*1.2,vy:1.5+Math.random()*2,r:Math.random()*5+3,c:pick(cols),a:Math.random()*6,va:(Math.random()-.5)*.12,ph:Math.random()*6}));
  let f=0;(function step(){x.clearRect(0,0,W,H);P.forEach(p=>{p.ph+=.05;p.x+=p.vx+Math.sin(p.ph)*.8;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.beginPath();x.ellipse(0,0,p.r,p.r*.45,0,0,7);x.fill();x.restore();});if(++f<150)requestAnimationFrame(step);else{x.clearRect(0,0,W,H);c.hidden=true;}})();
}
let lvVoice=null;
function initVoices(){try{const pv=()=>{lvVoice=speechSynthesis.getVoices().find(v=>/^lv/i.test(v.lang))||null;};pv();speechSynthesis.onvoiceschanged=pv;}catch(e){}}
function speak(text){if(!lvVoice)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.voice=lvVoice;u.lang=lvVoice.lang;u.rate=.85;speechSynthesis.speak(u);}catch(e){}}
const speakBtn=text=>lvVoice?`<button class="speak" data-speak="${esc(text)}" aria-label="Listen">${ic('sound')}</button>`:'';
document.addEventListener('click',e=>{const b=e.target.closest('[data-speak]');if(b)speak(b.dataset.speak);});

/* ===================== THEME ===================== */
function applyTheme(){const th=S.settings.theme;if(th==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',th);document.documentElement.lang=LANG;}
const cssv=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ===================== SHEETS ===================== */
function openSheet(html,{full=false,onClose}={}){
  const w=h(`<div class="sheet-wrap"><div class="scrim"></div><div class="sheet ${full?'full':''}" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div></div>`);
  let closed=false;
  const close=()=>{if(closed)return;closed=true;w.classList.remove('open');setTimeout(()=>w.remove(),230);onClose&&onClose();};
  w.close=close;$('.scrim',w).onclick=close;
  $('#sheets').append(w);
  w.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close();});
  requestAnimationFrame(()=>requestAnimationFrame(()=>w.classList.add('open')));
  return w;
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const w=$$('.sheet-wrap').pop();if(w)w.close();}});
const closeBtn=()=>`<button class="iconbtn" data-close aria-label="${esc(t('close'))}">${ic('x')}</button>`;
const backBtn=()=>`<button class="iconbtn" data-close aria-label="${esc(t('back'))}">${ic('back')}</button>`;

/* ===================== DRAWING & MATCHING ===================== */
function drawChar(ctx,ch,x,y,px,color,center=true){
  const base=STK[ch]||ch;ctx.font=`${px}px "Gotika Fraktur"`;ctx.fillStyle=color;ctx.textBaseline='alphabetic';
  const w=ctx.measureText(base).width;const left=center?x-w/2:x;ctx.fillText(base,left,y);
  if(STK[ch]){ctx.strokeStyle=color;ctx.lineWidth=px*.075;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(left-w*.15,y-px*.17);ctx.lineTo(left+w*1.15,y-px*.43);ctx.stroke();}
  return w;
}
function glyphLayout(ctx,ch,S0){
  let px=S0*.6;ctx.font=`${px}px "Gotika Fraktur"`;
  const m=ctx.measureText(STK[ch]||ch);const w=m.width,asc=m.actualBoundingBoxAscent||px*.7,desc=m.actualBoundingBoxDescent||0;
  const sc=Math.min(1,(S0*.78)/w,(S0*.8)/(asc+desc+1));px*=sc;
  const base=S0*.66+((asc-desc)*sc-px*.5)*.25;
  return{px,base:clamp(base,S0*.5,S0*.78)};
}
let SCORE_N=48,SCORE_R=3,MASK_T=40,LEN_K=1.4,TPL_T=12;const SCORE_SZ=256;let tplCache={};
function maskFrom(canvas,N,thr=MASK_T){
  const w=canvas.width,hh=canvas.height,ctx=canvas.getContext('2d',{willReadFrequently:true});const d=ctx.getImageData(0,0,w,hh).data;
  let x0=w,y0=hh,x1=-1,y1=-1,cnt=0;
  for(let y=0;y<hh;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>90){cnt++;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}
  const out=new Uint8Array(N*N);if(!cnt)return{m:out,n:0};
  const bw=x1-x0+1,bh=y1-y0+1,sc=(N-6)/Math.max(bw,bh);const dw=bw*sc,dh=bh*sc;
  const c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d',{willReadFrequently:true});
  x.drawImage(canvas,x0,y0,bw,bh,(N-dw)/2,(N-dh)/2,dw,dh);
  const dd=x.getImageData(0,0,N,N).data;let n=0;for(let i=0;i<N*N;i++)if(dd[i*4+3]>thr){out[i]=1;n++;}
  return{m:out,n};
}
function dilate(m,N,r){const o=new Uint8Array(N*N);for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(m[y*N+x])for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(dx*dx+dy*dy>r*r+1)continue;const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<N&&Y<N)o[Y*N+X]=1;}return o;}
// Zhang–Suen thinning: both the printed glyph and the user's ink become 1px centre lines
function thin(m,N){
  const a=Uint8Array.from(m),I=(x,y)=>y*N+x;let ch=true;
  while(ch){ch=false;for(let pass=0;pass<2;pass++){const del=[];
    for(let y=1;y<N-1;y++)for(let x=1;x<N-1;x++){if(!a[I(x,y)])continue;
      const p2=a[I(x,y-1)],p3=a[I(x+1,y-1)],p4=a[I(x+1,y)],p5=a[I(x+1,y+1)],p6=a[I(x,y+1)],p7=a[I(x-1,y+1)],p8=a[I(x-1,y)],p9=a[I(x-1,y-1)];
      const B=p2+p3+p4+p5+p6+p7+p8+p9;if(B<2||B>6)continue;
      const q=[p2,p3,p4,p5,p6,p7,p8,p9,p2];let A=0;for(let i=0;i<8;i++)if(!q[i]&&q[i+1])A++;if(A!==1)continue;
      if(pass===0?(p2*p4*p6||p4*p6*p8):(p2*p4*p8||p2*p6*p8))continue;del.push(I(x,y));}
    if(del.length){ch=true;del.forEach(i=>a[i]=0);}}}
  return a;
}
function templateSkel(ch){
  const key=ch+'|'+SCORE_N;if(tplCache[key])return tplCache[key];
  const g=document.createElement('canvas');g.width=g.height=SCORE_SZ;const gx=g.getContext('2d',{willReadFrequently:true});
  const Lo=glyphLayout(gx,ch,SCORE_SZ);drawChar(gx,ch,SCORE_SZ/2,Lo.base,Lo.px,'#000');
  const T=maskFrom(g,SCORE_N,TPL_T);const sk=thin(T.m,SCORE_N);const r={sk,d:dilate(sk,SCORE_N,SCORE_R),n:sk.reduce((a,b)=>a+b,0)};
  if(T.n)tplCache[key]=r;return r;
}
function prepUser(canvas){const N=SCORE_N,U=maskFrom(canvas,N);if(!U.n)return null;const Us=thin(U.m,N);return{Us,Ud:dilate(Us,N,SCORE_R),n:Us.reduce((a,b)=>a+b,0)};}
function compareSkel(u,ch){
  const tp=templateSkel(ch);if(!u||!u.n||!tp.n)return 0;let p=0,r=0;const N=SCORE_N;
  for(let i=0;i<N*N;i++){if(u.Us[i]&&tp.d[i])p++;if(tp.sk[i]&&u.Ud[i])r++;}
  const P=p/u.n,R=r/tp.n;if(P+R===0)return 0;const ratio=u.n/tp.n,pen=ratio>LEN_K?Math.pow(LEN_K/ratio,.8):1;
  return 2*P*R/(P+R)*pen;
}
const scoreCanvas=(c,ch)=>compareSkel(prepUser(c),ch);
function strokesCanvas(strokes){
  const SZ=SCORE_SZ,pts=strokes.flat();const u=document.createElement('canvas');u.width=u.height=SZ;if(!pts.length)return u;
  const ux=u.getContext('2d',{willReadFrequently:true});
  let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;pts.forEach(p=>{x0=Math.min(x0,p.x);y0=Math.min(y0,p.y);x1=Math.max(x1,p.x);y1=Math.max(y1,p.y);});
  const sc=(SZ*.8)/Math.max(x1-x0,y1-y0,1),ox=(SZ-(x1-x0)*sc)/2,oy=(SZ-(y1-y0)*sc)/2,X=p=>(p.x-x0)*sc+ox,Y=p=>(p.y-y0)*sc+oy;
  ux.strokeStyle=ux.fillStyle='#000';ux.lineWidth=SZ*.045;ux.lineCap='round';ux.lineJoin='round';
  strokes.forEach(st=>{if(st.length===1){ux.beginPath();ux.arc(X(st[0]),Y(st[0]),SZ*.02,0,7);ux.fill();return;}ux.beginPath();st.forEach((p,i)=>i?ux.lineTo(X(p),Y(p)):ux.moveTo(X(p),Y(p)));ux.stroke();});
  return u;
}
const scoreStrokes=(strokes,ch)=>strokes.length?scoreCanvas(strokesCanvas(strokes),ch):0;
function topGuesses(strokes,n=3){const u=prepUser(strokesCanvas(strokes));if(!u)return[];return Object.keys(LETTERS).map(ch=>({ch,s:compareSkel(u,ch)})).sort((a,b)=>b.s-a.s).slice(0,n);}

function inkSeg(ctx,tool,S0,a,b){
  if(tool==='ink'){const w=S0*.024,an=-40*Math.PI/180,nx=Math.cos(an)*w,ny=Math.sin(an)*w;ctx.fillStyle=cssv('--nib');ctx.beginPath();ctx.moveTo(a.x+nx,a.y+ny);ctx.lineTo(b.x+nx,b.y+ny);ctx.lineTo(b.x-nx,b.y-ny);ctx.lineTo(a.x-nx,a.y-ny);ctx.closePath();ctx.fill();ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  else if(tool==='pencil'){ctx.lineCap='round';ctx.strokeStyle=cssv('--pencil');ctx.globalAlpha=.85;ctx.lineWidth=S0*.008+1.2;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.globalAlpha=.3;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x+.8,a.y-.6);ctx.lineTo(b.x+.8,b.y-.6);ctx.stroke();ctx.globalAlpha=1;}
  else{ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=cssv('--pen');ctx.lineWidth=S0*.012+1.5;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
}
function makePad({ch,guide=false,tool=S.settings.tool,hintable=false}){
  const T=TOOLS[tool];
  const el=h(`<div class="pad-wrap"><div class="pad"><canvas aria-label="${esc(t('pad_label'))}"></canvas></div>
    <div class="pad-tools">
      <span class="toolpill">${toolMini(tool)} ${esc(L(T.name))} · ×${T.mult} XP</span>
      ${T.undo?`<button class="toolpill tbtn" data-a="undo" disabled>${ic('undo')}${t('undo')}</button>`:''}
      <button class="toolpill tbtn" data-a="clear" disabled>${ic('clear')}${t('clear')}</button>
      ${hintable&&T.hint?`<button class="toolpill tbtn" data-a="hint">${ic('eye')}${t('hint')}</button>`:''}
    </div></div>`);
  const cv=$('canvas',el),box=$('.pad',el);let ctx,S0=300,dpr=1;
  const strokes=[];let cur=null,showGuide=guide,result=null;const api={el,strokes,hinted:false,onChange:null};
  function size(){const r=box.getBoundingClientRect();if(!r.width)return;S0=r.width;dpr=Math.min(3,devicePixelRatio||1);cv.width=S0*dpr;cv.height=S0*dpr;ctx=cv.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);redraw();}
  function paper(){
    ctx.clearRect(0,0,S0,S0);const Lo=glyphLayout(ctx,ch,S0);
    ctx.font=`${Lo.px}px "Gotika Fraktur"`;const mx=ctx.measureText('x').actualBoundingBoxAscent||Lo.px*.42;const mh=ctx.measureText('h').actualBoundingBoxAscent||Lo.px*.7;const mg=ctx.measureText('g').actualBoundingBoxDescent||Lo.px*.22;
    [[Lo.base-mh,'--guide',[6,6]],[Lo.base-mx,'--guide-2',[]],[Lo.base,'--guide-2',[]],[Lo.base+mg,'--guide',[6,6]]].forEach(([y,c,d])=>{ctx.strokeStyle=cssv(c);ctx.lineWidth=1.5;ctx.setLineDash(d);ctx.beginPath();ctx.moveTo(12,y);ctx.lineTo(S0-12,y);ctx.stroke();});ctx.setLineDash([]);
    if(showGuide){ctx.globalAlpha=.16;drawChar(ctx,ch,S0/2,Lo.base,Lo.px,cssv('--ink'));ctx.globalAlpha=1;}
    return Lo;
  }
  const seg=(a,b)=>inkSeg(ctx,tool,S0,a,b);
  function drawStroke(st){if(st.length===1)seg(st[0],{x:st[0].x+.8,y:st[0].y+.8});for(let i=1;i<st.length;i++)seg(st[i-1],st[i]);}
  function redraw(){if(!ctx)return;const Lo=paper();strokes.forEach(drawStroke);
    if(result){ctx.globalAlpha=.35;drawChar(ctx,ch,S0/2,Lo.base,Lo.px,cssv(result.ok?'--good':'--bad'));ctx.globalAlpha=1;}}
  const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*S0/r.width,y:(e.clientY-r.top)*S0/r.height};};
  cv.addEventListener('pointerdown',e=>{if(result)return;e.preventDefault();cv.setPointerCapture(e.pointerId);cur=[pos(e)];strokes.push(cur);drawStroke(cur);});
  cv.addEventListener('pointermove',e=>{if(!cur)return;const p=pos(e),l=cur[cur.length-1];if(Math.hypot(p.x-l.x,p.y-l.y)<1.5)return;cur.push(p);seg(l,p);});
  const end=()=>{if(!cur)return;cur=null;changed();};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  function changed(){$$('[data-a="undo"],[data-a="clear"]',el).forEach(b=>b.disabled=!strokes.length);api.onChange&&api.onChange(strokes.length>0);}
  el.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const a=b.dataset.a;
    if(a==='undo'){strokes.pop();redraw();changed();}
    if(a==='clear'){strokes.length=0;redraw();changed();}
    if(a==='hint'){showGuide=true;api.hinted=true;b.disabled=true;redraw();}});
  api.score=()=>scoreStrokes(strokes,ch);
  api.guesses=()=>topGuesses(strokes);
  api.showResult=(ok,score)=>{result={ok};redraw();box.querySelector('.score')?.remove();box.append(h(`<span class="score" style="color:var(${ok?'--good':'--bad'})">${Math.round(score*100)}%</span>`));};
  api.reset=()=>{result=null;strokes.length=0;box.querySelector('.score')?.remove();redraw();changed();};
  api.setGuide=v=>{showGuide=v;redraw();};
  new ResizeObserver(()=>size()).observe(box);
  return api;
}
function toolMini(tool){return `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${tool==='ink'?'<path d="M12 3l4 8-4 10-4-10z"/><path d="M12 11v4"/>':tool==='pencil'?'<path d="M15 4l5 5L9 20H4v-5z"/><path d="M4 15l5 5" />':'<path d="M18 3l3 3L9 18l-5 2 2-5z"/>'}</svg>`;}

/* ===================== EXERCISES ===================== */
function choiceEx({kind,title,prompt,options,answer,answerHTML,list=false,onResult}){
  const el=h(`<div class="stack"><div><div class="q-kind">${kind}</div><div class="q-title">${title}</div></div>${prompt}
    <div class="options ${list?'list':''}" role="group">${options.map((o,i)=>`<button class="opt" data-k="${esc(o.key)}"><span class="k">${i+1}</span>${o.html}</button>`).join('')}</div></div>`);
  let sel=null;const ex={el,ready:false};
  $$('.opt',el).forEach(b=>b.onclick=()=>{if(ex.locked)return;sfx.tap();$$('.opt',el).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b.dataset.k;ex.setReady(true);});
  ex.key=n=>{const b=$$('.opt',el)[n-1];b&&b.click();};
  ex.check=()=>{ex.locked=true;const ok=sel===answer;$$('.opt',el).forEach(b=>{if(b.dataset.k===answer)b.classList.add('right');else if(b.dataset.k===sel)b.classList.add('wrong');});onResult&&onResult(ok);return{ok,answer:answerHTML};};
  return ex;
}
function letterOpts(c,pool,asGlyph){
  let d=[...(CONF[c]||'')].filter(x=>LETTERS[x]&&x!==c&&LETTERS[x].lat!==LETTERS[c].lat);
  const extra=shuffle(pool.filter(x=>x!==c&&!d.includes(x)&&LETTERS[x].lat!==LETTERS[c].lat));
  d=[...new Set([...shuffle(d).slice(0,2),...extra,...shuffle(Object.keys(LETTERS).filter(x=>x!==c&&LETTERS[x].lat!==LETTERS[c].lat))])].slice(0,3);
  return shuffle([c,...d]).map(x=>({key:x,html:asGlyph?glyphH(x):`<span>${esc(letterName(x))}</span>`}));
}
function trackLetter(c,ok){const r=S.letters[c]||(S.letters[c]={r:0,w:0});ok?r.r++:r.w++;if(ok&&(c==='ſ'||c==='f'))bump('longS');}
const enGloss=en=>LANG==='en'?`<span class="muted">(${esc(en)})</span>`:'';

const EX = {
  intro(it){const Lt=LETTERS[it.c];return{card:true,el:h(`<div class="intro"><div class="q-kind">${t('new_letter')}</div>
    <div class="pair"><div class="big">${stk(it.c)}</div><div class="lat">${esc(Lt.lat)}</div></div>
    <div class="tipbox">${stkRaw(L(Lt.tip))}</div></div>`)};},
  pickLatin(it){return choiceEx({kind:t('recognise'),title:t('which_letter'),prompt:`<div class="q-glyph">${stk(it.c)}</div>`,
    options:letterOpts(it.c,it.pool,false),answer:it.c,answerHTML:`${glyphH(it.c)} = <b>${esc(letterName(it.c))}</b>`,onResult:ok=>trackLetter(it.c,ok)});},
  pickGlyph(it){return choiceEx({kind:t('find_it'),title:t('tap_fraktur',{x:esc(letterName(it.c))}),prompt:'',
    options:letterOpts(it.c,it.pool,true),answer:it.c,answerHTML:`<b>${esc(letterName(it.c))}</b> = ${glyphH(it.c)}`,onResult:ok=>trackLetter(it.c,ok)});},
  matchLetters(it){return matchEx(t('match_title'),t('match_letters'),it.cs.map(c=>({k:c,a:glyphH(c),b:esc(letterName(c))})));},
  trace(it){return drawEx(it,true);},
  draw(it){return drawEx(it,false);},
  rule(it){const R=RULES[it.rule];return{card:true,el:h(`<div class="stack"><div><div class="q-kind">${t('rule')}</div><div class="q-title">${stk(L(R.title))}</div></div>
    <div class="tipbox">${stkRaw(L(R.body))}</div>
    <div class="card"><div class="rule-ex">${R.ex.map(([o,m])=>`${frH(o)}<b>${stk(o)}</b><span><span class="arr">→</span> ${esc(m)}</span>`).join('')}</div></div></div>`)};},
  wordCard(it){const v=it.v;return{card:true,el:h(`<div class="intro"><div class="q-kind">${t('new_word')}</div>
    <div class="q-word">${frH(v.old)}</div><div class="q-old">${stk(v.old)}</div>
    <div class="tipbox" style="text-align:center"><div style="font-size:24px;font-weight:700">${esc(v.mod)}</div><div class="muted">${LANG==='en'?esc(v.en):`angliski: ${esc(v.en)}`}</div></div>${speakBtn(v.mod)}</div>`)};},
  old2new(it){const v=it.v;const opts=shuffle([v.mod,...wordDistractors(v)]).map(x=>({key:x,html:`<span>${esc(x)}</span>`}));
    return choiceEx({kind:it.fr?t('read_fraktur'):t('old_spelling'),title:t('how_today'),
      prompt:it.fr?`<div class="q-word">${frH(v.old)}</div>`:`<div class="q-old">${stk(v.old)}</div>`,
      options:opts,answer:v.mod,answerHTML:`${it.fr?frH(v.old):`<b>${stk(v.old)}</b>`} = <b>${esc(v.mod)}</b> ${enGloss(v.en)}`});},
  meaning(it){
    if(LANG!=='en')return EX.old2new({v:it.v,fr:true});
    const v=it.v;const others=sample(VOCAB.filter(o=>o.en!==v.en),3).map(o=>o.en);const opts=shuffle([v.en,...others]).map(x=>({key:x,html:`<span>${esc(x)}</span>`}));
    return choiceEx({kind:t('meaning'),title:t('what_mean'),prompt:`<div class="q-word">${frH(v.old)}</div>`,options:opts,list:true,answer:v.en,answerHTML:`${frH(v.old)} = <b>${esc(v.mod)}</b>, “${esc(v.en)}”`});},
  matchWords(it){return matchEx(t('match_title'),t('match_words'),it.vs.map(v=>({k:v.old,a:frH(v.old),b:esc(v.mod)})));},
  type(it){return typeEx(it.v);},
  build(it){const v=it.v;const chunks=chunkWord(v.mod);const extra=chunkWord(pick(wordDistractors(v,2))).slice(0,2);return buildEx({kind:t('spell_it'),title:t('build_word'),prompt:`<div class="q-word">${frH(v.old)}</div>`,parts:chunks,extra,joiner:'',answerHTML:`<b>${esc(v.mod)}</b>`});},
  phraseCard(it){const p=it.p;return{card:true,el:h(`<div class="intro"><div class="q-kind">${t('new_phrase')}</div><div class="q-word" style="font-size:38px">${frH(p.old)}</div>
    <div class="q-old" style="font-size:20px">${stk(p.old)}</div><div class="tipbox" style="text-align:center"><div style="font-size:21px;font-weight:700">${esc(p.mod)}</div><div class="muted">${LANG==='en'?esc(p.en):`angliski: ${esc(p.en)}`}</div></div>${speakBtn(p.mod)}</div>`)};},
  phraseChoice(it){const p=it.p;const opts=shuffle([p,...sample(PHRASES.filter(x=>x!==p),3)]).map(x=>({key:x.mod,html:`<span>${esc(x.mod)}</span>`}));
    return choiceEx({kind:t('read_fraktur'),title:t('choose_modern'),prompt:`<div class="q-word" style="font-size:36px">${frH(p.old)}</div>`,options:opts,list:true,answer:p.mod,answerHTML:`<b>${esc(p.mod)}</b>`});},
  phraseMeaning(it){if(LANG!=='en')return EX.phraseBuild(it);const p=it.p;const opts=shuffle([p,...sample(PHRASES.filter(x=>x!==p),3)]).map(x=>({key:x.en,html:`<span>${esc(x.en)}</span>`}));
    return choiceEx({kind:t('meaning'),title:t('what_mean_p'),prompt:`<div class="q-word" style="font-size:36px">${frH(p.old)}</div>`,options:opts,list:true,answer:p.en,answerHTML:`“${esc(p.en)}”`});},
  phraseBuild(it){const p=it.p;const words=p.mod.split(' ');const extra=sample(PHRASES.filter(x=>x!==p).flatMap(x=>x.mod.split(' ')).filter(w=>!words.includes(w)),2);
    return buildEx({kind:t('translate'),title:t('build_phrase'),prompt:`<div class="q-word" style="font-size:36px">${frH(p.old)}</div>`,parts:words,extra,joiner:' ',answerHTML:`<b>${esc(p.mod)}</b>`});},
};
function chunkWord(w){const out=[];let i=0;const s=[...w];while(i<s.length){const n=s.length-i<=3?s.length-i:(Math.random()<.5?2:3);out.push(s.slice(i,i+n).join(''));i+=n;}return out;}
function matchEx(title,sub,pairs){
  const el=h(`<div class="stack"><div><div class="q-kind">${t('pairs')}</div><div class="q-title">${title}</div><p class="muted">${sub}</p></div>
    <div class="match"><div class="col">${shuffle(pairs).map(p=>`<button class="opt" data-s="a" data-k="${esc(p.k)}">${p.a}</button>`).join('')}</div>
    <div class="col">${shuffle(pairs).map(p=>`<button class="opt" data-s="b" data-k="${esc(p.k)}">${p.b}</button>`).join('')}</div></div></div>`);
  const ex={el,ready:false,auto:true};let selA=null,selB=null,left=pairs.length,miss=0;
  el.addEventListener('click',e=>{const b=e.target.closest('.opt');if(!b||b.classList.contains('done'))return;sfx.tap();
    if(b.dataset.s==='a'){selA&&selA.classList.remove('sel');selA=b;}else{selB&&selB.classList.remove('sel');selB=b;}b.classList.add('sel');
    if(selA&&selB){if(selA.dataset.k===selB.dataset.k){[selA,selB].forEach(x=>{x.classList.remove('sel');x.classList.add('right');setTimeout(()=>x.classList.add('done'),250);});left--;sfx.good();if(!left)setTimeout(()=>ex.finish&&ex.finish(),350);}
      else{miss++;sfx.bad();buzz(40);[selA,selB].forEach(x=>{x.classList.remove('sel');x.classList.add('shake','wrong');setTimeout(()=>x.classList.remove('shake','wrong'),400);});}
      selA=selB=null;}});
  ex.check=()=>({ok:miss<=1,answer:miss<=1?'':t('match_fail')});
  return ex;
}
function buildEx({kind,title,prompt,parts,extra,joiner,answerHTML}){
  const answer=parts.join(joiner);
  const tiles=shuffle([...parts,...extra].map((x,i)=>({x,i})));
  const el=h(`<div class="stack"><div><div class="q-kind">${kind}</div><div class="q-title">${title}</div></div>${prompt}
    <div class="tiles-ans" aria-label="${esc(t('your_answer'))}"></div><div class="tiles">${tiles.map(o=>`<button class="tile" data-i="${o.i}">${esc(o.x)}</button>`).join('')}</div></div>`);
  const ans=$('.tiles-ans',el),ex={el,ready:false};const chosen=[];
  el.addEventListener('click',e=>{if(ex.locked)return;const b=e.target.closest('.tile');if(!b)return;sfx.tap();
    if(b.parentElement===ans){const src=$(`.tiles .tile[data-i="${b.dataset.i}"]`,el);src.classList.remove('used');b.remove();chosen.splice(chosen.indexOf(b.dataset.i),1);}
    else{if(b.classList.contains('used'))return;b.classList.add('used');ans.append(b.cloneNode(true));chosen.push(b.dataset.i);}
    ex.setReady(chosen.length>0);});
  ex.check=()=>{ex.locked=true;const got=$$('.tile',ans).map(b=>b.textContent).join(joiner);return{ok:norm(got)===norm(answer),answer:answerHTML};};
  return ex;
}
function typeEx(v){
  const keys=['ā','ē','ī','ū','č','š','ž','ģ','ķ','ļ','ņ'];
  const el=h(`<div class="stack"><div><div class="q-kind">${t('type_it')}</div><div class="q-title">${t('type_title')}</div></div>
    <div class="q-word">${frH(v.old)}</div>
    <input class="typebox" id="typebox" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(t('type_ph'))}" aria-label="${esc(t('type_ph'))}">
    <div class="keys">${keys.map(k=>`<button class="key" data-key="${k}">${k}</button>`).join('')}</div></div>`);
  const inp=$('input',el),ex={el,ready:false};
  inp.addEventListener('input',()=>ex.setReady(inp.value.trim().length>0));
  el.addEventListener('click',e=>{const b=e.target.closest('[data-key]');if(!b)return;const s=inp.selectionStart??inp.value.length;inp.value=inp.value.slice(0,s)+b.dataset.key+inp.value.slice(inp.selectionEnd??s);inp.focus();inp.setSelectionRange(s+1,s+1);ex.setReady(true);});
  ex.focus=()=>setTimeout(()=>inp.focus({preventScroll:true}),50);
  ex.check=()=>{ex.locked=true;inp.disabled=true;const g=inp.value;
    if(norm(g)===norm(v.mod)){bump('typed');return{ok:true,answer:`<b>${esc(v.mod)}</b>`};}
    if(stripMarks(g)===stripMarks(v.mod)){bump('typed');return{ok:true,answer:`${t('almost')}<b>${esc(v.mod)}</b>`};}
    return{ok:false,answer:`<b>${esc(v.mod)}</b> ${enGloss(v.en)}`};};
  return ex;
}
function drawEx(it,trace){
  const tool=S.settings.tool,T=TOOLS[tool];
  const el=h(`<div class="stack"><div><div class="q-kind">${trace?t('trace'):t('from_memory')}</div><div class="q-title">${trace?t('trace_title',{x:esc(letterName(it.c))}):t('draw_title',{x:esc(letterName(it.c))})}</div></div></div>`);
  const pad=makePad({ch:it.c,guide:trace,tool,hintable:!trace});el.append(pad.el);
  const ex={el,ready:false,draw:true,pad};
  pad.onChange=v=>ex.setReady(v);
  ex.check=()=>{const sc=pad.score();const thr=T.thr-(trace?0:.05);const ok=sc>=thr;pad.showResult(ok,sc);
    if(ok){bump('draws');bump(tool+'Draws');}
    const p=Math.round(sc*100);
    let ans=ok?t(sc>.75?'draw_ok_hi':'draw_ok',{p}):t('draw_bad',{p,t:Math.round(thr*100)});
    if(!ok){const g=pad.guesses();if(g[0]&&g[0].ch!==it.c)ans+=' '+t('looks_like',{x:g.slice(0,2).map(x=>glyphH(x.ch)).join(' ')});}
    return{ok,score:sc,answer:ans,retryable:true,xp:ok?Math.round(2*(pad.hinted?1:T.mult)):0};};
  ex.retry=()=>{pad.reset();ex.locked=false;};
  return ex;
}

/* ===================== LESSON BUILDERS ===================== */
function prevLetters(lesson){const out=[];for(const l of ALL_LESSONS){if(l===lesson)break;if(l.k==='letters')out.push(...l.letters);}return out;}
function buildItems(lesson){
  const it=[];const noDraw=Date.now()<(S.noDrawUntil||0);
  const D=x=>noDraw?null:x;
  if(lesson.k==='letters'){
    const Ls=lesson.letters,pool=[...new Set([...Ls,...prevLetters(lesson).slice(-8)])];
    Ls.forEach(c=>{it.push({t:'intro',c},{t:'pickLatin',c,pool});});
    const prac=[];
    sample(Ls,Math.min(3,Ls.length)).forEach(c=>prac.push(D({t:'trace',c})));
    sample(Ls,2).forEach(c=>prac.push({t:'pickGlyph',c,pool}));
    sample(Ls,2).forEach(c=>prac.push({t:'pickLatin',c,pool}));
    prac.push({t:'matchLetters',cs:sample(Ls,Math.min(4,Ls.length))});
    prac.push(D({t:'draw',c:pick(Ls)}));
    const prev=prevLetters(lesson);if(prev.length)sample(prev,2).forEach(c=>prac.push({t:'pickLatin',c,pool:prev}));
    it.push(...shuffle(prac.filter(Boolean)));
  }else if(lesson.k==='review'){
    const P=[...lesson.pool].filter(c=>LETTERS[c]);
    sample(P,5).forEach(c=>it.push({t:'pickLatin',c,pool:P}));
    sample(P,3).forEach(c=>it.push({t:'pickGlyph',c,pool:P}));
    it.push({t:'matchLetters',cs:sample(P,4)});
    it.push(D({t:'trace',c:pick(P)}),D({t:'draw',c:pick(P)}),D({t:'draw',c:pick(P)}));
    return[it[0],...shuffle(it.slice(1).filter(Boolean))];
  }else if(lesson.k==='rule'){
    const R=RULES[lesson.rule];const vs=R.ex.map(([o,m])=>V[o.toLowerCase()]||{old:o,mod:m,en:''});
    it.push({t:'rule',rule:lesson.rule});
    const prac=[];
    vs.forEach(v=>prac.push({t:'old2new',v,fr:false}));
    sample(vs,2).forEach(v=>prac.push({t:'old2new',v,fr:true}));
    prac.push({t:'build',v:pick(vs)},{t:'type',v:pick(vs)},{t:'matchWords',vs:sample(vs,4)});
    it.push(...shuffle(prac));
  }else if(lesson.k==='words'){
    const W=lesson.words,a=W.slice(0,4),b=W.slice(4);
    [a,b].forEach(g=>{if(!g.length)return;g.forEach(v=>it.push({t:'wordCard',v}));
      const prac=g.map(v=>({t:'old2new',v,fr:true}));sample(g,2).forEach(v=>prac.push({t:'meaning',v}));if(g.length>=3)prac.push({t:'matchWords',vs:g});prac.push({t:'type',v:pick(g)});
      it.push(...shuffle(prac));});
    it.push({t:'build',v:pick(W)});
  }else if(lesson.k==='phrases'){
    lesson.phrases.forEach(p=>it.push({t:'phraseCard',p},{t:'phraseChoice',p}));
    const prac=[];sample(lesson.phrases,2).forEach(p=>prac.push({t:'phraseBuild',p}));sample(lesson.phrases,2).forEach(p=>prac.push({t:'phraseMeaning',p}));
    it.push(...shuffle(prac));
  }else if(lesson.k==='quick'){
    const Ls=learnedLetters(),Ws=learnedWords();
    if(Ls.length){sample(Ls,4).forEach(c=>it.push({t:'pickLatin',c,pool:Ls}));sample(Ls,2).forEach(c=>it.push({t:'pickGlyph',c,pool:Ls}));it.push(D({t:'draw',c:pick(Ls)}));}
    if(Ws.length){sample(Ws,3).forEach(v=>it.push({t:'old2new',v,fr:true}));sample(Ws,1).forEach(v=>it.push({t:'meaning',v}));it.push({t:'type',v:pick(Ws)});}
    return shuffle(it.filter(Boolean)).slice(0,12);
  }else if(lesson.k==='test'){
    const Ls=UNITS.slice(0,lesson.ui).flatMap(u=>u.lessons.filter(l=>l.k==='letters').flatMap(l=>l.letters));
    const Ws=UNITS.slice(0,lesson.ui).flatMap(u=>u.lessons.flatMap(l=>l.k==='words'?l.words:l.k==='rule'?RULES[l.rule].ex.map(([o])=>V[o.toLowerCase()]).filter(Boolean):[]));
    sample(Ls,Ws.length?5:8).forEach(c=>it.push({t:pick(['pickLatin','pickGlyph']),c,pool:Ls}));
    if(Ws.length)sample(Ws,5).forEach(v=>it.push({t:'old2new',v,fr:true}));
    return shuffle(it);
  }
  return it.filter(Boolean);
}

/* ===================== LESSON PLAYER ===================== */
let LS=null;
function startLesson(lesson){
  const items=buildItems(lesson);if(!items.length){toast(t('first_lesson'));return;}
  items.forEach((x,i)=>x.uid=i);
  LS={lesson,items,i:0,qTotal:items.filter(x=>!['intro','rule','wordCard','phraseCard'].includes(x.t)).length,right:0,miss:0,combo:0,xpDraw:0,t0:Date.now(),seenWrong:new Set(),done:0};
  const root=$('#lesson');root.hidden=false;
  root.innerHTML=`<div class="lesson-in"><div class="lhead"><button class="iconbtn" id="lquit" aria-label="${esc(t('quit'))}">${ic('x')}</button><div class="bar"><i></i></div><div class="combo" id="lcombo"></div></div>
    <div class="lbody" id="lbody"></div><div class="lfoot" id="lfoot"></div></div>`;
  $('#lquit').onclick=quitLesson;
  renderItem();
}
function quitLesson(){
  if(!LS||LS.finished){closeLesson();return;}
  const w=openSheet(`<div class="sheet-head"><h2>${t('quit_title')}</h2></div><p class="muted">${t('quit_body')}</p>
    <button class="btn block" data-close>${t('keep')}</button><button class="btn ghost block" id="qq">${t('quit')}</button>`);
  $('#qq',w).onclick=()=>{w.close();closeLesson();};
}
function closeLesson(){$('#lesson').hidden=true;$('#lesson').innerHTML='';LS=null;render();}
function setProgress(){const p=LS.done/(LS.done+LS.items.length-LS.i);$('.lhead .bar>i').style.width=(clamp(p,0,1)*100)+'%';$('#lcombo').textContent=LS.combo>=3?`${LS.combo}×`:'';}
function renderItem(){
  setProgress();
  const item=LS.items[LS.i];if(!item){finishLesson();return;}
  const body=$('#lbody'),foot=$('#lfoot');body.innerHTML='';foot.className='lfoot';foot.innerHTML='';
  const ex=EX[item.t](item);LS.ex=ex;body.append(ex.el);body.scrollTop=0;
  if(ex.card){foot.innerHTML=`<button class="btn block" id="lmain">${t('continue_')}</button>`;$('#lmain').onclick=next;return;}
  foot.innerHTML=`${ex.draw?`<button class="btn ghost small" id="lskip" style="align-self:center">${t('cant_draw')}</button>`:''}<button class="btn block" id="lmain" disabled>${t('check')}</button>`;
  const btn=$('#lmain');ex.setReady=v=>{ex.ready=v;btn.disabled=!v;};
  btn.onclick=()=>doCheck();
  if(ex.auto){btn.hidden=true;ex.finish=()=>doCheck();}
  if(ex.draw)$('#lskip').onclick=()=>{S.noDrawUntil=Date.now()+15*60e3;save();LS.items=LS.items.filter((x,i)=>i<=LS.i||!['trace','draw'].includes(x.t));LS.qTotal=Math.max(1,LS.qTotal-1);toast(t('draw_off'));next();};
  ex.focus&&ex.focus();
}
function doCheck(){
  const ex=LS.ex,item=LS.items[LS.i];if(ex.checked)return;ex.checked=true;
  const res=ex.check();const first=!LS.seenWrong.has(item.uid)&&!item.retry;
  if(res.ok){if(first)LS.right++;LS.combo++;LS.xpDraw+=res.xp||0;sfx.good();buzz(15);}
  else{LS.miss++;LS.combo=0;sfx.bad();buzz([30,40,30]);if(!LS.seenWrong.has(item.uid)){LS.seenWrong.add(item.uid);LS.items.push({...item,retry:true});}}
  const foot=$('#lfoot');foot.className='lfoot '+(res.ok?'good':'bad');
  foot.innerHTML=`<div class="verdict"><div class="t"><h3>${res.ok?pick(PRAISE):t('not_quite')}</h3>${res.answer?`<div class="ans">${res.ok?'':t('correct_answer')}${res.answer}</div>`:''}</div>
    <button class="iconbtn" id="lflag" aria-label="${esc(t('report_q'))}">${ic('flag')}</button></div>
    ${!res.ok&&res.retryable?`<button class="btn ghost block" id="lretry">${t('try_again')}</button>`:''}
    <button class="btn block ${res.ok?'good':'bad'}" id="lmain">${t('continue_')}</button>`;
  $('#lmain').onclick=()=>next();$('#lmain').focus({preventScroll:true});
  $('#lflag').onclick=()=>openFeedback({category:'content',context:`Lesson "${L(LS.lesson.title)}" (${LS.lesson.id}), task ${item.t}${item.c?` letter ${item.c}`:''}${item.v?` word ${item.v.old}`:''}${item.p?` phrase ${item.p.old}`:''}`});
  if($('#lretry'))$('#lretry').onclick=()=>{ex.checked=false;ex.retry();foot.className='lfoot';foot.innerHTML=`<button class="btn block" id="lmain" disabled>${t('check')}</button>`;const b=$('#lmain');ex.setReady=v=>{b.disabled=!v;};b.onclick=()=>doCheck();
    const qi=LS.items.findIndex((x,i)=>i>LS.i&&x.uid===item.uid&&x.retry);if(qi>0)LS.items.splice(qi,1);LS.seenWrong.delete(item.uid);LS.miss--;};
  setProgress();
}
function next(){LS.done++;LS.i++;renderItem();}
function checkChallenge(){const ch=challengeToday(),td=today();if(!td.chal&&(td[ch.key]||0)>=ch.goal){td.chal=true;bump('challenges');addXP(15);return true;}return false;}
function checkAch(){const out=[];ACH.forEach(a=>{if(!S.ach[a.id]&&a.t(S)){S.ach[a.id]=Date.now();out.push(a);}});if(out.length)save();return out;}
function achToasts(list,delay=0){list.forEach((a,i)=>setTimeout(()=>{sfx.ach();toast(`<div class="medal">${stk(a.g)}</div><div><div class="tiny" style="color:inherit;opacity:.7">${t('achievement')}</div>${esc(L(a.n))}</div>`,3500);},delay+i*900));}
function lessonIndex(id){return ALL_LESSONS.findIndex(l=>l.id===id);}
function finishLesson(){
  LS.finished=true;const Ls=LS.lesson;
  const acc=LS.qTotal?clamp(LS.right/LS.qTotal,0,1):1;const perfect=LS.miss===0;
  const st=acc>=.95?3:acc>=.75?2:1;
  let xp=10+LS.right+LS.xpDraw+(perfect?5:0);
  const prev=S.lessons[Ls.id];const wasNew=!prev&&!!LESSON[Ls.id];
  const sceneBefore=lessonIndex(Ls.id);
  if(LESSON[Ls.id])S.lessons[Ls.id]={stars:Math.max(st,prev?.stars||0),plays:(prev?.plays||0)+1};
  if(Ls.k==='quick')bump('reviews');
  if(Ls.k==='test'&&LS.miss<=2){S.unitUnlocked=Math.max(S.unitUnlocked,Ls.ui);UNITS.slice(0,Ls.ui).forEach(u=>u.lessons.forEach(l=>{if(!S.lessons[l.id])S.lessons[l.id]={stars:1,plays:0,skipped:true};}));}
  bump('lessons');if(perfect)bump('perfect');
  const hr=new Date().getHours();if(hr>=22)S.stats.owl=true;if(hr<7)S.stats.lark=true;
  const lvBefore=levelOf(S.xp).level;
  const goalHit=addXP(xp);
  const chalDone=checkChallenge();if(chalDone)xp+=15;
  const lv=levelOf(S.xp);
  save();const newAch=checkAch();
  const secs=Math.round((Date.now()-LS.t0)/1000);
  sfx.done();confetti();
  const testMsg=Ls.k==='test'?(LS.miss<=2?`<p>${t('test_pass',{x:esc(L(UNITS[Ls.ui].title))})}</p>`:`<p class="muted">${t('test_fail',{n:LS.miss})}</p>`):'';
  const piece=wasNew?L(SCENE[lessonIndex(Ls.id)].n):null;
  $('#lbody').innerHTML=`<div class="endscreen"><div class="big">${perfect?'Teizami!':'Gattaws!'}</div>
    <h2>${perfect?t('end_perfect'):t('end_done')}</h2>${testMsg}
    ${wasNew?`<div class="end-scene" aria-hidden="true">${sceneSVG({animateOnly:sceneBefore})}</div><p class="muted">${t('end_scene',{x:esc(piece)})}</p>`:''}
    ${LESSON[Ls.id]?`<div class="bigstars">${stars(st)}</div>`:''}
    <div class="endstats"><div class="stat"><span>${t('xp')}</span><b class="tnum" style="color:var(--gold)">+${xp}</b></div><div class="stat"><span>${t('accuracy')}</span><b class="tnum" style="color:var(--good)">${Math.round(acc*100)}%</b></div><div class="stat"><span>${t('time')}</span><b class="tnum">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</b></div></div>
    ${goalHit?`<div class="card" style="width:100%"><b style="color:var(--flame)">${ic('candle')} ${t('end_streak',{n:S.streak})}</b><p class="muted">${t('end_goal',{g:S.settings.goal})}</p></div>`:''}
    ${chalDone?`<div class="card" style="width:100%"><b>${t('end_chal')}</b><p class="muted">${esc(L(challengeToday().text))}</p></div>`:''}
    ${lv.level>lvBefore?`<div class="card" style="width:100%"><b style="color:var(--accent)">${t('end_level',{n:lv.level})}</b><p class="muted">${t('end_level_b',{t:esc(levelTitle(lv))})}</p></div>`:''}
    <p class="muted" style="font-size:12.5px">${perfect?'':t('end_tip')}</p></div>`;
  $('#lfoot').className='lfoot';$('#lfoot').innerHTML=`<button class="btn block" id="lmain">${t('continue_')}</button>`;$('#lmain').onclick=closeLesson;
  $('.lhead .bar>i').style.width='100%';
  achToasts(newAch,700);
}

/* ===================== VIEWS ===================== */
let TAB='learn',READ_MODE='reader';
const TABS=['learn','practice','read','profile'];
function renderChrome(){
  const st=shownStreak(),tx=todayXP(),g=S.settings.goal;
  const cs=$('#chipStreak');cs.className='chip candle'+(S.lastGoalDay===DAY()?' lit':'');cs.innerHTML=`${ic('candle')}<span class="tnum">${st}</span>`;cs.setAttribute('aria-label',`${t('streak')}: ${st}`);
  $('#chipGoal').innerHTML=`<span class="ring" style="--p:${Math.min(100,tx/g*100)}"></span><span class="tnum">${tx}</span>`;$('#chipGoal').setAttribute('aria-label',t('daily_goal'));
  $('#btnSettings').setAttribute('aria-label',t('settings'));
  $('#tabbar').innerHTML=TABS.map(k=>`<button class="tab" data-tab="${k}" ${TAB===k?'aria-current="page"':''}>${ic(k)}${t('tab_'+k)}</button>`).join('');
}
function render(){applyTheme();renderChrome();const v=$('#view');v.innerHTML='';v.append(VIEWS[TAB]());}
$('#tabbar').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;TAB=b.dataset.tab;render();$('#view').scrollTop=0;});
$('#btnSettings').innerHTML=ic('gear');$('#btnSettings').onclick=openSettings;
$('#chipStreak').onclick=()=>{const st=shownStreak();openSheet(`<div class="sheet-head"><h2>${t('candle_title',{n:st})}</h2>${closeBtn()}</div>
  <p class="muted">${t('candle_body',{g:S.settings.goal,b:S.best})}</p>
  <div class="card"><b>${t('freezes',{n:S.freezes})}</b><p class="muted">${t('freezes_d')}</p></div>${weekChart()}`);};
$('#chipGoal').onclick=()=>{TAB='profile';render();};

const VIEWS={
  learn(){
    const wrap=h(`<div class="stack"></div>`);const pv=proverbToday(),ch=challengeToday(),td=today();const cp=Math.min(1,(td[ch.key]||0)/ch.goal);const nl=nextLesson();
    const cap=sceneCaption();
    wrap.append(h(`<section class="card scene-card" aria-label="${esc(t('scene_title'))}">
      <button class="scene-btn" id="sceneBtn" aria-label="${esc(t('scene_open'))}">${sceneSVG()}</button>
      <div class="scene-cap"><div class="tiny">${t('scene_title')} · ${t('scene_count',{a:cap.done,b:cap.total})}</div>
        <div class="scene-next">${cap.next?t('scene_next',{x:`<b>${esc(cap.next)}</b>`}):t('scene_done')}</div></div>
      ${nl?`<button class="btn block" id="cont">${S.stats.lessons?t('continue_'):t('start')}: ${esc(L(nl.title))}</button>`:`<p class="muted">${t('all_done')}</p>`}
    </section>`));
    wrap.append(h(`<section class="card daily" aria-label="${esc(t('daily_challenge'))}">
      <div class="tiny">${t('proverb')}</div>
      <button class="proverb" id="prov"><span class="fr">${stk(toFrak(pv.old))}</span><span class="tr"><b>${esc(pv.old)}</b><br>${esc(pv.mod)}${LANG==='en'?`<br><i>${esc(pv.en)}</i>`:''}</span><span class="tap">${t('proverb_tap')}</span></button>
      <div class="challenge"><div class="meter"><div class="tiny" style="margin-bottom:6px">${t('daily_challenge')}</div><div style="font-weight:600;margin-bottom:8px">${esc(L(ch.text))}</div><div class="bar"><i style="width:${cp*100}%"></i></div></div><span class="badge-xp ${td.chal?'done':''}">${td.chal?t('done'):'+15 XP'}</span></div>
    </section>`));
    $('#prov',wrap).onclick=e=>e.currentTarget.classList.toggle('open');
    $('#sceneBtn',wrap).onclick=sceneSheet;
    if(nl)$('#cont',wrap).onclick=()=>startLesson(nl);
    const toc=h(`<section class="toc" aria-label="${esc(t('contents'))}"><h2 class="toc-title fr">${LANG==='lv'?'Saturs':'Contents'}</h2></section>`);
    UNITS.forEach((u,ui)=>{
      const open=unitOpen(ui);const nDone=u.lessons.filter(l=>S.lessons[l.id]).length;
      const chap=h(`<div class="chap" style="--uc:var(${u.color})">
        <div class="chap-head"><span class="chap-num">${ROMAN[ui]}</span><div class="t"><div class="tiny">${t('chapter')} ${ui+1} · <span class="tnum">${nDone}/${u.lessons.length}</span></div><h3>${esc(L(u.title))}</h3><p class="muted">${stk(L(u.sub))}</p></div>
          <button class="btn ghost small" data-guide="${ui}">${open?t('guide'):t('jump')}</button></div>
        <ol class="toc-list"></ol></div>`);
      const list=$('.toc-list',chap);
      u.lessons.forEach(l=>{
        const done=S.lessons[l.id],unl=open&&isUnlocked(l),cur=nl===l;
        const row=h(`<li><button class="toc-row ${done?'done':''} ${cur?'cur':''} ${unl?'':'locked'}">
          <span class="seal">${done?`<span class="fr">${stk(toFrak(lessonGlyph(l)))}</span>`:unl?`<span class="tnum">${l.li+1}</span>`:ic('lock')}</span>
          <span class="toc-t">${stk(L(l.title))}</span><span class="leader" aria-hidden="true"></span>
          <span class="toc-end">${done?`<span class="mini-stars">${stars(done.stars)}</span>`:cur?`<span class="bookmark">${t('start')}</span>`:''}</span></button></li>`);
        $('button',row).onclick=()=>lessonSheet(l,unl);list.append(row);});
      $('[data-guide]',chap).onclick=()=>open?unitGuide(ui):jumpSheet(ui);
      toc.append(chap);
    });
    wrap.append(toc);
    return wrap;
  },
  practice(){
    const Ls=learnedLetters();
    const w=h(`<div class="stack">
      <div class="row-cards">
        <button class="card action-card" id="pq"><span class="fr">R</span><h3>${t('quick')}</h3><p>${t('quick_d')}</p></button>
        <button class="card action-card" id="pd"><span class="fr">ſ</span><h3>${t('desk')}</h3><p>${t('desk_d',{t:esc(L(TOOLS[S.settings.tool].name).toLowerCase())})}</p></button>
        <button class="card action-card wide" id="pp"><span class="fr">Papihrs</span><h3>${t('paper')} <span class="beta">beta</span></h3><p>${t('paper_d')}</p></button>
      </div>
      <div class="card stack"><div><h3>${t('alphabet')}</h3><p class="muted" style="font-size:13.5px">${t('alphabet_d')}</p></div>
      <div class="grid-letters">${Object.keys(LETTERS).map(c=>{const r=S.letters[c];const m=r?r.r/(r.r+r.w+1):0;return`<button class="lt ${Ls.includes(c)?'':'locked'}" data-c="${esc(c)}" aria-label="${esc(letterName(c))}"><span class="fr">${stk(c)}</span><small>${esc(LETTERS[c].lat)}</small><span class="m"><i style="width:${m*100}%"></i></span></button>`;}).join('')}</div></div>
      <div class="card stack"><h3>${t('cheat')}</h3>${cheatSheet()}</div>
    </div>`);
    $('#pq',w).onclick=()=>startLesson({id:'quick',k:'quick',title:{en:'Quick review',lv:'Ātrais atkārtojums'}});
    $('#pd',w).onclick=()=>writingDesk(pick(Ls.length?Ls:['a']));
    $('#pp',w).onclick=()=>paperPractice();
    $$('.lt',w).forEach(b=>b.onclick=()=>letterSheet(b.dataset.c));
    return w;
  },
  read(){
    const w=h(`<div class="stack"><div class="seg" id="rmode"><button data-m="reader" aria-pressed="${READ_MODE==='reader'}">${t('reader_tab')}</button><button data-m="conv" aria-pressed="${READ_MODE==='conv'}">${t('conv_tab')}</button></div></div>`);
    $('#rmode',w).onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;READ_MODE=b.dataset.m;render();};
    w.append(READ_MODE==='conv'?converterView():readerView());
    return w;
  },
  profile(){
    const lv=levelOf(S.xp);const nAch=Object.keys(S.ach).length;
    const w=h(`<div class="stack">
      <div class="card stack"><div class="profile-head"><div class="avatar">${stk(lv.title.charAt(0))}</div><div style="flex:1;min-width:0"><div class="tiny">${t('level',{n:lv.level})}</div><h2>${esc(lv.title)}</h2>${LANG==='en'?`<p class="muted">${esc(lv.titleEn)}</p>`:''}</div></div>
      <div><div class="bar accent"><i style="width:${lv.pct*100}%"></i></div><p class="muted tnum" style="font-size:12.5px;margin-top:6px">${t('to_next',{a:S.xp-lv.lo,b:lv.hi-lv.lo,n:lv.level+1})}</p></div></div>
      <div class="stats-grid">
        <div class="stat"><span>${t('streak')}</span><b class="tnum" style="color:var(--flame)">${shownStreak()}</b></div>
        <div class="stat"><span>${t('best')}</span><b class="tnum">${S.best}</b></div>
        <div class="stat"><span>${t('total_xp')}</span><b class="tnum" style="color:var(--gold)">${S.xp}</b></div>
        <div class="stat"><span>${t('lessons')}</span><b class="tnum">${S.stats.lessons}</b></div>
        <div class="stat"><span>${t('letters')}</span><b class="tnum">${learnedLetters().length}/${Object.keys(LETTERS).length}</b></div>
        <div class="stat"><span>${t('drawings')}</span><b class="tnum">${S.stats.draws}</b></div>
      </div>
      <div class="card stack"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><h3>${t('this_week')}</h3><span class="muted tnum" style="font-size:13px">${t('goal_day',{g:S.settings.goal})}</span></div>${weekChart()}</div>
      <div class="stack"><div style="display:flex;justify-content:space-between;align-items:baseline"><h3>${t('achievements')}</h3><span class="muted tnum">${nAch}/${ACH.length}</span></div>
      <div class="ach-grid">${ACH.map(a=>`<div class="ach ${S.ach[a.id]?'':'locked'}"><div class="medal">${stk(a.g)}</div><b>${esc(L(a.n))}</b><small>${esc(L(a.d))}</small></div>`).join('')}</div></div>
      <button class="btn ghost block" id="pset">${ic('gear')} ${t('settings')}</button>
    </div>`);
    $('#pset',w).onclick=openSettings;
    return w;
  },
};
function lessonGlyph(l){return l.k==='letters'?l.letters[0]:l.k==='review'?'R':l.k==='rule'?RULES[l.rule].glyph:l.k==='words'?l.words[0].old.charAt(0):'M';}
function weekChart(){
  const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d;});
  const vals=days.map(d=>S.days[DAY(d)]||0);const mx=Math.max(S.settings.goal,...vals);
  const names=LANG==='lv'?['Sv','P','O','T','C','Pk','S']:['Su','Mo','Tu','We','Th','Fr','Sa'];
  return `<div class="week" role="img" aria-label="${esc(t('this_week'))}">${days.map((d,i)=>`<div class="col"><span class="v tnum">${vals[i]||''}</span><div class="b ${vals[i]>=S.settings.goal?'goal':vals[i]?'':'zero'}" style="height:${Math.max(3,vals[i]/mx*80)}px"></div><small>${names[d.getDay()]}</small></div>`).join('')}</div>`;
}
function tokenize(old){
  return old.split(/(\s+|[.,:;!?…]+)/).map(x=>{if(!x)return'';if(!LETTER_RE.test(x))return esc(x);const g=gloss(x);return`<span class="w ${g.known?'known':''}" role="button" tabindex="0" data-w="${esc(x)}">${stk(toFrak(x))}</span>`;}).join('');
}
function cheatSheet(){
  const sz=LANG==='lv'?'s vai z':'s or z',dbl=LANG==='lv'?'b, n, r… (pirms tā īss patskanis)':'b, n, r… (short vowel before)';
  return `<div class="rule-ex">${[['ah eh ih uh','ā ē ī ū'],['ee','ie'],['w','v'],['z','c'],['ds','dz'],['sch','š / ž'],['tsch','č'],['s',sz],['ł ꞥ ꞣ ꞡ','ļ ņ ķ ģ'],['bb, nn, rr…',dbl]].map(([o,m])=>`${frH(o)}<b>${stk(o)}</b><span><span class="arr">→</span> ${esc(m)}</span>`).join('')}</div>`;
}
function readerView(){
  const w=h(`<div class="stack"><div><h2 style="font-size:26px">${frH('Mihłais Latweeti')}</h2><p class="muted">${t('read_intro')}</p></div>
    <div class="toggles"><button class="tog" id="tgm" aria-pressed="${S.settings.showModern}">${t('tog_modern')}</button><button class="tog" id="tge" aria-pressed="${!!S.settings.showEn}">${t('tog_en')}</button><button class="tog" id="tgo" aria-pressed="${!!S.settings.showOld}">${t('tog_old')}</button></div>
    ${PASSAGES.map(p=>`<article class="card passage"><div class="tiny">${esc(L(p.ref))}</div><div class="text">${tokenize(p.old)}</div>
      ${S.settings.showOld?`<div class="interlin">${stk(p.old)}</div>`:''}${S.settings.showModern?`<div class="interlin mod">${esc(p.mod)} ${speakBtn(p.mod)}</div>`:''}${S.settings.showEn?`<div class="interlin"><i>${esc(p.en)}</i></div>`:''}</article>`).join('')}
    <p class="muted" style="font-size:12.5px">${t('read_note')}</p></div>`);
  const tg=(id,k)=>$(id,w).onclick=()=>{S.settings[k]=!S.settings[k];save();render();};
  tg('#tgm','showModern');tg('#tge','showEn');tg('#tgo','showOld');
  w.addEventListener('click',e=>{const b=e.target.closest('.w');if(b)wordSheet(b.dataset.w);});
  return w;
}
let convText=null,convTimer=null;
function converterView(){
  if(convText===null)convText=t('conv_sample');
  const st=S.settings.convStyle,dbl=S.settings.convDbl;
  const w=h(`<div class="stack"><div><h2>${t('conv_title')}</h2><p class="muted">${t('conv_intro')}</p></div>
    <textarea id="convIn" class="conv-in" placeholder="${esc(t('conv_ph'))}" rows="4" aria-label="${esc(t('conv_title'))}">${esc(convText)}</textarea>
    <div><div class="tiny" style="margin-bottom:6px">${t('conv_style')}</div><div class="seg" id="convStyle">${['bible','press'].map(k=>`<button data-v="${k}" aria-pressed="${st===k}">${t('conv_'+k)}</button>`).join('')}</div></div>
    <div class="set-group"><button class="set-row" id="convDbl"><span class="t"><small>${t('conv_double')}</small></span><span class="switch" role="switch" aria-checked="${dbl}"></span></button></div>
    <article class="card conv-out" aria-live="polite"><div class="fr conv-fr" id="convFr"></div><div class="tiny" style="margin-top:12px">${t('conv_old')}</div><div id="convOld" class="conv-old"></div></article>
    <div class="row-btns"><button class="btn ghost small" id="convCopy">${ic('copy')} ${t('conv_copy')}</button><button class="btn small" id="convPaper">${t('conv_paper')}</button></div>
    <p class="muted" style="font-size:12.5px">${t('conv_note')} <a class="link" href="https://github.com/laacz/misc" target="_blank" rel="noopener">github.com/laacz/misc</a></p></div>`);
  const upd=()=>{const o=transcribe(convText,{style:S.settings.convStyle,dbl:S.settings.convDbl});$('#convFr',w).innerHTML=stk(o).replace(/\n/g,'<br>');$('#convOld',w).textContent=oldLatin(o);return o;};
  upd();
  $('#convIn',w).addEventListener('input',e=>{convText=e.target.value;upd();clearTimeout(convTimer);convTimer=setTimeout(()=>{if(convText.trim().length>2){bump('conv');if(checkChallenge())toast(t('chal_toast'));save();achToasts(checkAch());renderChrome();}},2500);});
  $('#convStyle',w).onclick=e=>{const b=e.target.closest('[data-v]');if(!b)return;S.settings.convStyle=b.dataset.v;save();$$('#convStyle button',w).forEach(x=>x.setAttribute('aria-pressed',x===b));upd();};
  $('#convDbl',w).onclick=e=>{S.settings.convDbl=!S.settings.convDbl;save();$('.switch',e.currentTarget).setAttribute('aria-checked',S.settings.convDbl);upd();};
  $('#convCopy',w).onclick=()=>{const txt=oldLatin(upd());navigator.clipboard?.writeText(txt).then(()=>toast(t('copied')),()=>{});};
  $('#convPaper',w).onclick=()=>{const o=upd();const word=(o.match(/[^\s.,!?;:…]+/g)||[]).find(x=>x.length>=2&&x.length<=8)||'Gotika';paperPractice(word);};
  return w;
}

/* ===================== SHEETS: lesson, guide, letter, word, scene ===================== */
function lessonSheet(l,unl){
  const d=S.lessons[l.id];
  const what={letters:t('lesson_what_letters',{n:l.letters?.length}),review:t('lesson_what_review'),rule:t('lesson_what_rule'),words:t('lesson_what_words',{n:l.words?.length}),phrases:t('lesson_what_phrases')}[l.k];
  const piece=L(SCENE[lessonIndex(l.id)].n);
  const w=openSheet(`<div class="sheet-head"><h2>${stk(L(l.title))}</h2>${closeBtn()}</div>
    <div class="tiny">${t('chapter')} ${l.ui+1} · ${t('lesson_n',{n:l.li+1})}</div><p class="muted">${what}</p>
    <p class="muted" style="font-size:13.5px">${t('scene_next',{x:`<b>${esc(piece)}</b>`})}</p>
    ${d?`<div class="bigstars" style="justify-content:flex-start">${stars(d.stars)}</div>`:''}
    ${unl?`<button class="btn block" id="go">${d?t('lesson_again'):t('lesson_start')}</button>`:`<p><b>${t('locked')}.</b> ${t('lesson_locked_msg')}${l.li===0&&l.ui>0?t('lesson_locked_jump'):''}</p>`}`);
  if(unl)$('#go',w).onclick=()=>{w.close();startLesson(l);};
}
function jumpSheet(ui){
  const w=openSheet(`<div class="sheet-head"><h2>${t('jump_title',{x:esc(L(UNITS[ui].title))})}</h2>${closeBtn()}</div>
    <p class="muted">${t('jump_body')}</p><button class="btn block" id="go">${t('jump_go')}</button>`);
  $('#go',w).onclick=()=>{w.close();startLesson({id:'test-'+ui,k:'test',ui,title:{en:'Jump test',lv:'Lēciena tests'}});};
}
function unitGuide(ui){
  const u=UNITS[ui];let body='';
  if(u.lessons.some(l=>l.k==='letters')){const cs=u.lessons.filter(l=>l.k==='letters').flatMap(l=>l.letters);body=`<div class="grid-letters">${cs.map(c=>`<button class="lt" data-c="${esc(c)}"><span class="fr">${stk(c)}</span><small>${esc(LETTERS[c].lat)}</small></button>`).join('')}</div>`;}
  else if(ui===2)body=Object.values(RULES).map(R=>`<div class="card stack"><h3>${stk(L(R.title))}</h3><p>${stkRaw(L(R.body))}</p></div>`).join('');
  else if(ui===3)body=`<div class="rule-ex">${u.lessons.flatMap(l=>l.words).map(v=>`${frH(v.old)}<b>${esc(v.mod)}</b><span class="muted">${LANG==='en'?esc(v.en):''}</span>`).join('')}</div>`;
  else body=`<div class="stack">${PHRASES.map(p=>`<div>${frH(p.old)}<div><b>${esc(p.mod)}</b> ${enGloss(p.en)}</div></div>`).join('')}</div>`;
  const w=openSheet(`<div class="sheet-head"><h2>${esc(L(u.title))}</h2>${closeBtn()}</div><p class="muted">${stk(L(u.sub))}</p>${body}`);
  $$('.lt',w).forEach(b=>b.onclick=()=>letterSheet(b.dataset.c));
  $$('.rule-ex .fr, .stack > div > .fr',w).forEach(x=>x.style.fontSize='26px');
}
function sceneSheet(){
  const next=ALL_LESSONS.findIndex(l=>!S.lessons[l.id]);
  openSheet(`<div class="sheet-head"><h2>${t('scene_title')}</h2>${closeBtn()}</div>${sceneSVG({big:true})}
    <ol class="scene-list">${UNITS.map((u,ui)=>`<li><b class="tiny">${ROMAN[ui]} · ${esc(L(u.title))}</b><ul>${u.lessons.map(l=>{const i=lessonIndex(l.id);const s=S.lessons[l.id]?'done':i===next?'cur':'';return`<li class="${s}">${esc(L(SCENE[i].n))}</li>`;}).join('')}</ul></li>`).join('')}</ol>`);
}
function letterSheet(c){
  const Lt=LETTERS[c],r=S.letters[c];
  const w=openSheet(`<div class="sheet-head"><h2>${t('letter_x',{x:esc(letterName(c))})}</h2>${closeBtn()}</div>
    <div class="intro"><div class="pair"><div class="big">${stk(c)}</div><div class="lat">${esc(Lt.lat)}</div></div><div class="tipbox">${stkRaw(L(Lt.tip))}</div>
    <p class="muted tnum" style="font-size:13px">${r?t('right_wrong',{r:r.r,w:r.w}):t('not_practised')}</p></div>
    <button class="btn block" id="go">${t('practise_writing')}</button>`);
  $('#go',w).onclick=()=>{w.close();writingDesk(c);};
}
function wordSheet(word){
  const g=gloss(word);bump('taps');if(checkChallenge())toast(t('chal_toast'));save();achToasts(checkAch());
  openSheet(`<div class="sheet-head"><h2 class="fr" style="font-size:44px;font-weight:400">${stk(toFrak(word))}</h2>${closeBtn()}</div>
    <div class="rule-ex" style="grid-template-columns:auto 1fr"><span class="tiny">${t('w_old')}</span><b>${stk(word)}</b><span class="tiny">${t('w_modern')}</span><b style="font-size:20px">${esc(g.mod)}</b>${g.en?`<span class="tiny">${t('w_meaning')}</span><span>${esc(g.en)}</span>`:''}</div>
    ${g.known?'':`<div class="tipbox">${t('w_guess',{r:g.used.length?g.used.map(esc).join('; '):t('w_none')})}</div>`}
    ${speakBtn(g.mod)}`);
  renderChrome();
}
function writingDesk(c){
  const all=Object.keys(LETTERS);let guide=true,ch=c;
  const w=openSheet(`<div class="sheet-head">${backBtn()}<h2>${t('desk')}</h2></div>
    <div class="letter-strip" id="dl">${all.map(x=>`<button class="tile fr" data-c="${esc(x)}" aria-label="${esc(letterName(x))}">${stk(x)}</button>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div><div class="tiny">${t('writing')}</div><b style="font-size:18px" id="dn">${esc(letterName(ch))}</b></div><button class="tog" id="dg" aria-pressed="true">${t('show_guide')}</button></div>
    <div id="dpad"></div><button class="btn block" id="dchk" disabled>${t('check_letter')}</button><p class="muted" id="dres" style="text-align:center;min-height:1.4em"></p>`,{full:true});
  let pad;const mount=()=>{pad=makePad({ch,guide});$('#dpad',w).innerHTML='';$('#dpad',w).append(pad.el);pad.onChange=v=>$('#dchk',w).disabled=!v;$('#dres',w).innerHTML='';};mount();
  $('#dl',w).onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;ch=b.dataset.c;$('#dn',w).textContent=letterName(ch);mount();};
  $('#dg',w).onclick=e=>{guide=!guide;e.currentTarget.setAttribute('aria-pressed',guide);pad.setGuide(guide);};
  $('#dchk',w).onclick=()=>{const T=TOOLS[S.settings.tool],b=$('#dchk',w);if(b.dataset.again){pad.reset();delete b.dataset.again;b.textContent=t('check_letter');$('#dres',w).innerHTML='';return;}
    const sc=pad.score(),ok=sc>=T.thr,p=Math.round(sc*100);pad.showResult(ok,sc);ok?sfx.good():sfx.bad();
    const g=pad.guesses();
    $('#dres',w).innerHTML=(ok?t('desk_ok',{p}):t('desk_bad',{p,t:Math.round(T.thr*100),tool:esc(L(T.name))}))+(g.length?`<br>${t('looks_like',{x:g.map(x=>`${glyphH(x.ch)} <span class="tnum">${Math.round(x.s*100)}%</span>`).join(' · ')})}`:'');
    b.dataset.again=1;b.textContent=t('write_again');};
}

/* ===================== PAPER PRACTICE (photo or stylus) ===================== */
function paperTask(mode){
  const Ls=learnedLetters();const pool=Ls.length>=4?Ls:['a','e','i','o','u','n','m','r','l','t'];
  if(mode==='word'){const ws=(learnedWords().length?learnedWords():VOCAB).filter(v=>v.old.length<=7&&[...toFrak(v.old)].every(c=>LETTERS[c]));const v=pick(ws.length?ws:VOCAB);return{label:v.old,letters:[...toFrak(v.old)].filter(c=>LETTERS[c])};}
  return{letters:sample(pool.filter(c=>LETTERS[c]),4)};
}
function paperPractice(word){
  let mode=word?'word':'letters',task=word?{label:oldLatin(word),letters:[...word].filter(c=>LETTERS[c])}:paperTask('letters');
  if(!task.letters.length)task=paperTask('letters');
  const w=openSheet(`<div class="sheet-head">${backBtn()}<h2>${t('p_title')} <span class="beta">beta</span></h2></div>
    <p class="muted">${t('p_intro')}</p>
    <div class="seg" id="pmode"><button data-m="letters" aria-pressed="${mode==='letters'}">${t('p_letters')}</button><button data-m="word" aria-pressed="${mode==='word'}">${t('p_word')}</button></div>
    <div class="card paper-target" id="ptarget"></div>
    <button class="btn ghost small" id="pnew" style="align-self:center">${t('p_new')}</button>
    <label class="btn block" for="pfile" id="pphoto">${ic('camera')} ${t('p_photo')}</label>
    <input type="file" id="pfile" accept="image/*" capture="environment" hidden>
    <button class="btn ghost block" id="pstylus">${t('p_stylus')}</button>
    <div id="pwide"></div>
    <p class="muted" style="font-size:12.5px">${t('p_tips')}</p>
    <div id="pres" aria-live="polite"></div>
    <p class="muted" style="font-size:12px">${t('p_beta')}</p>`,{full:true});
  const showTask=()=>{$('#ptarget',w).innerHTML=`<div class="tiny">${t('p_target')}</div><div class="paper-glyphs">${task.letters.map(c=>`<span class="fr">${stk(c)}</span>`).join('')}</div>${task.label?`<div class="muted">${stk(task.label)}</div>`:''}`;$('#pres',w).innerHTML='';};
  showTask();
  $('#pmode',w).onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;mode=b.dataset.m;$$('#pmode button',w).forEach(x=>x.setAttribute('aria-pressed',x===b));task=paperTask(mode);showTask();};
  $('#pnew',w).onclick=()=>{task=paperTask(mode);showTask();};
  $('#pfile',w).onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;$('#pres',w).innerHTML=`<p class="muted">${t('p_reading')}</p>`;
    const url=URL.createObjectURL(f);const img=new Image();img.onload=()=>{setTimeout(()=>{try{showScan(w,readHandwriting(imageToInk(img),task.letters),task);}catch(err){$('#pres',w).innerHTML=`<p class="muted">${esc(String(err))}</p>`;}URL.revokeObjectURL(url);e.target.value='';},30);};img.src=url;};
  $('#pstylus',w).onclick=()=>{const box=$('#pwide',w);if(box.firstChild){box.innerHTML='';return;}box.append(widePad(r=>showScan(w,readHandwriting(strokesToInk(r.s,r.size),task.letters),task)));};
}
function widePad(onCheck){
  const el=h(`<div class="stack"><div class="pad wide"><canvas aria-label="${esc(t('pad_label'))}"></canvas></div><div class="row-btns"><button class="btn ghost small" data-a="clear">${t('p_clear')}</button><button class="btn small" data-a="check">${t('p_check')}</button></div></div>`);
  const cv=$('canvas',el),box=$('.pad',el);let ctx,W=300,H=120;const strokes=[];let cur=null;
  const size=()=>{const r=box.getBoundingClientRect();if(!r.width)return;W=r.width;H=r.height;const d=Math.min(3,devicePixelRatio||1);cv.width=W*d;cv.height=H*d;ctx=cv.getContext('2d');ctx.setTransform(d,0,0,d,0,0);redraw();};
  const redraw=()=>{if(!ctx)return;ctx.clearRect(0,0,W,H);ctx.strokeStyle=cssv('--guide-2');ctx.lineWidth=1.2;[.72,.4].forEach(f=>{ctx.beginPath();ctx.moveTo(8,H*f);ctx.lineTo(W-8,H*f);ctx.stroke();});strokes.forEach(st=>{for(let i=1;i<st.length;i++)inkSeg(ctx,S.settings.tool,H*1.4,st[i-1],st[i]);if(st.length===1)inkSeg(ctx,S.settings.tool,H*1.4,st[0],{x:st[0].x+.8,y:st[0].y+.8});});};
  const pos=e=>{const r=cv.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);cur=[pos(e)];strokes.push(cur);});
  cv.addEventListener('pointermove',e=>{if(!cur)return;const p=pos(e),l=cur[cur.length-1];if(Math.hypot(p.x-l.x,p.y-l.y)<1.5)return;cur.push(p);inkSeg(ctx,S.settings.tool,H*1.4,l,p);});
  const end=()=>{cur=null;};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  el.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;if(b.dataset.a==='clear'){strokes.length=0;redraw();}else if(strokes.length)onCheck({s:strokes,size:{w:Math.round(W),h:Math.round(H)}});});
  new ResizeObserver(size).observe(box);
  return el;
}
function showScan(w,res,task){
  const T=TOOLS[S.settings.tool];const thr=T.thr-.05;const tgt=task.letters;
  const okN=res.letters.filter(x=>x.score>=thr).length;
  const inkCol=cssv('--ink');
  bump('paperChecks');
  let xp=0;if(res.found===tgt.length&&okN){xp=okN*2;addXP(xp);if(okN===tgt.length)bump('paper');}
  if(checkChallenge())toast(t('chal_toast'));save();achToasts(checkAch());renderChrome();
  $('#pres',w).innerHTML=`<div class="card stack"><h3>${t('p_result',{a:okN,b:tgt.length})}</h3>
    <p class="muted" style="font-size:13.5px">${res.found===tgt.length?t('p_found',{n:res.found,m:tgt.length}):t('p_found_bad',{n:res.found,m:tgt.length})}</p>
    <div class="scan-rows">${res.letters.map(x=>`<div class="scan-row ${x.score>=thr?'ok':'no'}"><img alt="" src="${thumbCanvas(x.canvas,inkCol)}"><span class="fr scan-t">${x.target?stk(x.target):'?'}</span>
      <span class="scan-s"><b class="tnum">${Math.round(x.score*100)}%</b><small>${t('p_likes')}: ${x.top.map(r=>glyphH(r.ch)).join(' ')}</small></span></div>`).join('')}</div>
    ${xp?`<p style="color:var(--gold);font-weight:700">${t('p_xp',{n:xp})}</p>`:''}</div>`;
  (okN===tgt.length&&okN?sfx.good:sfx.bad)();
}

/* ===================== SETTINGS & FEEDBACK ===================== */
function openSettings(){
  const s=S.settings;
  const w=openSheet(`<div class="sheet-head">${backBtn()}<h2>${t('settings')}</h2></div>
    <div class="tiny">${t('s_language')}</div>
    <div class="seg" id="lang"><button data-v="lv" aria-pressed="${LANG==='lv'}">Latviešu</button><button data-v="en" aria-pressed="${LANG==='en'}">English</button></div>
    <div class="tiny">${t('s_tool')}</div>
    <div class="toolcards">${Object.entries(TOOLS).map(([k,x])=>`<button class="toolcard" data-tool="${k}" aria-pressed="${s.tool===k}"><canvas data-demo="${k}" width="200" height="92"></canvas><b>${esc(L(x.name))}</b><span class="mult">${esc(L(x.level))} · ×${x.mult}</span><small>${esc(L(x.desc))}</small></button>`).join('')}</div>
    <div class="tiny">${t('s_appearance')}</div>
    <div class="set-group"><div class="set-row"><div class="t"><b>${t('s_theme')}</b></div></div><div style="padding:0 16px 14px"><div class="seg" id="theme">${['system','light','dark'].map(k=>`<button data-v="${k}" aria-pressed="${s.theme===k}">${t('th_'+k)}</button>`).join('')}</div></div></div>
    <div class="tiny">${t('s_goal')}</div>
    <div class="set-group"><div style="padding:14px 16px"><div class="seg" id="goal">${[[20,'g_casual'],[40,'g_regular'],[60,'g_serious'],[100,'g_intense']].map(([v,n])=>`<button data-v="${v}" aria-pressed="${s.goal===v}">${t(n)}<br><small class="tnum">${v} XP</small></button>`).join('')}</div></div></div>
    <div class="tiny">${t('s_lessons')}</div>
    <div class="set-group">
      ${[['sound','s_sound','s_sound_d'],['haptics','s_vib','s_vib_d']].map(([k,n,d])=>`<button class="set-row" data-sw="${k}"><span class="t"><b>${t(n)}</b><small>${t(d)}</small></span><span class="switch" role="switch" aria-checked="${!!s[k]}"></span></button>`).join('')}
      <button class="set-row" id="drawon"><span class="t"><b>${t('s_draw')}</b><small>${Date.now()<(S.noDrawUntil||0)?t('s_draw_paused'):t('s_draw_on')}</small></span></button>
    </div>
    <div class="tiny">${t('s_help')}</div>
    <div class="set-group"><button class="set-row" id="fb">${ic('flag')}<span class="t"><b>${t('s_fb')}</b><small>${t('s_fb_d')}</small></span>${ic('chev')}</button></div>
    <div class="tiny">${t('s_progress')}</div>
    <div class="set-group"><button class="set-row" id="reset"><span class="t"><b style="color:var(--bad)">${t('s_reset')}</b><small>${t('s_reset_d')}</small></span></button></div>
    <p class="muted" style="font-size:12.5px;text-align:center">${t('footer')}<br>${cloud?t('sync_on'):t('sync_off')}</p>`,{full:true});
  drawToolDemos(w);
  w.addEventListener('click',e=>{
    const lb=e.target.closest('#lang [data-v]');if(lb){if(lb.dataset.v===LANG)return;s.lang=LANG=lb.dataset.v;save();render();w.remove();openSettings();return;}
    const tb=e.target.closest('[data-tool]');if(tb){s.tool=tb.dataset.tool;$$('[data-tool]',w).forEach(b=>b.setAttribute('aria-pressed',b===tb));save();sfx.tap();}
    const th=e.target.closest('#theme [data-v]');if(th){s.theme=th.dataset.v;$$('#theme button',w).forEach(b=>b.setAttribute('aria-pressed',b===th));save();applyTheme();drawToolDemos(w);render();}
    const gb=e.target.closest('#goal [data-v]');if(gb){s.goal=+gb.dataset.v;$$('#goal button',w).forEach(b=>b.setAttribute('aria-pressed',b===gb));save();renderChrome();}
    const sw=e.target.closest('[data-sw]');if(sw){const k=sw.dataset.sw;s[k]=!s[k];$('.switch',sw).setAttribute('aria-checked',s[k]);save();}
  });
  $('#drawon',w).onclick=e=>{S.noDrawUntil=0;save();$('small',e.currentTarget).textContent=t('s_draw_on');};
  $('#fb',w).onclick=()=>openFeedback({});
  $('#reset',w).onclick=()=>{const c=openSheet(`<div class="sheet-head"><h2>${t('reset_title')}</h2></div><p class="muted">${t('reset_body')}</p><button class="btn bad block" id="yes">${t('reset_yes')}</button><button class="btn ghost block" data-close>${t('cancel')}</button>`);
    $('#yes',c).onclick=()=>{const keep=S.settings;S=freshState();S.settings=keep;S.onboarded=true;save();c.close();w.close();render();toast(t('reset_done'));};};
  return w;
}
function drawToolDemos(root){
  $$('canvas[data-demo]',root).forEach(cv=>{const ctx=cv.getContext('2d');ctx.clearRect(0,0,200,92);const tool=cv.dataset.demo;
    const pts=[];for(let i=0;i<=60;i++){const f=i/60;pts.push({x:20+f*160,y:46+Math.sin(f*Math.PI*2.2)*24});}
    if(tool==='ink'){ctx.fillStyle=cssv('--nib');const w=8,a=-40*Math.PI/180;for(let i=1;i<pts.length;i++){const p=pts[i-1],q=pts[i],nx=Math.cos(a)*w,ny=Math.sin(a)*w;ctx.beginPath();ctx.moveTo(p.x+nx,p.y+ny);ctx.lineTo(q.x+nx,q.y+ny);ctx.lineTo(q.x-nx,q.y-ny);ctx.lineTo(p.x-nx,p.y-ny);ctx.fill();}}
    else{ctx.strokeStyle=cssv(tool==='pen'?'--pen':'--pencil');ctx.lineWidth=tool==='pen'?5:2.5;ctx.lineCap='round';ctx.globalAlpha=tool==='pencil'?.85:1;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();ctx.globalAlpha=1;}});
}
function openFeedback({category='bug',context=''}){
  const cats=[['bug','fb_bug'],['content','fb_content'],['idea','fb_idea'],['other','fb_other']];
  const w=openSheet(`<div class="sheet-head"><h2>${t('fb_title')}</h2>${closeBtn()}</div>
    <p class="muted">${t('fb_intro')}</p>
    <form id="fbf" class="stack">
      <label class="fld">${t('fb_about')}<select id="fbcat">${cats.map(([k,n])=>`<option value="${k}" ${k===category?'selected':''}>${t(n)}</option>`).join('')}</select></label>
      <label class="fld">${t('fb_msg')}<textarea id="fbmsg" required maxlength="2000" placeholder="${esc(t('fb_ph'))}"></textarea></label>
      ${context?`<div class="tipbox" style="font-size:13px"><b>${t('fb_attached')}</b> ${esc(context)}</div>`:''}
      <button class="btn block" type="submit" id="fbsend">${t('fb_send')}</button>
      <div id="fbout"></div>
    </form>`);
  $('#fbf',w).onsubmit=async e=>{
    e.preventDefault();const msg=$('#fbmsg',w).value.trim();if(!msg){$('#fbmsg',w).focus();return;}
    const report={category:$('#fbcat',w).value,message:msg,context,screen:TAB,lang:LANG,tool:S.settings.tool,theme:S.settings.theme,level:levelOf(S.xp).level,createdAt:new Date().toISOString(),app:'gotika-1.1'};
    $('#fbsend',w).disabled=true;$('#fbsend',w).textContent=t('fb_sending');
    const ok=await sendReport(report);
    bump('feedback');save();achToasts(checkAch());
    if(ok){w.close();toast(t('fb_thanks'));}
    else{S.outbox.push(report);save();const text=`Gotika feedback (${report.category})\n${msg}${context?`\n\nContext: ${context}`:''}`;
      $('#fbsend',w).hidden=true;
      $('#fbout',w).innerHTML=`<div class="tipbox stack"><b>${t('fb_fail')}</b><p class="muted" style="font-size:13.5px">${t('fb_fail_d')}</p><textarea readonly id="fbcopy">${esc(text)}</textarea><button type="button" class="btn ghost block" id="fbc">${ic('copy')} ${t('fb_copy')}</button></div>`;
      $('#fbc',w).onclick=()=>{navigator.clipboard?.writeText(text).then(()=>toast(t('copied')),()=>{$('#fbcopy',w).select();});};}
  };
}

/* ===================== CLOUD (optional, when opened inside Claude) ===================== */
let cloud=null,cloudTimer=null,cloudBusy=false;
async function initCloud(){
  try{
    if(!window.claude?.use)return;
    const[db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    if(!db||!user)return;const id=await user.id();if(!id)return;
    cloud={db,id};
    const snap=await db.doc(`data/users/${id}/progress`).get();
    if(snap.exists){const d=snap.data();if(d&&d.updatedAt>S.updatedAt&&d.json){try{S=deepMerge(freshState(),JSON.parse(d.json));LANG=S.settings.lang||LANG;try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}if(!LS)render();}catch(e){}}}
    else cloudSave();
    if(S.outbox.length){const left=[];for(const r of S.outbox){if(!(await sendReport(r)))left.push(r);}S.outbox=left;save();}
  }catch(e){cloud=null;}
}
function cloudSave(){
  if(!cloud)return;clearTimeout(cloudTimer);
  cloudTimer=setTimeout(async()=>{if(cloudBusy){cloudSave();return;}cloudBusy=true;
    try{await cloud.db.doc(`data/users/${cloud.id}/progress`).set({json:JSON.stringify(S),updatedAt:S.updatedAt});}catch(e){if(e&&(e.code==='invalid_argument'||e.code==='revoked'))cloud=null;}
    cloudBusy=false;},1500);
}
async function sendReport(r){
  try{
    let c=cloud;
    if(!c&&window.claude?.use){const[db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);if(db&&user){const id=await user.id();if(id)c={db,id};}}
    if(!c)return false;
    await c.db.doc(`feedback/${c.id}/reports/${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`).set(r);
    return true;
  }catch(e){return false;}
}

/* ===================== ONBOARDING ===================== */
function onboarding(){
  let tool=S.settings.tool,goal=S.settings.goal;
  const w=openSheet(`<div class="seg" id="olang" aria-label="${esc(t('welcome_lang'))}"><button data-v="lv" aria-pressed="${LANG==='lv'}">Latviešu</button><button data-v="en" aria-pressed="${LANG==='en'}">English</button></div>
    <div style="text-align:center" class="stack"><div class="fr" style="font-size:72px;line-height:1;color:var(--accent)">Gotika</div>
    <h2>${t('ob_title')}</h2><p class="muted">${t('ob_body',{x:`<b class="fr" style="font-size:20px">${stk(toFrak('Mihłais Latweeti'))}</b>`})}</p></div>
    <div class="tiny">${t('ob_tool')}</div>
    <div class="toolcards">${Object.entries(TOOLS).map(([k,x])=>`<button class="toolcard" data-tool="${k}" aria-pressed="${tool===k}"><canvas data-demo="${k}" width="200" height="92"></canvas><b>${esc(L(x.name))}</b><span class="mult">${esc(L(x.level))}</span><small>${esc(L(x.desc))}</small></button>`).join('')}</div>
    <div class="tiny">${t('s_goal')}</div>
    <div class="seg" id="ogoal">${[[20,'g_casual'],[40,'g_regular'],[60,'g_serious'],[100,'g_intense']].map(([v,n])=>`<button data-v="${v}" aria-pressed="${goal===v}">${t(n)}<br><small>${v} XP</small></button>`).join('')}</div>
    <button class="btn block" id="ostart">${t('ob_go')}</button>`,{onClose:()=>{if(!S.onboarded){S.onboarded=true;save();render();}}});
  drawToolDemos(w);
  w.addEventListener('click',e=>{
    const lb=e.target.closest('#olang [data-v]');if(lb){if(lb.dataset.v===LANG)return;S.settings.lang=LANG=lb.dataset.v;save();render();w.remove();onboarding();return;}
    const tb=e.target.closest('[data-tool]');if(tb){tool=tb.dataset.tool;$$('[data-tool]',w).forEach(b=>b.setAttribute('aria-pressed',b===tb));}
    const g=e.target.closest('#ogoal [data-v]');if(g){goal=+g.dataset.v;$$('#ogoal button',w).forEach(b=>b.setAttribute('aria-pressed',b===g));}});
  $('#ostart',w).onclick=()=>{S.settings.tool=tool;S.settings.goal=goal;S.onboarded=true;save();w.close();render();const nl=nextLesson();if(nl)setTimeout(()=>startLesson(nl),250);};
}

/* ===================== BOOT ===================== */
document.addEventListener('keydown',e=>{
  if(!LS||$$('.sheet-wrap').length)return;
  if(e.key==='Enter'&&!e.target.matches('textarea')){const b=$('#lmain');if(b&&!b.disabled&&!b.hidden){e.preventDefault();b.click();}}
  else if(/^[1-4]$/.test(e.key)&&LS.ex?.key&&!e.target.matches('input')){LS.ex.key(+e.key);}
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList?.contains('w'))wordSheet(e.target.dataset.w);});
function installPWA(){
  // Only on a normal web host (e.g. GitHub Pages): makes Gotika installable on a phone and usable offline.
  try{const hn=location.hostname;if(!hn||/claude/i.test(hn)||location.protocol!=='https:')return;
    const l=document.createElement('link');l.rel='manifest';l.href='manifest.webmanifest';document.head.append(l);
    if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});}catch(e){}
}
async function boot(){
  applyTheme();initVoices();installPWA();
  try{await Promise.race([document.fonts.load('64px "Gotika Fraktur"','aſß'),new Promise(r=>setTimeout(r,2500))]);}catch(e){}
  render();
  if(!S.onboarded)onboarding();
  initCloud();
}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(S.settings.theme==='system')render();});
boot();
