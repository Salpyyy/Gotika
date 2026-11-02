/* ===================== THE ENGRAVING: progress as a view of old Rīga ===================== */
// One element per lesson (27). Future elements show as a faint pencil underdrawing, the next one as a
// dashed sketch, finished ones are inked. When a whole chapter is done, its elements get hand-coloured.
const waves=(y,x0=0,x1=360,a=2.2,step=14)=>{let d=`M${x0} ${y}`;for(let x=x0;x<x1;x+=step)d+=` q${step/4} ${-a} ${step/2} 0 t${step/2} 0`;return d;};
const crenel=(x0,x1,y,h=4,w=6)=>{let d=`M${x0} 160 V${y}`;for(let x=x0;x<x1;x+=w*2)d+=` h${w} v${-h} h${w} v${h}`;return d+` V160`;};
const winGrid=(pts)=>pts.map(([x,y])=>`M${x} ${y}h4v6h-4z`).join(' ');
const WINDOWS=[[89,124],[96,124],[89,134],[96,134],[110,128],[116,128],[110,137],[116,137],[127,128],[133,128],[127,137],[60,112],[68,126]];
const flag=(x,y)=>`<g class="flag"><path d="M${x} ${y} V${y-12}"/><rect x="${x}" y="${y-12}" width="10" height="2.4" class="fc"/><rect x="${x}" y="${y-9.6}" width="10" height="1.2" class="fw"/><rect x="${x}" y="${y-8.4}" width="10" height="2.4" class="fc"/></g>`;

