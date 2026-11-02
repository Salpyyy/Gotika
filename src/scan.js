/* ===================== HANDWRITING SCANNER (photo of paper, or stylus) ===================== */
// 1) adaptive threshold (Bradley) so uneven light on paper still gives clean ink
// 2) connected components, dropping specks and shapes touching the photo edge
// 3) merge components that overlap horizontally into letters (i + its dot, broken strokes)
// 4) force the count to the expected number by merging the smallest gaps / splitting the widest letter
// 5) each letter is thinned and compared with every Fraktur letter (same matcher as the drawing pad)

function imageToInk(img,maxSide=900){
  const sc=Math.min(1,maxSide/Math.max(img.width,img.height));const w=Math.max(1,Math.round(img.width*sc)),h=Math.max(1,Math.round(img.height*sc));
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});
  x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(img,0,0,w,h);
  const d=x.getImageData(0,0,w,h).data;const g=new Float64Array(w*h);
  for(let i=0;i<w*h;i++)g[i]=.299*d[i*4]+.587*d[i*4+1]+.114*d[i*4+2];
  // integral image
  const I=new Float64Array((w+1)*(h+1));
  for(let y=0;y<h;y++){let row=0;for(let X=0;X<w;X++){row+=g[y*w+X];I[(y+1)*(w+1)+X+1]=I[y*(w+1)+X+1]+row;}}
  const s=Math.max(8,Math.round(Math.max(w,h)/14)),half=s>>1,T=.18;const ink=new Uint8Array(w*h);
  for(let y=0;y<h;y++)for(let X=0;X<w;X++){
    const x1=Math.max(0,X-half),x2=Math.min(w-1,X+half),y1=Math.max(0,y-half),y2=Math.min(h-1,y+half);
    const cnt=(x2-x1+1)*(y2-y1+1);const sum=I[(y2+1)*(w+1)+x2+1]-I[y1*(w+1)+x2+1]-I[(y2+1)*(w+1)+x1]+I[y1*(w+1)+x1];
    if(g[y*w+X]*cnt<sum*(1-T)&&g[y*w+X]<200)ink[y*w+X]=1;
  }
  return{ink,w,h};
}
function strokesToInk(strokes,size){
  const c=document.createElement('canvas');c.width=size.w;c.height=size.h;const x=c.getContext('2d',{willReadFrequently:true});
  x.fillStyle='#fff';x.fillRect(0,0,size.w,size.h);x.strokeStyle='#000';x.fillStyle='#000';x.lineWidth=Math.max(3,size.h*.025);x.lineCap='round';x.lineJoin='round';
  strokes.forEach(st=>{if(st.length===1){x.beginPath();x.arc(st[0].x,st[0].y,x.lineWidth/2,0,7);x.fill();return;}x.beginPath();st.forEach((p,i)=>i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y));x.stroke();});
  const d=x.getImageData(0,0,size.w,size.h).data;const ink=new Uint8Array(size.w*size.h);for(let i=0;i<ink.length;i++)ink[i]=d[i*4]<128?1:0;
  return{ink,w:size.w,h:size.h,clean:true};
}
function components({ink,w,h,clean}){
  const lab=new Int32Array(w*h);const comps=[];let id=0;const stack=[];
  for(let i=0;i<w*h;i++){if(!ink[i]||lab[i])continue;id++;let x0=w,y0=h,x1=0,y1=0,n=0,edge=false;stack.push(i);lab[i]=id;const px=[];
    while(stack.length){const p=stack.pop();const X=p%w,Y=(p/w)|0;px.push(p);n++;if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y;if(X===0||Y===0||X===w-1||Y===h-1)edge=true;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=X+dx,ny=Y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;const q=ny*w+nx;if(ink[q]&&!lab[q]){lab[q]=id;stack.push(q);}}}
    comps.push({x0,y0,x1,y1,n,edge,px});}
  const area=w*h;
  return comps.filter(c=>c.n>=Math.max(clean?2:12,area*.00012)&&(clean||!c.edge)&&(c.x1-c.x0)*(c.y1-c.y0)<area*.5);
}
function groupLetters(comps,expected){
  if(!comps.length)return[];
  // keep the main text line: components whose vertical centre is near the median line
  const hs=comps.map(c=>c.y1-c.y0).sort((a,b)=>a-b);const mh=hs[hs.length>>1]||1;
  const cy=comps.map(c=>(c.y0+c.y1)/2).sort((a,b)=>a-b);const my=cy[cy.length>>1];
  let cs=comps.filter(c=>Math.abs((c.y0+c.y1)/2-my)<mh*2.2);
  cs.sort((a,b)=>a.x0-b.x0);
  // merge horizontally overlapping components (dots, broken strokes)
  let g=[];cs.forEach(c=>{const last=g[g.length-1];
    if(last){const ov=Math.min(last.x1,c.x1)-Math.max(last.x0,c.x0);const narrow=Math.min(last.x1-last.x0,c.x1-c.x0)+1;
      if(ov>narrow*.35){last.parts.push(c);last.x0=Math.min(last.x0,c.x0);last.x1=Math.max(last.x1,c.x1);last.y0=Math.min(last.y0,c.y0);last.y1=Math.max(last.y1,c.y1);return;}}
    g.push({parts:[c],x0:c.x0,x1:c.x1,y0:c.y0,y1:c.y1});});
  const merge=(a,b)=>({parts:[...a.parts,...b.parts],x0:Math.min(a.x0,b.x0),x1:Math.max(a.x1,b.x1),y0:Math.min(a.y0,b.y0),y1:Math.max(a.y1,b.y1)});
  if(expected){
    while(g.length>expected){let bi=0,bg=Infinity;for(let i=0;i<g.length-1;i++){const gap=g[i+1].x0-g[i].x1;if(gap<bg){bg=gap;bi=i;}}g.splice(bi,2,merge(g[bi],g[bi+1]));}
    while(g.length<expected){let wi=0,ww=-1;g.forEach((x,i)=>{if(x.x1-x.x0>ww){ww=x.x1-x.x0;wi=i;}});const big=g[wi];if(ww<4)break;
      const mid=(big.x0+big.x1)/2;const L={parts:[],x0:Infinity,x1:-Infinity,y0:Infinity,y1:-Infinity},R={parts:[],x0:Infinity,x1:-Infinity,y0:Infinity,y1:-Infinity};
      // split the widest letter at its middle column (letterCanvas crops pixels to x0..x1)
      g.splice(wi,1,{...big,split:mid,parts:big.parts,x1:Math.floor(mid)},{...big,split:mid,parts:big.parts,x0:Math.ceil(mid)});}
  }
  return g;
}
function letterCanvas(grp,src){
  const pad=4,w=grp.x1-grp.x0+1+pad*2,h=grp.y1-grp.y0+1+pad*2;const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
  const im=x.createImageData(w,h);
  grp.parts.forEach(p=>p.px.forEach(q=>{const X=q%src.w,Y=(q/src.w)|0;if(X<grp.x0||X>grp.x1)return;const i=((Y-grp.y0+pad)*w+(X-grp.x0+pad))*4;im.data[i+3]=255;}));
  x.putImageData(im,0,0);return c;
}
function thumbCanvas(lc,cssv){const c=document.createElement('canvas');const s=64;c.width=c.height=s;const x=c.getContext('2d');
  const sc=Math.min((s-8)/lc.width,(s-8)/lc.height);x.drawImage(lc,(s-lc.width*sc)/2,(s-lc.height*sc)/2,lc.width*sc,lc.height*sc);
  x.globalCompositeOperation='source-in';x.fillStyle=cssv;x.fillRect(0,0,s,s);return c.toDataURL();}
function rankLetters(lc,candidates){
  const prep=prepUser(lc);if(!prep)return[];
  return candidates.map(ch=>({ch,s:compareSkel(prep,ch)})).sort((a,b)=>b.s-a.s);
}
function readHandwriting(src,targets){
  const comps=components(src);const groups=groupLetters(comps,targets.length);
  const cand=Object.keys(LETTERS);
  return{found:groups.length,letters:groups.map((g,i)=>{const lc=letterCanvas(g,src);const rank=rankLetters(lc,cand);const tgt=targets[i];
    const own=tgt?(rank.find(r=>r.ch===tgt)?.s??0):0;return{canvas:lc,target:tgt,score:own,top:rank.slice(0,3)};})};
}
