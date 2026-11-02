/* ===================== COURSE CONTENT (lv + en) ===================== */
// Crossed letters of the pre-1921 orthography. Rendered as the base glyph with a stroke drawn over it.
const STK = {'ł':'l','Ł':'L','ꞥ':'n','Ꞥ':'N','ŗ':'r','Ŗ':'R','ꞣ':'k','Ꞣ':'K','ꞡ':'g','Ꞡ':'G','ꞩ':'ſ','Ꞩ':'S'};

// lat = how the letter is shown in Latin script; tip = how to spot it.
const LETTERS = {
  a:{lat:'a',tip:{en:'A closed, broken bowl with a straight stem on the right. Compare with <b>o</b> (no stem) and <b>d</b> (stem curls left).',lv:'Slēgts, lauzts lociņš ar taisnu kātu labajā pusē. Salīdzini ar <b>o</b> (bez kāta) un <b>d</b> (kāts liecas pa kreisi).'}},
  e:{lat:'e',tip:{en:'Like <b>c</b> with a small horn on top. In old texts <b>ee</b> is read as <b>ie</b>: Deews = Dievs.',lv:'Kā <b>c</b> ar mazu ragu augšā. Vecajos tekstos <b>ee</b> lasa kā <b>ie</b>: Deews = Dievs.'}},
  i:{lat:'i',tip:{en:'One broken stroke with a dot. In old texts <b>ih</b> is a long <b>ī</b>: mihłais = mīļais.',lv:'Viena lauzta svītra ar punktu. Vecajos tekstos <b>ih</b> ir garais <b>ī</b>: mihłais = mīļais.'}},
  o:{lat:'o',tip:{en:'Two angular halves, like a lemon. No stem.',lv:'Divas stūrainas pusītes, kā citrons. Bez kāta.'}},
  u:{lat:'u',tip:{en:'Two stems joined at the <b>bottom</b>, open at the top. <b>n</b> is the reverse.',lv:'Divi kāti, savienoti <b>apakšā</b>, augšā vaļā. <b>n</b> ir otrādi.'}},
  n:{lat:'n',tip:{en:'Two stems joined at the <b>top</b>. Easy to mix up with <b>u</b>.',lv:'Divi kāti, savienoti <b>augšā</b>. Viegli sajaukt ar <b>u</b>.'}},
  m:{lat:'m',tip:{en:'Three stems joined at the top.',lv:'Trīs kāti, savienoti augšā.'}},
  r:{lat:'r',tip:{en:'A stem with a little flag on the top right.',lv:'Kāts ar mazu karodziņu augšā pa labi.'}},
  l:{lat:'l',tip:{en:'A tall stem with a split top. Taller than <b>t</b>.',lv:'Garš kāts ar šķeltu galu. Garāks par <b>t</b>.'}},
  t:{lat:'t',tip:{en:'Shorter than <b>l</b>, with a crossbar. Don’t mix it with <b>k</b> or <b>f</b>.',lv:'Īsāks par <b>l</b>, ar šķērssvītru. Nejauc ar <b>k</b> vai <b>f</b>.'}},
  s:{lat:'s',name:{en:'s (round)',lv:'s (apaļais)'},tip:{en:'Round s. Printers used it only at the <b>end</b> of a word: tas, us, Deews.',lv:'Apaļais s. Iespiedēji to lika tikai <b>vārda beigās</b>: tas, us, Deews.'}},
  'ſ':{lat:'s',name:{en:'s (long ſ)',lv:'s (garais ſ)'},tip:{en:'Long s, used at the start and in the middle of words. It has <b>no bar through the right side</b>. With a bar it is <b>f</b>.',lv:'Garais s – vārda sākumā un vidū. Tam <b>nav svītras cauri labajai pusei</b>. Ar svītru tas ir <b>f</b>.'}},
  f:{lat:'f',tip:{en:'Like long <b>ſ</b>, but the crossbar goes all the way through.',lv:'Kā garais <b>ſ</b>, bet šķērssvītra iet cauri visam burtam.'}},
  b:{lat:'b',tip:{en:'A tall stem with a closed bowl at the bottom. <b>h</b> has an open tail instead.',lv:'Garš kāts ar slēgtu lociņu apakšā. <b>h</b> tā vietā ir vaļēja aste.'}},
  h:{lat:'h',tip:{en:'A tall stem whose tail dips below the line. After a vowel, h means the vowel is <b>long</b>: ah = ā.',lv:'Garš kāts, kura aste nolaižas zem līnijas. Pēc patskaņa h nozīmē, ka patskanis ir <b>garš</b>: ah = ā.'}},
  d:{lat:'d',tip:{en:'A bowl whose stem curls back to the left at the top.',lv:'Lociņš, kura kāts augšā izliecas atpakaļ pa kreisi.'}},
  k:{lat:'k',tip:{en:'A tall stem with a loop at the top and a small leg. Compare with <b>f</b> and <b>t</b>.',lv:'Garš kāts ar cilpu augšā un mazu kājiņu. Salīdzini ar <b>f</b> un <b>t</b>.'}},
  c:{lat:'c',tip:{en:'Like <b>e</b> without the horn. Mostly seen in <b>ch</b> and <b>ck</b>.',lv:'Kā <b>e</b> bez raga. Parasti redzams savienojumos <b>ch</b> un <b>ck</b>.'}},
  z:{lat:'z',tip:{en:'Like a 3 with a tail below the line. In old Latvian <b>z</b> is read as <b>c</b>: Zilweks = cilvēks.',lv:'Kā cipars 3 ar asti zem līnijas. Vecajā rakstībā <b>z</b> lasa kā <b>c</b>: Zilweks = cilvēks.'}},
  g:{lat:'g',tip:{en:'A bowl with a hook below the line.',lv:'Lociņš ar āķi zem līnijas.'}},
  j:{lat:'j',tip:{en:'Like <b>i</b>, but it dips below the line.',lv:'Kā <b>i</b>, bet nolaižas zem līnijas.'}},
  p:{lat:'p',tip:{en:'The stem goes below the line, the bowl sits on the right.',lv:'Kāts iet zem līnijas, lociņš ir labajā pusē.'}},
  w:{lat:'w',tip:{en:'Looks like a looped <b>m</b>. In old Latvian <b>w</b> is read as <b>v</b>: Wahrds = vārds.',lv:'Izskatās pēc <b>m</b> ar cilpu. Vecajā rakstībā <b>w</b> lasa kā <b>v</b>: Wahrds = vārds.'}},
  v:{lat:'v',tip:{en:'Rare in old Latvian, since <b>w</b> was used instead. Has a looped top.',lv:'Vecajā latviešu drukā retums – <b>v</b> vietā rakstīja <b>w</b>. Augšā ar cilpu.'}},
  'ß':{lat:'ß',name:{en:'ß (sharp s)',lv:'ß (asais s)'},tip:{en:'The ſs ligature. Read it as a plain <b>s</b> sound.',lv:'ſs savienojums (ligatūra). Lasa kā vienkāršu <b>s</b>.'}},
  A:{lat:'A',tip:{en:'A rounded body with a crossing stroke at the top left. Without it, it reads as <b>U</b>.',lv:'Noapaļots ķermenis ar šķērsvilcienu augšā pa kreisi. Bez tā tas izskatās pēc <b>U</b>.'}},
  U:{lat:'U',tip:{en:'Like <b>A</b> without the crossing top stroke.',lv:'Kā <b>A</b>, tikai bez šķērsvilciena augšā.'}},
  N:{lat:'N',tip:{en:'Two humps with a little foot. Compare with <b>U</b> and <b>A</b>.',lv:'Divi kupri ar mazu kājiņu. Salīdzini ar <b>U</b> un <b>A</b>.'}},
  M:{lat:'M',tip:{en:'Three humps. <b>W</b> looks similar but has a loop.',lv:'Trīs kupri. <b>W</b> ir līdzīgs, bet ar cilpu.'}},
  B:{lat:'B',tip:{en:'Tall stem with two bellies. <b>V</b> and <b>W</b> are its look-alikes.',lv:'Garš kāts ar diviem vēderiem. <b>V</b> un <b>W</b> ir tā dvīņi.'}},
  W:{lat:'W',tip:{en:'Like <b>M</b> with a loop. Read it as <b>V</b>: Wahrds = Vārds.',lv:'Kā <b>M</b> ar cilpu. Lasi kā <b>V</b>: Wahrds = Vārds.'}},
  V:{lat:'V',tip:{en:'Rare. Like <b>B</b> with an open bottom.',lv:'Retums. Kā <b>B</b> ar vaļēju apakšu.'}},
  E:{lat:'E',tip:{en:'Like <b>C</b> with an extra bar in the middle.',lv:'Kā <b>C</b> ar papildu svītru vidū.'}},
  D:{lat:'D',tip:{en:'A big rounded body with a flag at the top left.',lv:'Liels, apaļš ķermenis ar karodziņu augšā pa kreisi.'}},
  G:{lat:'G',tip:{en:'Like <b>C</b> with a spur at the bottom right.',lv:'Kā <b>C</b> ar piesi apakšā pa labi.'}},
  S:{lat:'S',tip:{en:'A curly capital that looks almost like <b>G</b>. It can be <b>s</b> or <b>z</b>: Seewa = sieva, Semme = zeme.',lv:'Lokains lielais burts, gandrīz kā <b>G</b>. Var būt <b>s</b> vai <b>z</b>: Seewa = sieva, Semme = zeme.'}},
  T:{lat:'T',tip:{en:'A round body with a wavy bar on top.',lv:'Apaļš ķermenis ar viļņotu svītru augšā.'}},
  I:{lat:'I',tip:{en:'<b>I</b> and <b>J</b> look almost the same. I sits on the line.',lv:'<b>I</b> un <b>J</b> izskatās gandrīz vienādi. I stāv uz līnijas.'}},
  J:{lat:'J',tip:{en:'Like <b>I</b>, but it dips below the line: Jesus, Jahnis.',lv:'Kā <b>I</b>, bet nolaižas zem līnijas: Jesus, Jahnis.'}},
  K:{lat:'K',tip:{en:'Leaning, with a loop on the left. <b>R</b> looks very close.',lv:'Sasvērts, ar cilpu kreisajā pusē. <b>R</b> izskatās ļoti līdzīgi.'}},
  R:{lat:'R',tip:{en:'Like <b>K</b>, but the upper part is a closed loop.',lv:'Kā <b>K</b>, bet augšdaļa ir slēgta cilpa.'}},
  L:{lat:'L',tip:{en:'A curly wave on top of a stem.',lv:'Lokains vilnis virs kāta.'}},
  P:{lat:'P',tip:{en:'A stem with a rounded bowl. <b>D</b> has no stem below.',lv:'Kāts ar noapaļotu lociņu. <b>D</b> nav kāta lejā.'}},
  Z:{lat:'Z',tip:{en:'A big 3 with a tail. Read it as <b>C</b>: Zilweks = Cilvēks.',lv:'Liels 3 ar asti. Lasi kā <b>C</b>: Zilweks = Cilvēks.'}},
  C:{lat:'C',tip:{en:'A curl with a short bar inside. Rare in Latvian words.',lv:'Cilpa ar īsu svītriņu iekšā. Latviešu vārdos reti.'}},
  H:{lat:'H',tip:{en:'Curly, like a fancy <b>h</b> with a belly.',lv:'Lokains, kā grezns <b>h</b> ar vēderu.'}},
  'ł':{lat:'ļ',name:{en:'ł = ļ',lv:'ł = ļ'},tip:{en:'A crossed <b>l</b> is the soft <b>ļ</b>: mihłais = mīļais, pakkał = pakaļ.',lv:'Pārsvītrots <b>l</b> ir mīkstais <b>ļ</b>: mihłais = mīļais, pakkał = pakaļ.'}},
  'ꞥ':{lat:'ņ',name:{en:'ꞥ = ņ',lv:'ꞥ = ņ'},tip:{en:'A crossed <b>n</b> is the soft <b>ņ</b>: Ꞣehniꞥsch = ķēniņš.',lv:'Pārsvītrots <b>n</b> ir mīkstais <b>ņ</b>: Ꞣehniꞥsch = ķēniņš.'}},
  'ŗ':{lat:'ŗ',name:{en:'ŗ (soft r)',lv:'ŗ (mīkstais r)'},tip:{en:'A crossed <b>r</b> was the soft r. Modern Latvian writes plain <b>r</b>.',lv:'Pārsvītrots <b>r</b> bija mīkstais r. Mūsdienās raksta vienkāršu <b>r</b>.'}},
  'ꞣ':{lat:'ķ',name:{en:'ꞣ = ķ',lv:'ꞣ = ķ'},tip:{en:'A crossed <b>k</b> is <b>ķ</b>: Ꞣehniꞥsch = ķēniņš.',lv:'Pārsvītrots <b>k</b> ir <b>ķ</b>: Ꞣehniꞥsch = ķēniņš.'}},
  'ꞡ':{lat:'ģ',name:{en:'ꞡ = ģ',lv:'ꞡ = ģ'},tip:{en:'A crossed <b>g</b> is <b>ģ</b>: Eꞥꞡelis = eņģelis.',lv:'Pārsvītrots <b>g</b> ir <b>ģ</b>: Eꞥꞡelis = eņģelis.'}},
};
const CONF = {
  a:'uod',e:'cto',i:'ljr',o:'ade',u:'nam',n:'umr',m:'wnu',r:'til',l:'tfſ',t:'flk',s:'ßzo','ſ':'flk',f:'ſkt',
  b:'hdl',h:'bkſ',d:'oba',k:'fth',c:'etr',z:'gjh',g:'zjp',j:'izg',p:'vbg',w:'mvn',v:'wbp','ß':'ſsB',
  A:'UNR',U:'ANV',N:'UAM',M:'WNR',B:'VWR',W:'MBV',V:'BWD',E:'CGT',D:'BPG',G:'CES',S:'GEC',T:'CIE',
  I:'JTL',J:'ITL',K:'RLH',R:'KBN',L:'CTI',P:'DRB',Z:'JGB',C:'EGT',H:'SBK',
  'ł':'ltꞥ','ꞥ':'nuł','ŗ':'rtꞣ','ꞣ':'kfŗ','ꞡ':'gzꞥ'
};

