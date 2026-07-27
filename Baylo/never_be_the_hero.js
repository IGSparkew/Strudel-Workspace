/**
@title Never Be the Hero — Western Trip-Hop
@description trip-hop western — cordes tremolo, sifflet, chœurs, twang, beat lourd.
@by Baylo

                       .   ~ .    +        .          .
        .        .          .        *        .
   __________          .        .        .         .
  |          |    .        _.-----._         .
  |  WANTED  |       .    /  o   o  \    .        .
  |  ~~~~~~  |           |    ...    |        __
  |__________|      .     \_______/       _.-|  |-._
       ||            .        |          |___|__|___|
   ~~~~~~~~~~~ ~~~~~~~~~ ~~~~ | ~~~~~~~~~ ~~~~~~~~ ~~~~
     ~~~   le désert n'attend aucun héros...   ~~~
   ~~~~~~ ~~~~~   ~~~~~~~~ ~~~~~ ~~~~~~~~~~ ~~~ ~~~~~~
*/

// ================= CONFIG =================

// Colors
const DRUMS_COLOR   = "red";
const BASS_COLOR    = "magenta";
const GUITAR_COLOR  = "orange";
const STRINGS_COLOR = "cyan";
const WHISTLE_COLOR = "yellow";
const CHOIR_COLOR   = "white";
const FX_COLOR      = "gray";

// GAINS
const BASS_GAIN     = 0.7;
const SUB_GAIN      = 0.62;
const TREM_GAIN     = 0.32;
const HIGH_GAIN     = 0.28;
const TWANG_GAIN    = 0.4;
const WHISTLE_GAIN  = 0.45;
const CHOIR_GAIN    = 0.32;
const CELESTA_GAIN  = 0.3;
const TIMPANI_GAIN  = 0.6;
const WIND_GAIN     = 0.045;
const RISER_GAIN    = 0.14;

// BPM réel
const BPM = 88;
setcpm(BPM / 4);

// BANKS
const DRUM_BANK = "RolandTR808";
const TOM_BANK  = "RolandTR909";

// On/off switches
const DRUMS_ON   = 1;
const BASS_ON    = 1;
const GUITAR_ON  = 1;
const STRINGS_ON = 1;
const WHISTLE_ON = 1;
const CHOIR_ON   = 1;
const FX_ON      = 1;

// Cadence andalouse en si mineur — Bm / A / G / F#
const PROG_CHORDS = "<[b2,d3,fs3] [a2,cs3,e3] [g2,b2,d3] [fs2,as2,cs3]>";
const PROG_HIGH   = "<[b3,d4,fs4] [a3,cs4,e4] [g3,b3,d4] [fs3,as3,cs4]>";
const PROG_ROOTS  = "<b1 a1 g1 fs1>";

// ================= FX / AMBIANCE =================

// Vent du désert
const desertWind = s("white")
  .lpf(sine.range(150, 750).slow(9))
  .gain(FX_ON ? WIND_GAIN : 0)
  .attack(2).release(3)
  .pan(sine.slow(13).range(0.2, 0.8))
  .color(FX_COLOR);

// Riser 4 cycles avant les drops
const riser = s("white")
  .lpf(saw.range(300, 4000).slow(4))
  .gain(FX_ON ? saw.slow(4).range(0.01, RISER_GAIN) : 0)
  .hpf(200)
  .color(FX_COLOR);

// Riser court (1 cycle)
const riserShort = s("white")
  .lpf(saw.range(600, 4000))
  .gain(FX_ON ? saw.range(0.02, 0.1) : 0)
  .hpf(200)
  .color(FX_COLOR);

// ================= DRUMS =================

// Beat trip-hop lourd, snare traînée, hats swingués
const drumsCore = stack(
  s("bd").struct("x ~ ~ ~ ~ ~ ~ x ~ x ~ ~ ~ ~ ~ ~").bank(DRUM_BANK)
    .gain(0.95).shape(0.3),
  s("sd").struct("~ ~ ~ ~ x ~ ~ ~ ~ ~ ~ ~ x ~ ~ ~")
    .gain(0.75).room(0.35).shape(0.2).late(0.005),
  s("hh*8").bank(DRUM_BANK).gain("0.32 0.14 0.22 0.14".fast(2))
    .swingBy(0.1, 8).pan(0.6),
  s("~ ~ ~ ~ ~ ~ oh ~ ~ ~ ~ ~ ~ ~ ~ ~").bank(DRUM_BANK).gain(0.2)
)
  .mul(gain(DRUMS_ON))
  .color(DRUMS_COLOR);

