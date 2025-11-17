/**
@title gtfo
@by Baylo
*/

// Colors
const DRUMS_COLOR = "red";
const MELODY_COLOR = "blue";
const BASS_COLOR = "magenta";

// GAINS
const DRUMS_GAIN = 1;
const MELODY_GAIN = 1;
const BASS_GAIN = 1;

// BPM réel
const BPM = 120; 
setcpm(BPM/4); 

// BANK
const DRUM_BANK = "tr909";

// On/off switches
const DRUMS_ON = 1;
const MELODY_ON = 1;
const BASS_ON = 1;


// ================= DRUMS (TON SON EXACT) =================
const drums = stack(
  // Hi-hat simple
  s("hh*8").gain(.2),

  // Kick pattern euclidien (5 coups sur 16)
  s("bd(<5 7>,16)").bank(DRUM_BANK),

  // Snare pattern sur 4 et 12
  s("sd").bank(DRUM_BANK).beat("4,12", 16),

  // Snare mid sur 2 et 6
  s("md").bank(DRUM_BANK).beat("2,6", 16)
)
  .gain(DRUMS_ON ? 0.4 : 0) 
  ._punchcard()
  .color(DRUMS_COLOR);

// ================= MELODY =================
const melody = stack(
  s("pluck*4")                 // un peu plus rapide
    .n("0 2 3 7")              // arpège simple
    .slow(2)                   // tempo doux
    .shape(0.4)                // son arrondi
    .gain(0.6)
    .degradeBy(0.3)
)
  .gain(MELODY_ON ? 1.2 : 0)
  ._punchcard()
  .color(MELODY_COLOR);

// ================= BASS (VIDE POUR L’INSTANT) =================
const bass = stack(
  s("saw*2")
    .n("-12 -11 < -12 -10 >")  // slide léger
    .gain(0.9)
    .shape(0.5)
)
  .gain(BASS_ON ? 1.3 : 0)
  ._punchcard()
  .color(BASS_COLOR);

// ================= PLAY =================
$: drums
$: melody
$: bass