// Vocabulary in the old (Bible-style) spelling: [old, modern, English]
const VOCAB = [
  ['Deews','Dievs','God'],['Grahmata','grāmata','book; scripture'],['Wahrds','vārds','word; name'],
  ['Zilweks','cilvēks','person, human'],['Seewa','sieva','woman, wife'],['Behrns','bērns','child'],
  ['Debbesis','debesis','heaven, sky'],['Semme','zeme','earth, land'],['Pasaule','pasaule','world'],
  ['Kungs','kungs','lord, master'],['Galwa','galva','head'],['Sehkla','sēkla','seed'],
  ['Tschuhska','čūska','snake'],['Grehks','grēks','sin'],['Swehts','svēts','holy'],
  ['mihłais','mīļais','dear'],['Latweetis','latvietis','a Latvian'],['muhschigs','mūžīgs','eternal'],
  ['Laiks','laiks','time'],['Dehls','dēls','son'],['Tehws','tēvs','father'],['Mahte','māte','mother'],
  ['Eꞥꞡelis','eņģelis','angel'],['Ꞣehniꞥsch','ķēniņš','king'],['Jumprawa','jumprava','maiden'],
  ['Leeziba','liecība','testimony'],['Schehlastiba','žēlastība','grace, mercy'],['Mahzitajs','mācītājs','teacher, pastor'],
  ['Wehsts','vēsts','news, message'],['Gars','gars','spirit'],['Dsihwiba','dzīvība','life'],
  ['Tizziba','ticība','faith'],['Meesa','miesa','body, flesh'],['Pateesiba','patiesība','truth'],
  ['Dseesma','dziesma','song'],['leels','liels','great, big'],['Sirds','sirds','heart'],
  ['irr','ir','is, are'],['un','un','and'],['tee','tie','they; the'],['pehz','pēc','after'],['us','uz','on, onto'],
  ['schi','šī','this'],['muhsu','mūsu','our'],['wiꞥsch','viņš','he'],['mehs','mēs','we'],['bet','bet','but'],
  ['jauns','jauns','new, young'],['eet','iet','to go'],['sinnaht','zināt','to know'],['teem','tiem','to them'],
  ['redseht','redzēt','to see'],['pakkał','pakaļ','after, behind'],['buhs','būs','will be'],['wiss','viss','all, everything'],
].map(([old,mod,en])=>({old,mod,en}));
const V = Object.fromEntries(VOCAB.map(v=>[v.old.toLowerCase(),v]));
const pickV = s => s.split('|').map(k=>V[k.toLowerCase()]).filter(Boolean);