// Percussion discrète des couplets
const drumsLight = stack(
  s("bd").struct("x ~ ~ ~ ~ ~ ~ ~ ~ x ~ ~ ~ ~ ~ ~").bank(DRUM_BANK).gain(0.85),
  s("rim").struct("~ ~ ~ ~ x ~ ~ ~ ~ ~ ~ ~ x ~ ~ ~").bank(DRUM_BANK)
    .gain(0.5).room(0.4).late(0.005),
  s("hh*4").bank(DRUM_BANK).gain(0.16).pan(0.6)
)
  .mul(gain(DRUMS_ON))
  .color(DRUMS_COLOR);

// Montée : toms + snare qui s'accélère
const drumsBuild = stack(
  s("lt lt mt mt ht ht mt ht").bank(TOM_BANK).gain(0.55),
  s("sd*<4 8>").bank(DRUM_BANK).gain(saw.slow(4).range(0.2, 0.6)),
  s("bd*4").bank(DRUM_BANK).gain(0.8).shape(0.3)
)
  .mul(gain(DRUMS_ON))
  .color(DRUMS_COLOR);

// Timbales cinématiques
const timpani = note(PROG_ROOTS).add(note(12))
  .struct("x ~ ~ ~ ~ ~ ~ ~ x ~ ~ ~ ~ ~ ~ ~")
  .sound("gm_timpani")
  .gain(DRUMS_ON ? TIMPANI_GAIN : 0)
  .room(0.5)
  .color(DRUMS_COLOR);

// Impact de drop : crash + timbale
const impact = stack(
  s("cr").bank(DRUM_BANK).gain(DRUMS_ON ? 0.4 : 0).room(0.7),
  note("b2").sound("gm_timpani").gain(DRUMS_ON ? 0.5 : 0).room(0.6)
).color(DRUMS_COLOR);

// ================= BASS =================

const bassLine = note(PROG_ROOTS)
  .struct("x ~ ~ ~ ~ ~ x ~ ~ [~ x] ~ ~ x ~ ~ ~")
  .sound("sawtooth")
  .lpf(380).shape(0.25)
  .attack(0.01).release(0.12).sustain(0.7)
  .gain(BASS_ON ? BASS_GAIN : 0)
  .sometimesBy(0.15, x => x.add(note(12)).mul(gain(1.15)))
  .color(BASS_COLOR);

const subBass = note(PROG_ROOTS)
  .struct("x ~ ~ ~ ~ ~ ~ ~ x ~ ~ ~ ~ ~ ~ ~")
  .sound("sine")
  .gain(BASS_ON ? SUB_GAIN : 0)
  .lpf(120)
  .color(BASS_COLOR);

// ================= STRINGS =================

// Cordes tremolo spaghetti-western
const stringsTrem = note(PROG_CHORDS)
  .sound("gm_tremolo_strings")
  .gain(STRINGS_ON ? TREM_GAIN : 0)
  .room(0.6).lpf(2200).hpf(180)
  .attack(0.3).release(0.5)
  .color(STRINGS_COLOR);

// Violons aigus tenus
const stringsHigh = note("<fs5 e5 d5 [cs5 as4]>")
  .sound("gm_string_ensemble_1")
  .legato(1.05)
  .gain(STRINGS_ON ? HIGH_GAIN : 0)
  .room(0.7).lpf(4500)
  .color(STRINGS_COLOR);

// ================= GUITARS =================

// Twang en réponses, slap-back delay
const guitarTwang = note("<[~ ~ ~ [b3 cs4]] [~ ~ d4 cs4] [~ ~ ~ [b3 as3]] [fs3 ~ ~ ~]>")
  .sound("gm_electric_guitar_clean")
  .gain(GUITAR_ON ? TWANG_GAIN : 0)
  .room(0.55)
  .delay(0.35).delaytime(0.34).delayfeedback(0.35)
  .pan(0.35)
  .color(GUITAR_COLOR);

// Tremolo picking en doubles-croches
const guitarTrem = note(PROG_HIGH)
  .struct("x*16")
  .sound("gm_acoustic_guitar_nylon")
  .gain(GUITAR_ON ? "0.32 0.18 0.24 0.18".fast(4) : 0)
  .clip(0.6)
  .room(0.45)
  .pan(0.65)
  .color(GUITAR_COLOR);

// ================= WHISTLE =================

