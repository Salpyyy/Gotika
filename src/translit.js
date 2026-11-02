/* ===================== TRANSCRIBER: modern Latvian -> old orthography ===================== */
// Two historical styles:
//  bible: 18th–19th c. church print (as in "Mihłais Latweeti"): s and z both as long ſ, š and ž both as ſch.
//  press: late 19th – early 20th c. newspapers: voiceless s as crossed long s (ꞩ), z as plain ſ, ž as ꞩch,
//         ſ (not ꞩ) before t and p. These press conventions follow the observations in
//         Kaspars Foigts' (laacz) Frakturizer, https://github.com/laacz/misc (reimplemented, not copied).
// Both: ā ē ī ū -> ah eh ih uh (a hat â ê î û on a word-final long vowel), ie -> ee, v -> w, c -> z,
//       č -> tſch, dz -> dſ, ļ ņ ķ ģ ŗ -> crossed letters, round s at the end of a word.
const REV_DICT = (()=>{const m={};VOCAB.forEach(v=>{m[v.mod.toLowerCase()]=v.old;});
  Object.entries(GLOSS_EXTRA).forEach(([o,[mod]])=>{const k=mod.toLowerCase();if(!m[k])m[k]=o;});return m;})();
const LONGV={'ā':'a','ē':'e','ī':'i','ū':'u','ō':'o'};
const HAT={'a':'â','e':'ê','i':'î','u':'û','o':'ô'};
const VOWELS='aeiouāēīūō';
const CROSS={'ļ':'ł','ņ':'ꞥ','ķ':'ꞣ','ģ':'ꞡ','ŗ':'ŗ'};

function doubleConsonant(w){
  // experimental: short vowel in the first syllable + single consonant + vowel -> doubled consonant (zeme -> zemme)
  const m=w.match(/^([^aeiouāēīūō]*)([aeiu])([lmnrtkpbdgsczļņ])([aeiouāēīūō])/);
  if(!m)return w;
  const before=w.slice(0,m[1].length+1);if(/[aeiou]$/.test(m[1]))return w; // diphthong
  return before+m[3]+w.slice(m[1].length+1);
}
function oldWord(word,{style='bible',dbl=false}={}){
  const lw=word.toLowerCase();
  const allCaps=word.length>1&&word===word.toUpperCase()&&word!==lw;
  const cap=word.charAt(0)!==word.charAt(0).toLowerCase();
  let out;
  if(style==='bible'&&REV_DICT[lw]){out=REV_DICT[lw].toLowerCase().replace(/s(?=[a-zâêîôûäöüſßłꞥꞣꞡŗ])/g,'ſ');}
  else{
    const w=dbl?doubleConsonant(lw):lw;const press=style==='press';let o='';
    for(let i=0;i<w.length;i++){
      const c=w[i],n=w[i+1]||'',end=!/[a-zāēīūōčšžļņķģŗ]/i.test(w[i+1]||'');
      if(c==='i'&&n==='e'){o+='ee';i++;continue;}
      if(c==='d'&&n==='ž'){o+='d'+(press?'ꞩch':'ſch');i++;continue;}
      if(c==='d'&&n==='z'){o+='dſ';i++;continue;}
      if(LONGV[c]){o+=end&&c!=='ō'?HAT[LONGV[c]]:(c==='ō'?'o':LONGV[c]+'h');continue;}
      if(c==='č'){o+='tſch';continue;}
      if(c==='š'){o+='ſch';continue;}
      if(c==='ž'){o+=press?'ꞩch':'ſch';continue;}
      if(c==='c'){o+='z';continue;}
      if(c==='z'){o+=press?'\u01B5':'ſ';continue;} // press: z stays a long ſ even at the end of a word
      if(c==='s'){o+=press?(/[tp]/.test(n)?'ſ':'ꞩ'):'ſ';continue;}
      if(c==='v'){o+='w';continue;}
      if(CROSS[c]){o+=CROSS[c];continue;}
      o+=c;
    }
    // round s at the end of a word
    out=o.replace(/[ſꞩ]$/,'s').replace(/\u01B5/g,'ſ');
  }
  if(allCaps)return out.replace(/ſ|ꞩ/g,'S').toUpperCase();
  if(cap){const f=out.charAt(0);out=(f==='ſ'||f==='ꞩ'?'S':f.toUpperCase())+out.slice(1);}
  return out;
}
function transcribe(text,opts){
  return String(text).replace(/[A-Za-zĀāĒēĪīŪūŌōČčŠšŽžĻļŅņĶķĢģŖŗ]+/g,w=>oldWord(w,opts));
}
// Readable old spelling in plain Latin letters (no long s)
const oldLatin=s=>String(s).replace(/[ſꞩ]/g,'s');