const RULES = {
  long:{glyph:'ah',title:{en:'Long vowels: ah · eh · ih · uh',lv:'Garie patskaņi: ah · eh · ih · uh'},
    body:{en:'Printers in the 1700s–1800s followed German practice and marked a long vowel with a silent <b>h</b>. Read <b>ah</b> as <b>ā</b>, <b>eh</b> as <b>ē</b>, <b>ih</b> as <b>ī</b>, <b>uh</b> as <b>ū</b>. A hat on a vowel at the end of a word works the same way: <b>kâ</b> = kā, <b>laikâ</b> = laikā.',
          lv:'Grāmatu iespiedēji 18.–19. gadsimtā sekoja vācu paražai un garo patskani apzīmēja ar mēmu <b>h</b>. Lasi <b>ah</b> kā <b>ā</b>, <b>eh</b> kā <b>ē</b>, <b>ih</b> kā <b>ī</b>, <b>uh</b> kā <b>ū</b>. Jumtiņš virs patskaņa vārda beigās nozīmē to pašu: <b>kâ</b> = kā, <b>laikâ</b> = laikā.'},
    ex:[['Grahmata','grāmata'],['Behrns','bērns'],['mihłais','mīļais'],['muhsu','mūsu'],['Dehls','dēls'],['buhs','būs']]},
  ie:{glyph:'ee',title:{en:'ee is read ie',lv:'ee lasa kā ie'},
    body:{en:'Modern <b>ie</b> was written <b>ee</b>. This one rule unlocks a huge number of words: <b>Deews</b> = Dievs, <b>teem</b> = tiem, <b>Latweetis</b> = latvietis.',
          lv:'Mūsdienu <b>ie</b> rakstīja kā <b>ee</b>. Šis viens likums atver ļoti daudz vārdu: <b>Deews</b> = Dievs, <b>teem</b> = tiem, <b>Latweetis</b> = latvietis.'},
    ex:[['Deews','Dievs'],['teem','tiem'],['Seewa','sieva'],['Latweetis','latvietis'],['eet','iet'],['leels','liels']]},
  w:{glyph:'w',title:{en:'w is read v',lv:'w lasa kā v'},
    body:{en:'There was no <b>v</b> in old Latvian print. Every modern <b>v</b> is a <b>w</b>: <b>Wahrds</b> = vārds, <b>Galwa</b> = galva. Watch out: in Fraktur, <b>W</b> looks like a looped M.',
          lv:'Vecajā latviešu drukā nebija <b>v</b>. Katrs mūsdienu <b>v</b> ir <b>w</b>: <b>Wahrds</b> = vārds, <b>Galwa</b> = galva. Uzmanies: frakturā <b>W</b> izskatās pēc M ar cilpu.'},
    ex:[['Wahrds','vārds'],['Galwa','galva'],['Swehts','svēts'],['Tehws','tēvs'],['Wehsts','vēsts'],['wiss','viss']]},
  c:{glyph:'z',title:{en:'z is c, ds is dz',lv:'z ir c, ds ir dz'},
    body:{en:'The letter <b>z</b> stood for the sound <b>c</b>: <b>Zilweks</b> = cilvēks, <b>pehz</b> = pēc. The sound <b>dz</b> was written <b>ds</b>: <b>redsi</b> = redzi, <b>Dsihwiba</b> = dzīvība.',
          lv:'Burts <b>z</b> apzīmēja skaņu <b>c</b>: <b>Zilweks</b> = cilvēks, <b>pehz</b> = pēc. Skaņu <b>dz</b> rakstīja <b>ds</b>: <b>redsi</b> = redzi, <b>Dsihwiba</b> = dzīvība.'},
    ex:[['Zilweks','cilvēks'],['pehz','pēc'],['Tizziba','ticība'],['Dsihwiba','dzīvība'],['Dseesma','dziesma'],['redseht','redzēt']]},
  sh:{glyph:'ſch',title:{en:'sch is š or ž, s is s or z',lv:'sch ir š vai ž, s ir s vai z'},
    body:{en:'<b>sch</b> is <b>š</b> or <b>ž</b>, and <b>tsch</b> is <b>č</b>. A plain <b>s</b> can be <b>s</b> or <b>z</b>. Bible-style spelling doesn’t tell you which, so you learn it from the word: <b>Semme</b> = zeme, <b>us</b> = uz, but <b>Seewa</b> = sieva. Later newspapers crossed the long s (<b>ꞩ</b>) to mark a voiceless s.',
          lv:'<b>sch</b> ir <b>š</b> vai <b>ž</b>, un <b>tsch</b> ir <b>č</b>. Vienkāršs <b>s</b> var būt <b>s</b> vai <b>z</b>. Bībeles rakstība to nepasaka – to iemācās no vārda: <b>Semme</b> = zeme, <b>us</b> = uz, bet <b>Seewa</b> = sieva. Vēlākās avīzēs nebalsīgo s apzīmēja ar pārsvītrotu garo s (<b>ꞩ</b>).'},
    ex:[['schi','šī'],['Schehlastiba','žēlastība'],['muhschigs','mūžīgs'],['Tschuhska','čūska'],['Semme','zeme'],['us','uz']]},
  dbl:{glyph:'ł',title:{en:'Double letters and crossed letters',lv:'Dubultie un pārsvītrotie burti'},
    body:{en:'A short vowel was shown by <b>doubling</b> the next consonant: <b>irr</b> = ir, <b>Debbesis</b> = debesis. Soft consonants were <b>crossed</b>: <b>ł</b> = ļ, <b>ꞥ</b> = ņ, <b>ꞣ</b> = ķ, <b>ꞡ</b> = ģ.',
          lv:'Īsu patskani rādīja, <b>dubultojot</b> nākamo līdzskani: <b>irr</b> = ir, <b>Debbesis</b> = debesis. Mīkstos līdzskaņus <b>pārsvītroja</b>: <b>ł</b> = ļ, <b>ꞥ</b> = ņ, <b>ꞣ</b> = ķ, <b>ꞡ</b> = ģ.'},
    ex:[['irr','ir'],['Debbesis','debesis'],['sinnaht','zināt'],['Tizziba','ticība'],['pakkał','pakaļ'],['Ꞣehniꞥsch','ķēniņš']]},
};