// Sifflet du désert — mélodie originale
const whistleLead = note(
  "<[~ ~ b4 cs5] [d5 ~ cs5 b4] [a4 ~ g4 a4] [b4 as4 ~ ~] [~ ~ d5 e5] [fs5 ~ e5 d5] [d5 ~ b4 cs5] [fs4 ~ ~ ~]>"
)
  .sound("gm_whistle")
  .legato(1.1)
  .vib("4:0.35")
  .gain(WHISTLE_ON ? WHISTLE_GAIN : 0)
  .room(0.75).size(5)
  .delay(0.25).delaytime(0.51).delayfeedback(0.3)
  .color(WHISTLE_COLOR);

// ================= CHOIR & KEYS =================

// Nappes "aah"
const choirPad = note(PROG_HIGH)
  .sound("gm_choir_aahs")
  .legato(1.05)
  .gain(CHOIR_ON ? CHOIR_GAIN : 0)
  .room(0.8).size(6).lpf(3000)
  .attack(0.4).release(0.8)
  .color(CHOIR_COLOR);

// Celesta fantôme
const celesta = note("<[b4 ~ fs5 ~] [~ e5 ~ cs5] [d5 ~ b4 ~] [~ as4 ~ fs4]>")
  .sound("gm_celesta")
  .gain(CHOIR_ON ? CELESTA_GAIN : 0)
  .room(0.8).delay(0.3).delaytime(0.68)
  .degradeBy(0.2)
  .color(CHOIR_COLOR);

// ================= SECTIONS =================
// Retouches par section en .velocity() (multiplié → switches respectés)

const intro1 = stack(
  desertWind,
  guitarTwang.velocity(0.7).room(0.8)
);

const intro2 = stack(
  desertWind,
  stringsTrem.velocity(0.7),
  guitarTwang,
  subBass.velocity(0.5)
);

const themeA = stack(
  drumsLight,
  bassLine.velocity(0.65),
  stringsTrem,
  guitarTrem,
  guitarTwang
);

const themeB = stack(
  drumsLight,
  bassLine.velocity(0.65),
  stringsTrem,
  guitarTrem.velocity(0.8),
  whistleLead
);

const build = stack(
  drumsBuild,
  bassLine,
  stringsTrem.velocity(1.25).lpf(saw.slow(4).range(800, 4000)),
  riser
);

const chorus1 = stack(
  drumsCore,
  bassLine,
  subBass,
  choirPad,
  stringsTrem.velocity(1.2),
  guitarTrem,
  guitarTwang.velocity(0.8)
);

const verse2 = stack(
  drumsLight,
  bassLine.velocity(0.6),
  celesta,
  guitarTwang,
  desertWind,
  stringsTrem.velocity(0.55)
);

const chorus2 = stack(
  drumsCore,
  bassLine,
  subBass,
  choirPad,
  stringsHigh,
  stringsTrem.velocity(1.25),
  guitarTrem,
  timpani.velocity(0.8)
);

const breakdown = stack(
  desertWind.velocity(1.5),
  choirPad.velocity(1.2).room(0.9),
  celesta.velocity(0.75),
  subBass.velocity(0.5)
);

const finale = stack(
  drumsCore,
  bassLine,
  subBass,
  choirPad.velocity(1.1),
  stringsHigh.add(note(12)).velocity(0.85),
  stringsTrem.velocity(1.3),
  whistleLead.velocity(0.95),
  guitarTrem,
  timpani
);

const outro = stack(
  desertWind.velocity(1.3),
  stringsTrem.velocity(0.5).lpf(1200),
  guitarTwang.velocity(0.75).room(0.85),
  subBass.velocity(0.4)
);

// ================= ARRANGEMENT (76 cycles ≈ 3 min 27) =================
// Les builds restent sur des cycles multiples de 4 (rampes saw.slow(4))

arrange(
  [4, intro1],
  [4, intro2],
  [8, themeA],
  [8, themeB],
  [4, build],
  [1, stack(chorus1, impact)],
  [7, chorus1],
  [8, verse2],
  [4, build],
  [1, stack(chorus2, impact)],
  [7, chorus2],
  [3, breakdown],
  [1, stack(breakdown, riserShort)],
  [1, stack(finale, impact)],
  [7, finale],
  [4, outro],
  [4, outro.mul(gain(0.5))]
)
  .postgain(0.75)
  ._punchcard(); // visu globale — avec arrange(), les _punchcard par voix ne sont
                 // collectés qu'à l'évaluation (fenêtre courante) : seul celui de
                 // la racine marche tout le temps

/*
   Le soleil se couche sur le canyon — fin du mix.
*/
