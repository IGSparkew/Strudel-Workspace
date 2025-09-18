/**
 * Title: Chill Evening
 * Author: Baylo
 * 
 * Software: Strudel.cc
*/

// Main pattern
const melodie = stack(
  // Main melody
  note("c4 e4 g4 b4").slow(2),
  note("d4 f4 a4 c5").slow(2).late(0.5),
  // Bass accompaniment
  note("c2 f2 g2 c2").slow(4)
);

// Rhythm with percussion
const rythme = stack(
  s("bd").mask("1 0 0 1"),
  s("hh").fast(2).gain(0.3),
  s("~ sn ~ ~").gain(0.5)
);

const atmosphere = note("c4 e4 g4")
  .slow(8)
  .gain(0.2)
  .cutoff(800)
  .resonance(0.3);

const synth = note("e5 d5 c5 b4 c5 d5")
  .slow(6)
  .gain(0.4)
  .lpf(1200)
  .delay(0.3);

// Final composition
stack(
  melodie.gain(0.6),
  rythme.gain(0.4),
  atmosphere,
  synth.late(4)
)
.slow(0.8)
.room(0.3)
.lpf(2000);