const PHRASES = [
  {old:'Mihłais Latweeti',mod:'Mīļais latvieti',en:'Dear Latvian'},
  {old:'Deewa Swehtajs Wahrds',mod:'Dieva Svētais Vārds',en:'the Holy Word of God'},
  {old:'Schi Grahmata',mod:'Šī grāmata',en:'This book'},
  {old:'muhsu Kunga Jesus Kristus',mod:'mūsu Kunga Jēzus Kristus',en:'of our Lord Jesus Christ'},
  {old:'Deewa Behrni',mod:'Dieva bērni',en:'children of God'},
  {old:'tee pirmee Zilweki',mod:'tie pirmie cilvēki',en:'the first people'},
  {old:'Debbes un Semme',mod:'debess un zeme',en:'heaven and earth'},
  {old:'tas Deewa Dehls',mod:'tas Dieva Dēls',en:'the Son of God'},
  {old:'ne irr Eꞥꞡeli, bet Zilweki',mod:'nav eņģeļi, bet cilvēki',en:'not angels, but people'},
  {old:'no Pasaules Eesahkuma',mod:'no pasaules iesākuma',en:'from the beginning of the world'},
  {old:'Schehlastiba un Pateesiba',mod:'žēlastība un patiesība',en:'grace and truth'},
  {old:'ko tu sche redsi',mod:'ko tu še redzi',en:'which you see here'},
];