const SCENE = [
  // Chapter I — the land and the river
  {n:{en:'The riverbank',lv:'Upes krasts'},d:'M0 160 H360 M8 160 l3 -4 M26 160 l2 -5 M318 160 l-2 -5 M352 160 l3 -4',f:[['grass','M0 156 H360 V161 H0Z']]},
  {n:{en:'The Daugava',lv:'Daugava'},d:[waves(171),waves(181,6),waves(191)].join(' '),f:[['water','M0 161 H360 V200 H0Z']]},
  {n:{en:'Distant hills',lv:'Tālie pakalni'},d:'M0 142 Q30 130 70 138 T150 133 T230 138 T300 129 T360 136',f:[['hill','M0 142 Q30 130 70 138 T150 133 T230 138 T300 129 T360 136 V160 H0Z']]},
  {n:{en:'The sun',lv:'Saule'},cls:'sun',d:'M318 34 a12 12 0 1 0 0.1 0 M318 22 v-6 M318 58 v6 M294 46 h-6 M342 46 h6 M301 29 l-4 -4 M335 29 l4 -4 M301 63 l-4 4 M335 63 l4 4',f:[['gold','M318 34 a12 12 0 1 0 0.1 0Z']]},
  {n:{en:'Trees on the bank',lv:'Koki krastā'},d:'M14 160 V152 M5 153 L14 135 L23 153 Z M8 144 L14 128 L20 144 Z M36 160 V154 M29 155 L36 141 L43 155 Z M346 160 V152 M338 153 L346 137 L354 153 Z',f:[['tree','M5 153 L14 128 L23 153 Z M29 155 L36 141 L43 155 Z M338 153 L346 137 L354 153 Z']]},
  {n:{en:'Clouds',lv:'Mākoņi'},d:'M48 46 q2 -8 11 -7 q4 -8 14 -5 q10 -2 11 6 q7 1 4 6 Z M182 30 q2 -7 10 -6 q5 -7 13 -3 q8 -1 9 6 q6 1 3 5 Z',f:[['cloud','M48 46 q2 -8 11 -7 q4 -8 14 -5 q10 -2 11 6 q7 1 4 6 Z M182 30 q2 -7 10 -6 q5 -7 13 -3 q8 -1 9 6 q6 1 3 5 Z']]},
  {n:{en:'Birds',lv:'Putni'},d:'M116 56 q4 -4 8 0 q4 -4 8 0 M146 44 q3 -3 6 0 q3 -3 6 0 M266 60 q3 -3 6 0 q3 -3 6 0'},
  // Chapter II — the town walls
  {n:{en:'The town wall',lv:'Pilsētas mūris'},d:crenel(50,314,146),f:[['stone','M50 146 H314 V160 H50Z']]},
  {n:{en:'The Powder Tower',lv:'Pulvertornis'},d:'M56 146 V104 H78 V146 M54 104 L67 86 L80 104 Z M56 118 H78 M56 132 H78',f:[['stone','M56 104 H78 V146 H56Z'],['roof','M54 104 L67 86 L80 104 Z']]},
  {n:{en:"A merchant's house",lv:'Tirgotāja nams'},d:'M86 146 V118 L95 104 L104 118 V146 M93 146 v-7 h4 v7',f:[['plaster','M86 146 V118 L95 104 L104 118 V146Z']]},
  {n:{en:'The second brother',lv:'Otrais brālis'},d:'M106 146 V124 H109 V119 H112 V114 H116 V119 H119 V124 H122 V146',f:[['plaster2','M106 146 V124 H109 V119 H112 V114 H116 V119 H119 V124 H122 V146Z']]},
  {n:{en:'The third brother',lv:'Trešais brālis'},d:'M124 146 V126 Q131 110 138 126 V146',f:[['plaster3','M124 146 V126 Q131 110 138 126 V146Z']]},
  {n:{en:'The Swedish Gate',lv:'Zviedru vārti'},d:'M286 146 V118 H310 V146 M284 118 L298 104 L312 118 M292 160 V151 Q298 142 304 151 V160',f:[['stone','M286 118 H310 V146 H286Z'],['roof','M284 118 L298 104 L312 118 Z']]},
  {n:{en:'Windows',lv:'Logi'},d:winGrid(WINDOWS)},
  // Chapter III — the churches
  {n:{en:'The Cathedral',lv:'Doma baznīca'},d:'M150 146 V124 L178 110 L206 124 V146 M150 124 H206',f:[['stone','M150 124 H206 V146 H150Z'],['roof2','M150 124 L178 110 L206 124 Z']]},
  {n:{en:'The Cathedral tower',lv:'Doma tornis'},d:'M169 118 V82 H183 V118 M166 82 Q176 72 186 82 M171 74 Q176 64 181 74 M176 64 V46 M176 46 a2 2 0 1 0 0.1 0',f:[['stone','M169 82 H183 V118 H169Z'],['roof2','M166 82 Q176 72 186 82 Z M171 74 Q176 64 181 74 Z']]},
  {n:{en:"St Peter's Church",lv:'Pēterbaznīca'},d:'M222 146 V126 L246 112 L270 126 V146 M222 126 H270',f:[['stone','M222 126 H270 V146 H222Z'],['roof2','M222 126 L246 112 L270 126 Z']]},
  {n:{en:"St Peter's spire",lv:'Pētera tornis'},d:'M240 120 V84 H252 V120 M238 84 L246 72 L254 84 M241 72 L246 60 L251 72 M244 60 L246 24 L248 60',f:[['stone','M240 84 H252 V120 H240Z'],['roof2','M238 84 L246 72 L254 84 Z M241 72 L246 60 L251 72 Z M244 60 L246 24 L248 60 Z']]},
  {n:{en:'The golden rooster',lv:'Zelta gailis'},d:'M246 24 V16 M242 16 q1 -6 6 -5 q3 1 1 4 l3 1 h-10 Z',f:[['gold','M242 16 q1 -6 6 -5 q3 1 1 4 l3 1 h-10 Z']]},
  {n:{en:'Gothic windows',lv:'Gotiskie logi'},d:[156,166,190,198,228,236,258,264].map(x=>`M${x} 144 V136 Q${x+2.5} 130 ${x+5} 136 V144`).join(' ')},
  // Chapter IV — ships on the Daugava
  {n:{en:'A sailing ship',lv:'Burinieks'},d:'M28 170 H84 L77 181 H36 Z M56 170 V128 M57 133 Q74 146 57 162 M55 135 Q40 147 55 162 M56 128 h8 l-3 3 l3 3 h-8',f:[['wood','M28 170 H84 L77 181 H36 Z'],['sail','M57 133 Q74 146 57 162 Z M55 135 Q40 147 55 162 Z']]},
  {n:{en:'A fishing boat',lv:'Zvejnieku laiva'},d:'M268 182 Q284 190 300 182 Z M284 182 V164 L296 179 Z',f:[['wood','M268 182 Q284 190 300 182 Z'],['sail','M284 164 L296 179 L284 179 Z']]},
  {n:{en:'The pontoon bridge',lv:'Pontonu tilts'},d:'M316 160 L360 168 M322 161 V171 M334 163 V173 M346 165 V175 M358 167 V177'},
  {n:{en:'Flags',lv:'Karogi'},html:flag(67,86)+flag(298,104)+flag(246,72)},
  // Chapter V — evening
  {n:{en:'Chimney smoke',lv:'Dūmi no skursteņiem'},d:'M99 112 V104 h3 v5 M100 102 q-4 -4 0 -8 q4 -4 0 -9 M118 112 V106 h3 v4 M119 104 q4 -4 0 -8 q-4 -4 0 -8'},
  {n:{en:'Evening lights',lv:'Vakara gaismas'},d:'M36 28 a9 9 0 1 0 10 12 a7 7 0 1 1 -10 -12 Z M90 26 h0.1 M140 18 h0.1 M210 52 h0.1 M300 20 h0.1 M330 74 h0.1',cls:'stars',f:[['glow',winGrid(WINDOWS)],['moon','M36 28 a9 9 0 1 0 10 12 a7 7 0 1 1 -10 -12 Z']]},
  {n:{en:'The title ribbon',lv:'Lente ar nosaukumu'},d:'M120 8 H240 L234 16 L240 24 H120 L126 16 Z',html:'<text x="180" y="21" text-anchor="middle" class="ribbon-t">Rihga</text>',f:[['ribbon','M120 8 H240 L234 16 L240 24 H120 L126 16 Z']]},
];

