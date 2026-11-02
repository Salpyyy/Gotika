# Gotika

**Iemācies lasīt veco latviešu fraktūras druku.** · *Learn to read old Latvian Fraktur (Gothic) print.*

Līdz 20. gadsimta 20. gadiem latviešu grāmatas un avīzes drukāja gotiskajiem burtiem un vāciskā rakstībā:
`Mihłais Latweeti` = *Mīļais latvieti*. Gotika ir mobilajam telefonam veidota mācību lietotne, kas soli pa solim
iemāca burtus, veco rakstību un īstus vārdus no vecas Bībeles lapas.

---

## Latviski

### Kas ir iekšā
- **5 nodaļas, 27 nodarbības**: mazie burti → lielie un pārsvītrotie burti (ł ꞥ ꞣ ꞡ) → vecās rakstības likumi
  latīņu burtiem → vārdi fraktūrā → frāzes no „Mihłais Latweeti”.
- **Uzdevumi**: atpazīšana, burta meklēšana, pāri, apvilkšana, rakstīšana no galvas, vārda salikšana, ierakstīšana
  ar garumzīmju tastatūru, vecā → mūsdienu rakstība.
- **Rakstīšanas rīki**: zīmulis (saudzīgs), pildspalva (parasts), tintes spalva (meistars, ar resniem un tieviem
  vilcieniem, bez atsaukšanas). Rīks maina gan izskatu, gan pārbaudes stingrību un XP reizinātāju.
- **Progresa gravīra**: katra pabeigtā nodarbība uzzīmē jaunu vecās Rīgas skata daļu (Daugava, mūris, Pulvertornis,
  Doms, Pēterbaznīca ar zelta gaili…). Pabeidzot nodaļu, tās daļas tiek „ar roku izkrāsotas”, beigās iestājas vakars.
- **Pārrakstītājs**: ieraksti tekstu mūsdienu latviešu valodā, un Gotika to pārraksta vecajā rakstībā un saliek
  fraktūrā. Divi stili: *Bībele (18.–19. gs.)* un *Avīze (1880–1920)*.
- **Raksti uz papīra (beta)**: uzraksti burtus uz papīra un nofotografē, vai raksti ekrānā ar irbuli; Gotika sadala
  rakstīto pa burtiem un pasaka, kuram burtam katrs līdzinās visvairāk.
- **Lasītava**: priekšvārda teksts fraktūrā; pieskaries vārdam, lai redzētu mūsdienu rakstību un nozīmi.
- **Motivācija**: XP, līmeņi, svece (dienu sērija) ar rezerves daktīm, dienas mērķis, dienas izaicinājums,
  dienas sakāmvārds, 25 sasniegumi.
- **Iestatījumi**: latviešu / angļu valoda, gaišā / tumšā tēma, dienas mērķis, skaņa, vibrācija, atsauksmes.

### Kā palaist
Atver `docs/index.html` jebkurā pārlūkā. Viss ir vienā failā, internets nav vajadzīgs.

### Kā publicēt telefonam (GitHub Pages)
1. GitHub repozitorijā: **Settings → Pages → Branch: `main`, mape `/docs`** → Save.
2. Pēc minūtes lietotne būs pieejama `https://<lietotājvārds>.github.io/<repozitorijs>/`.
3. Telefonā atver adresi un izvēlies **Pievienot sākuma ekrānam**. Gotika strādās kā lietotne, arī bez interneta.

### Kā mainīt
Avota faili ir `src/`. Pēc izmaiņām palaid:

```
python tools/build.py
```

Tas saliek `docs/index.html` (fonts tiek iekļauts failā).

---

## English

### What's inside
- **5 chapters, 27 lessons**: small letters → capitals and crossed letters → the old spelling rules in Latin
  letters → words in Fraktur → phrases from the foreword "Mihłais Latweeti".
- **Exercises**: recognise, find, match pairs, trace, write from memory, build the word, type with a diacritics
  keyboard, old → modern spelling.
- **Writing tools**: pencil (relaxed), pen (standard), ink nib (master: broad-nib strokes, no undo, strict checking).
- **Progress engraving**: each finished lesson draws a new piece of a view of old Rīga; finished chapters get
  hand-coloured, and the last chapter turns the scene to evening.
- **Transcriber**: type modern Latvian, get the old spelling set in Fraktur (Bible style or newspaper style).
- **Paper practice (beta)**: write letters on paper and take a photo, or write with a stylus; Gotika splits the
  writing into letters and ranks which Fraktur letter each one looks most like.
- **Reading room**, XP, levels, a candle streak with spare wicks, daily goal, daily challenge, 25 achievements,
  Latvian/English UI, light/dark theme, in-app feedback.

### Run
Open `docs/index.html` in a browser. Edit files in `src/`, then run `python tools/build.py`.

### Project layout

```
src/shell.html        page structure and styles (theme tokens for light and dark)
src/i18n.js           every interface string in Latvian and English
src/data.js           course content: letters, rules, vocabulary, passages, chapters, achievements
src/scene.js          the progress engraving (one SVG element per lesson)
src/translit.js       Transcriber: modern Latvian -> old orthography
src/scan.js           handwriting scanner: photo/stylus -> letters -> best-matching Fraktur letter
src/app.js            app logic: lessons, exercises, drawing pad and matcher, progress, settings
assets/fonts/         UnifrakturMaguntia (SIL Open Font License 1.1, see OFL.txt)
tools/build.py        builds docs/index.html
docs/                 the built app + PWA files for GitHub Pages
```

### How the handwriting check works
The printed glyph and the user's ink are both scaled to the same box, thinned to one-pixel centre lines
(Zhang–Suen) and compared in both directions (how much of the letter you covered, and how much of your ink lies
on the letter), with a penalty for scribbling. The photo scanner adds an adaptive threshold for uneven light,
connected-component segmentation and left-to-right grouping. It is a heuristic, not OCR: treat scores as hints.

---

## Sources and credits
- Old orthography rules: pre-1921 Latvian orthography (German-based, Fraktur print); the 1908–1922 reform replaced it.
- Reading passages transcribed from the foreword "Mihłais Latweeti" of an old Latvian New Testament.
- Newspaper-style transcription conventions (crossed long s, ž as ſ̷ch, ſ before t/p, hats on word-final long
  vowels) follow observations in Kaspars Foigts' (laacz) **Frakturizer**,
  [github.com/laacz/misc](https://github.com/laacz/misc). Gotika reimplements the rules; no code was copied
  (that repository has no licence).
- Font: **UnifrakturMaguntia** by Peter Wiegel and j. 'mach' wust, SIL Open Font License 1.1.

## Licence
Not chosen yet. The font is under the SIL OFL 1.1 (`assets/fonts/OFL.txt`) whatever licence the code gets.