// Reading passages, transcribed from the foreword "Mihłais Latweeti" of an old Latvian New Testament
const PASSAGES = [
  {ref:{en:'Heading',lv:'Virsraksts'},old:'Mihłais Latweeti!',mod:'Mīļais latvieti!',en:'Dear Latvian!'},
  {ref:{en:'Line 1',lv:'1. rinda'},old:'Schi Grahmata, ko tu sche redsi, irr tas jauns Testaments muhsu Kunga Jesus Kristus, jeb Deewa Swehtajs Wahrds.',
    mod:'Šī grāmata, ko tu še redzi, ir tas jaunais Testaments mūsu Kunga Jēzus Kristus, jeb Dieva Svētais Vārds.',
    en:'This book that you see here is the New Testament of our Lord Jesus Christ, that is, the Holy Word of God.'},
  {ref:{en:'Line 4',lv:'4. rinda'},old:'No ta buhs tew to sinnaht:',mod:'No tā tev būs to zināt:',en:'From this you shall know:'},
  {ref:{en:'Lines 4–5',lv:'4.–5. rinda'},old:'Kad tee pirmee Zilweki Adams un Eewa grehkôs eekrittuschi…',mod:'Kad tie pirmie cilvēki Ādams un Ieva grēkos iekrituši…',en:'When the first people, Adam and Eve, had fallen into sin…'},
  {ref:{en:'1 Peter 2:21',lv:'1. Pēt. 2:21'},old:'ka mums wiꞥꞥa Pehdahm buhs pakkał eet.',mod:'ka mums viņa pēdām būs pakaļ iet.',en:'that we shall follow in his footsteps.'},
  {ref:{en:'Last paragraph',lv:'Pēdējā rindkopa'},old:'Kas scho Grahmatu rakstijuschi, ne irr Eꞥꞡeli, bet Zilweki bijuschi.',mod:'Kas šo grāmatu rakstījuši, nav eņģeļi, bet cilvēki bijuši.',en:'Those who wrote this book were not angels, but people.'},
  {ref:{en:'Line 33',lv:'33. rinda'},old:'Un kà tee Zilweki to leelu Schehlastibu atsihst…',mod:'Un kā tie cilvēki to lielo žēlastību atzīst…',en:'And as people recognise that great grace…'},
];
const GLOSS_EXTRA = {
  ko:['ko','which, that'],tu:['tu','you'],sche:['še','here'],redsi:['redzi','(you) see'],tas:['tas','the, that'],
  testaments:['testaments','testament'],kunga:['Kunga','of the Lord'],jesus:['Jēzus','Jesus'],kristus:['Kristus','Christ'],
  jeb:['jeb','or, that is'],deewa:['Dieva','of God'],swehtajs:['svētais','holy'],no:['no','from, of'],ta:['tā','of that'],
  tew:['tev','to you'],to:['to','that, it'],kad:['kad','when'],pirmee:['pirmie','first'],zilweki:['cilvēki','people'],
  adams:['Ādams','Adam'],eewa:['Ieva','Eve'],'grehkôs':['grēkos','in(to) sin'],eekrittuschi:['iekrituši','having fallen'],
  ka:['ka','that'],mums:['mums','to us'],'wiꞥꞥa':['viņa','his'],pehdahm:['pēdām','footsteps'],kas:['kas','who, which'],
  scho:['šo','this (acc.)'],grahmatu:['grāmatu','book (acc.)'],rakstijuschi:['rakstījuši','having written'],ne:['ne','not'],
  'eꞥꞡeli':['eņģeļi','angels'],bijuschi:['bijuši','have been'],'kà':['kā','as, how'],leelu:['lielo','great (acc.)'],
  schehlastibu:['žēlastību','grace (acc.)'],atsihst:['atzīst','recognise'],latweeti:['latvieti','Latvian (addressing someone)'],
  behrni:['bērni','children'],dehls:['Dēls','son'],debbes:['debess','heaven'],pasaules:['pasaules','of the world'],
  eesahkuma:['iesākuma','beginning'],pateesiba:['patiesība','truth'],
};