function sceneSVG({big=false,animateOnly=-1}={}){
  const doneIdx=ALL_LESSONS.map(l=>!!S.lessons[l.id]);
  const unitDoneArr=UNITS.map((u,ui)=>unitDone(S,ui));
  const next=ALL_LESSONS.findIndex(l=>!S.lessons[l.id]);
  const evening=unitDoneArr[4];
  let back='',front='';
  SCENE.forEach((e,i)=>{
    const ui=ALL_LESSONS[i].ui,done=doneIdx[i],coloured=unitDoneArr[ui];
    const st=done?'done':i===next?'next':'future';
    const anim=done&&i===animateOnly?' draw-in':'';
    if(coloured&&e.f)back+=e.f.map(([k,d])=>`<path d="${d}" class="wash w-${k}"/>`).join('');
    front+=`<g class="el ${st}${anim} ${e.cls||''}" data-i="${i}">${e.d?`<path d="${e.d}" pathLength="1"/>`:''}${e.html&&(done||st!=='future')?e.html:''}</g>`;
  });
  const sky=unitDoneArr[0]?`<rect width="360" height="160" class="wash w-${evening?'night':'sky'}"/>`:'';
  return `<svg class="scene ${evening?'evening':''} ${big?'big':''}" viewBox="0 0 360 200" role="img" aria-label="${esc(t('scene_title'))}">${sky}${back}${front}</svg>`;
}
function sceneCaption(){
  const done=ALL_LESSONS.filter(l=>S.lessons[l.id]).length,next=ALL_LESSONS.findIndex(l=>!S.lessons[l.id]);
  return{done,total:ALL_LESSONS.length,next:next<0?null:L(SCENE[next].n)};
}
