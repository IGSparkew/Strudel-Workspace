/**
@title Area-51 Escape Plan
@description A fast-paced track to accompany your daring escape from Area 51. Perfect for high-energy chases and thrilling getaways.
@by Baylo

.     .       .  .   . .   .   . .    +  .
  .     .  :     .    .. :. .___---------___.
       .  .   .    .  :.:. _".^ .^ ^.  '.. :"-_. .
    .  :       .  .  .:../:            . .^  :.:\.
        .   . :: +. :.:/: .   .    .        . . .:\
 .  :    .     . _ :::/:               .  ^ .  . .:\
  .. . .   . - : :.:./.                        .  .:\
  .      .     . :..|:                    .  .  ^. .:|
    .       . : : ..||        .                . . !:|
  .     . . . ::. ::\(                           . :)/
 .   .     : . : .:.|. ######              .#######::|
  :.. .  :-  : .:  ::|.#######           ..########:|
 .  .  .  ..  .  .. :\ ########          :######## :/
  .        .+ :: : -.:\ ########       . ########.:/
    .  .+   . . . . :.:\. #######       #######..:/
      :: . . . . ::.:..:.\           .   .   ..:/
   .   .   .  .. :  -::::.\.       | |     . .:/
      .  :  .  .  .-:.":.::.\             ..:/
 .      -.   . . . .: .:::.:.\.           .:/
.   .   .  :      : ....::_:..:\   ___.  :/
   .   .  .   .:. .. .  .: :.:.:\       :/
     +   .   .   : . ::. :.:. .:.|\  .:/|
     .         +   .  .  ...:: ..|  --.:|
.      . . .   .  .  . ... :..:.."(  ..)"
 .   .       .      :  .   .: ::/  .  .::\   
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


// ================= DRUMS =================
const drums = stack(
  // Hi-hat simple
  s("hh*8").gain(.15).shape(0.2), // 4 au lieu de 8

  // Kick pattern euclidien (5 coups sur 16)
  s("bd(<5 7>,16)").bank(DRUM_BANK),

  // Snare pattern sur 4 et 12
  s("sd").bank(DRUM_BANK).beat("4,12", 16),

  // Snare mid sur 2 et 6
  s("md").bank(DRUM_BANK).beat("2,6", 16)
)
  .gain(DRUMS_ON ? 0.12 : 0)
  ._punchcard()
  .color(DRUMS_COLOR);

// ================= MELODY =================
const melody = stack(
  s("tri*8")                // RAPIDE sans être agressif (8 notes / cycle)
    .n("0 2 3 7 3 2 0 7")   // petite boucle mélodique sympa
    .shape(0.4)             // arrondi, pas d’aigus dégueulasses
    .gain(0.6)              // volume clean
    .degradeBy(0.15)        // un peu d’aération
)
  .gain(MELODY_ON ? 1.4 : 0)
  ._punchcard()
  .color(MELODY_COLOR);

// ================= BASS =================
const bass = stack(
  s("saw*8")
    .n("2 2 4 5 4 2 2 5")   
    .shape(0.15)            
    .gain(0.45)             
)
  .gain(BASS_ON ? 0.9 : 0) 
  ._punchcard()
  .color(BASS_COLOR);


// ================= PLAY =================

$: drums
$: melody
$: bass

/*
  ,d8PPPP 888  ,d8      d8p 88888888 888   88   888   88 88888888 888  888   ,dbPPPp     ,d8PPPP 88888888  doooooo ,8b.     8888PPPp,   ,d8PPPP   
  d88ooo  888_dPY8      88p 888  888 888ooo88   888ooo88 888  888 888  888   d88ooP'     d88ooo  88ooooPp  d88     88'8o    8888    8   d88ooo    
,88'      8888' 88      88P 888  888       88         88 888  888 888  888 ,88' P'     ,88'             d8 d88     88PPY8.  8888PPPP' ,88'        
88bdPPP   Y8P   Y8   88888' 888oo888 PPPPPP8P   PPPPPP8P 888oo888 888PP888 88  do      88bdPPP   8888888P  d888888 8b   `Y' 888P      88bdPPP     
                                                                                                                              _  _  */     