const PROVERBS = [
  {old:'Darbs darra darritaju.',mod:'Darbs dara darītāju.',en:'Work makes the worker.'},
  {old:'Ar lehnu darbu tahlu teek.',mod:'Ar lēnu darbu tālu tiek.',en:'Slow and steady work goes far.'},
  {old:'Kas mekle, tas atrohd.',mod:'Kas meklē, tas atrod.',en:'Whoever seeks, finds.'},
  {old:'Mahzibas sakne ruhkta, bet augłi saldi.',mod:'Mācības sakne rūgta, bet augļi saldi.',en:'The root of learning is bitter, but its fruit is sweet.'},
  {old:'Labs wahrds atrohd labu weetu.',mod:'Labs vārds atrod labu vietu.',en:'A good word finds a good place.'},
  {old:'Mahzitees nekad naw par wehlu.',mod:'Mācīties nekad nav par vēlu.',en:'It is never too late to learn.'},
  {old:'Ko jaunibâ eemahzisees, to wezumâ kà atradisi.',mod:'Ko jaunībā iemācīsies, to vecumā kā atradīsi.',en:'What you learn when young, you will find again when old.'},
];

/* ---------- course structure ---------- */
const UNITS = [
  {id:'u1',color:'--u1',glyph:'a',title:{en:'Fraktur letters',lv:'Fraktūras burti'},sub:{en:'Recognise and write the small letters',lv:'Atpazīsti un raksti mazos burtus'},lessons:[
    {id:'l-vow',title:{en:'Vowels',lv:'Patskaņi'},k:'letters',letters:['a','e','i','o','u']},
    {id:'l-stem',title:{en:'Stems and humps',lv:'Kāti un kupri'},k:'letters',letters:['n','m','r','l','t']},
    {id:'l-s',title:{en:'Long s or f?',lv:'Garais s vai f?'},k:'letters',letters:['s','ſ','f']},
    {id:'l-tall',title:{en:'Tall letters',lv:'Garie burti'},k:'letters',letters:['b','h','d','k']},
    {id:'l-tail',title:{en:'Tails below the line',lv:'Astes zem līnijas'},k:'letters',letters:['c','z','g','j']},
    {id:'l-wp',title:{en:'w, p, v and ß',lv:'w, p, v un ß'},k:'letters',letters:['p','w','v','ß']},
    {id:'l-rev1',title:{en:'Small letters review',lv:'Mazo burtu atkārtojums'},k:'review',pool:'aeiounmrltsſfbhdkczgjpwvß'},
  ]},
  {id:'u2',color:'--u2',glyph:'A',title:{en:'Capitals',lv:'Lielie burti'},sub:{en:'The curly capitals and the crossed letters',lv:'Lokainie lielie burti un pārsvītrotie burti'},lessons:[
    {id:'c-1',title:{en:'A, U, N, M',lv:'A, U, N, M'},k:'letters',letters:['A','U','N','M']},
    {id:'c-2',title:{en:'B, W, V, E',lv:'B, W, V, E'},k:'letters',letters:['B','W','V','E']},
    {id:'c-3',title:{en:'D, G, S, T',lv:'D, G, S, T'},k:'letters',letters:['D','G','S','T']},
    {id:'c-4',title:{en:'I, J, K, R, L',lv:'I, J, K, R, L'},k:'letters',letters:['I','J','K','R','L']},
    {id:'c-5',title:{en:'P, Z, C, H',lv:'P, Z, C, H'},k:'letters',letters:['P','Z','C','H']},
    {id:'c-6',title:{en:'Crossed letters',lv:'Pārsvītrotie burti'},k:'letters',letters:['ł','ꞥ','ꞣ','ꞡ','ŗ']},
    {id:'c-rev',title:{en:'Capitals review',lv:'Lielo burtu atkārtojums'},k:'review',pool:'AUNMBWVEDGSTIJKRLPZCHłꞥꞣꞡ'},
  ]},
  {id:'u3',color:'--u3',glyph:'ee',title:{en:'The old spelling',lv:'Vecā rakstība'},sub:{en:'Read old Latvian in Latin letters first',lv:'Vispirms lasi veco rakstību latīņu burtiem'},lessons:
    Object.keys(RULES).map(r=>({id:'r-'+r,title:RULES[r].title,k:'rule',rule:r}))
  },
  {id:'u4',color:'--u4',glyph:'W',title:{en:'Words in Fraktur',lv:'Vārdi frakturā'},sub:{en:'Words from the old Bible page',lv:'Vārdi no vecās Bībeles lapas'},lessons:[
    {id:'w-ppl',title:{en:'People',lv:'Cilvēki'},k:'words',words:pickV('Zilweks|Seewa|Behrns|Tehws|Mahte|Dehls|Latweetis|Ꞣehniꞥsch')},
    {id:'w-faith',title:{en:'Faith',lv:'Ticība'},k:'words',words:pickV('Deews|Swehts|Grehks|Gars|Eꞥꞡelis|Tizziba|Schehlastiba|Debbesis')},
    {id:'w-world',title:{en:'The world',lv:'Pasaule'},k:'words',words:pickV('Semme|Pasaule|Galwa|Sehkla|Tschuhska|Laiks|Dsihwiba|Wahrds')},
    {id:'w-small',title:{en:'Small words',lv:'Mazie vārdi'},k:'words',words:pickV('irr|un|tee|pehz|us|schi|muhsu|wiꞥsch|mehs|bet')},
  ]},
  {id:'u5',color:'--u5',glyph:'M',title:{en:'Reading the page',lv:'Lapas lasīšana'},sub:{en:'Phrases from "Mihłais Latweeti"',lv:'Frāzes no „Mihłais Latweeti”'},lessons:[
    {id:'p-1',title:{en:'The greeting',lv:'Uzruna'},k:'phrases',phrases:PHRASES.slice(0,4)},
    {id:'p-2',title:{en:'People and heaven',lv:'Cilvēki un debesis'},k:'phrases',phrases:PHRASES.slice(4,8)},
    {id:'p-3',title:{en:'Grace and truth',lv:'Žēlastība un patiesība'},k:'phrases',phrases:PHRASES.slice(8,12)},
  ]},
];
const ALL_LESSONS = UNITS.flatMap((u,ui)=>u.lessons.map((l,li)=>Object.assign(l,{unit:u,ui,li})));
const LESSON = Object.fromEntries(ALL_LESSONS.map(l=>[l.id,l]));

