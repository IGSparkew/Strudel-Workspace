
/**
 * Title: Morning Season
 * Author: IGSparkew
 * 
 * Software: Strudel.cc
*/

setcpm(120/4)

const DRUMS_ON = 1;
const MELODY_ON = 1;
const BASS_ON = 1;

let drums = stack(
  sound("bd:3*4"),
  sound("[- cp:2]* 2"),
  sound("[- hh:1]* 4").sometimesBy(.25,fast(2))
).bank("RolandTR909").gain(DRUMS_ON ? 0.8 : 0) ._pianoroll()
let melody = stack(
  n("[0, 4, 7] [1 ,6 ,9]").scale("C4:minor").sound("gm_pad_warm:2").slow(2), 
  n("<[- 0] 3 [- 0] 2 2 4 [- 0] 3 [- 0] 1 2 [4 4]>*8").scale("C4:minor").sound("square")
).gain(MELODY_ON ? 0.5 : 0)._pianoroll()

let bass = stack(
  n("<0 <5 2>> *8").scale("C2:minor").sound("sine").speed(.5)
).gain(BASS_ON ? 0.6 : 0)
._pianoroll()


arrange(
  [4, drums],
  [8, stack(drums, bass)],
  [4, melody],
  [8, stack(melody, drums)],
  [8, stack(melody, drums, bass)]
)._pianoroll()