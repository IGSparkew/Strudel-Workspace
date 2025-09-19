/**
@title Dark__
@by IGSparkew
@gender trap
*/

// Colors
const DRUMS_COLOR = "red";
const MELODY_COLOR = "blue";
const BASS_COLOR = "magenta";

// GAINS
let DRUMS_GAIN = slider(1.12,0, 2);
let MELODY_GAIN = slider(0.488,0, 2);
let BASS_GAIN = slider(0.58, 0, 2);

// BPM
const BPM = 130/2;

//BANK
const DRUM_BANK = "rolandtr808";

// On off your main pattern for live
const DRUMS_ON = 1;
const MELODY_ON = 1;
const BASS_ON = 1;

setcpm(BPM/4);

const drums = stack(
sound("[- - - -] [- sd:1 - -] [- - - -] [- sd:1 - -]").distort(slider(0.5, 0, 1.5, 0.1)),
sound("[hh hh hh*4 hh] [hh hh hh*4 hh*2] [hh hh hh hh] [hh hh hh hh]").postgain(slider(0.464,0, 2)),
sound("[bd:2 - - -] [- - - -] [bd:2 bd:2 - -] [bd:2 - - -]").distort(slider(1.1, 0, 1.5, 0.1)) 
).bank(DRUM_BANK)
  .gain(DRUMS_ON ? DRUMS_GAIN : 0)._punchcard().color(DRUMS_COLOR);

const melody = stack(
n("<[5 3] [3 1] [0 2]>").scale("C4:minor").sound("piano"),
n("[0 1], [4 5]").scale("C3:minor").sound("piano"),
).gain(MELODY_ON ? MELODY_GAIN : 0).room(slider(2, 0, 4,0.5))._punchcard().color(MELODY_COLOR);

const bass = stack(
n("0 1 4 5").scale("C1:minor").sound("gm_fretless_bass").lpf(600).distort(1).slow(2)
).gain(BASS_ON ? BASS_GAIN : 0)._punchcard().color(BASS_COLOR);

// make off when loop finished
/**
$: drums
$: melody
$: bass
**/


arrange(
   [4, melody],
   [4, stack(melody, drums)],
   [8, stack(melody, drums, bass)],
   [4, melody],
   [8, stack(melody, drums, bass)],
   [8, stack(melody, drums, bass)],
  [2, melody]
)._pianoroll()