const TOOLS = {
  pencil:{name:{en:'Pencil',lv:'Zīmulis'},level:{en:'Relaxed',lv:'Saudzīgs'},mult:1,thr:.45,undo:true,hint:true,desc:{en:'Undo and hints allowed. Lenient checking.',lv:'Var atsaukt un lūgt padomu. Iecietīga pārbaude.'}},
  pen:{name:{en:'Pen',lv:'Pildspalva'},level:{en:'Standard',lv:'Parasts'},mult:1.5,thr:.52,undo:true,hint:false,desc:{en:'Undo allowed, no hints. Normal checking.',lv:'Var atsaukt, bez padomiem. Parasta pārbaude.'}},
  ink:{name:{en:'Ink nib',lv:'Tintes spalva'},level:{en:'Master',lv:'Meistars'},mult:2,thr:.58,undo:false,hint:false,desc:{en:'Broad nib with thick and thin strokes. No undo, strict checking.',lv:'Plata spalva ar resniem un tieviem vilcieniem. Nevar atsaukt, stingra pārbaude.'}},
};

const LEVEL_TITLES = [[1,'Māceklis','Apprentice'],[3,'Burtu lasītājs','Letter reader'],[6,'Rakstvedis','Scribe'],[10,'Grāmatnieks','Bookman'],[15,'Gudrinieks','Sage'],[22,'Meistars','Master']];
const ACH = [
  {id:'first',g:'P',n:{en:'First step',lv:'Pirmais solis'},d:{en:'Finish your first lesson',lv:'Pabeidz pirmo nodarbību'},t:s=>s.stats.lessons>=1},
  {id:'lower',g:'a',n:{en:'Alphabet apprentice',lv:'Ābeces māceklis'},d:{en:'Finish the small letters chapter',lv:'Pabeidz mazo burtu nodaļu'},t:s=>unitDone(s,0)},
  {id:'caps',g:'A',n:{en:'Capital scribe',lv:'Lielo burtu rakstvedis'},d:{en:'Finish the capitals chapter',lv:'Pabeidz lielo burtu nodaļu'},t:s=>unitDone(s,1)},
  {id:'rules',g:'R',n:{en:'Spelling sleuth',lv:'Rakstības detektīvs'},d:{en:'Learn all six spelling rules',lv:'Apgūsti visus sešus rakstības likumus'},t:s=>unitDone(s,2)},
  {id:'words',g:'W',n:{en:'Word collector',lv:'Vārdu krājējs'},d:{en:'Finish the Fraktur words chapter',lv:'Pabeidz fraktūras vārdu nodaļu'},t:s=>unitDone(s,3)},
  {id:'reader',g:'L',n:{en:'Reader of the old book',lv:'Vecās grāmatas lasītājs'},d:{en:'Finish the reading chapter',lv:'Pabeidz lasīšanas nodaļu'},t:s=>unitDone(s,4)},
  {id:'perfect',g:'T',n:{en:'Flawless',lv:'Bez kļūdām'},d:{en:'Finish a lesson with no mistakes',lv:'Pabeidz nodarbību bez nevienas kļūdas'},t:s=>s.stats.perfect>=1},
  {id:'perfect10',g:'M',n:{en:'Untouchable',lv:'Nevainojamais'},d:{en:'10 flawless lessons',lv:'10 nodarbības bez kļūdām'},t:s=>s.stats.perfect>=10},
  {id:'streak3',g:'D',n:{en:'Three candles',lv:'Trīs sveces'},d:{en:'Keep the candle lit for 3 days',lv:'Uzturi sveci degošu 3 dienas'},t:s=>s.best>=3},
  {id:'streak7',g:'N',n:{en:'A full week',lv:'Visa nedēļa'},d:{en:'Keep the candle lit for 7 days',lv:'Uzturi sveci degošu 7 dienas'},t:s=>s.best>=7},
  {id:'streak30',g:'G',n:{en:'Faithful',lv:'Uzticīgais'},d:{en:'Keep the candle lit for 30 days',lv:'Uzturi sveci degošu 30 dienas'},t:s=>s.best>=30},
  {id:'xp100',g:'S',n:{en:'First hundred',lv:'Pirmais simts'},d:{en:'Earn 100 XP',lv:'Nopelni 100 XP'},t:s=>s.xp>=100},
  {id:'xp1000',g:'K',n:{en:'Thousand',lv:'Tūkstotis'},d:{en:'Earn 1,000 XP',lv:'Nopelni 1000 XP'},t:s=>s.xp>=1000},
  {id:'draw10',g:'ſ',n:{en:'First strokes',lv:'Pirmie vilcieni'},d:{en:'Pass 10 drawing tasks',lv:'Izpildi 10 zīmēšanas uzdevumus'},t:s=>s.stats.draws>=10},
  {id:'ink25',g:'B',n:{en:'Calligrapher',lv:'Kaligrāfs'},d:{en:'Pass 25 drawings with the ink nib',lv:'25 zīmējumi ar tintes spalvu'},t:s=>s.stats.inkDraws>=25},
  {id:'pencil25',g:'Z',n:{en:'Pencil pusher',lv:'Zīmuļa meistars'},d:{en:'Pass 25 drawings with the pencil',lv:'25 zīmējumi ar zīmuli'},t:s=>s.stats.pencilDraws>=25},
  {id:'longs',g:'f',n:{en:'Long-s detective',lv:'Garā s detektīvs'},d:{en:'Tell ſ from f 10 times',lv:'10 reizes atšķir ſ no f'},t:s=>s.stats.longS>=10},
  {id:'paper',g:'H',n:{en:'On paper',lv:'Uz papīra'},d:{en:'Pass a handwriting check on paper',lv:'Izturi rokraksta pārbaudi uz papīra'},t:s=>s.stats.paper>=1},
  {id:'scribe',g:'E',n:{en:'Transcriber',lv:'Pārrakstītājs'},d:{en:'Turn 10 texts into Fraktur',lv:'Pārraksti frakturā 10 tekstus'},t:s=>s.stats.conv>=10},
  {id:'owl',g:'U',n:{en:'Night owl',lv:'Pūce'},d:{en:'Finish a lesson after 22:00',lv:'Pabeidz nodarbību pēc 22:00'},t:s=>s.stats.owl},
  {id:'lark',g:'J',n:{en:'Early bird',lv:'Cīrulis'},d:{en:'Finish a lesson before 7:00',lv:'Pabeidz nodarbību pirms 7:00'},t:s=>s.stats.lark},
  {id:'taps',g:'w',n:{en:'Curious reader',lv:'Zinātkārais lasītājs'},d:{en:'Look up 25 words in the Reader',lv:'Uzzini 25 vārdus Lasītavā'},t:s=>s.stats.taps>=25},
  {id:'chal5',g:'C',n:{en:'Challenger',lv:'Izaicinātājs'},d:{en:'Complete 5 daily challenges',lv:'Izpildi 5 dienas izaicinājumus'},t:s=>s.stats.challenges>=5},
  {id:'lvl5',g:'V',n:{en:'Rising scribe',lv:'Augošais rakstvedis'},d:{en:'Reach level 5',lv:'Sasniedz 5. līmeni'},t:s=>levelOf(s.xp).level>=5},
  {id:'help',g:'h',n:{en:'Helping hand',lv:'Palīgs'},d:{en:'Send feedback about the app',lv:'Nosūti atsauksmi par lietotni'},t:s=>s.stats.feedback>=1},
];
const CHALLENGES = [
  {id:'ink3',text:{en:'Pass 3 drawing tasks with the ink nib',lv:'Izpildi 3 zīmēšanas uzdevumus ar tintes spalvu'},goal:3,key:'inkDraws'},
  {id:'perfect',text:{en:'Finish a lesson with no mistakes',lv:'Pabeidz nodarbību bez kļūdām'},goal:1,key:'perfect'},
  {id:'read5',text:{en:'Look up 5 words in the Reader',lv:'Uzzini 5 vārdus Lasītavā'},goal:5,key:'taps'},
  {id:'lessons2',text:{en:'Finish 2 lessons',lv:'Pabeidz 2 nodarbības'},goal:2,key:'lessons'},
  {id:'draw5',text:{en:'Pass 5 drawing tasks with any tool',lv:'Izpildi 5 zīmēšanas uzdevumus ar jebkuru rīku'},goal:5,key:'draws'},
  {id:'type3',text:{en:'Type 3 words in modern spelling',lv:'Ieraksti 3 vārdus mūsdienu rakstībā'},goal:3,key:'typed'},
  {id:'review',text:{en:'Finish a Quick review',lv:'Pabeidz ātro atkārtojumu'},goal:1,key:'reviews'},
  {id:'paper',text:{en:'Check one page of handwriting',lv:'Pārbaudi vienu rokraksta lapu'},goal:1,key:'paperChecks'},
  {id:'conv',text:{en:'Turn 3 texts into Fraktur',lv:'Pārraksti frakturā 3 tekstus'},goal:3,key:'conv'},
];
const PRAISE = ['Lieliski!','Pareizi!','Malacis!','Teicami!','Tieši tā!','Ļoti labi!'];
