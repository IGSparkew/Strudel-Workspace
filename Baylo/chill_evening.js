/**
 * Title: Chill Evening
 * Author: Baylo
 *
 * Software: Strudel.cc
*/

// Mélodie principale — deux phrases qui alternent
const melodie = cat(
  stack(
    note("c4 e4 g4 b4 a4 g4").slow(1),
    note("e4 g4 b4 d5").slow(1).late(0.25)
  ),
  stack(
    note("e4 g4 a4 b4 g4 e4").slow(1),
    note("a4 c5 b4 g4").slow(1).late(0.25)
  )
).gain(0.55).sound("piano");

// Basse — alterne deux progressions harmoniques
const basse = cat(
  note("a2 f2 g2 c2").slow(4),
  note("e2 a2 f2 g2").slow(4)
).gain(0.6).sound("bass");

// Pad — nappes longues pour la texture
const pad = cat(
  note("a3 c4 e4").slow(8),
  note("e3 g3 b3").slow(8)
).gain(0.18).cutoff(600).room(0.6);

// Arpège léger — movement et brillance
const arpege = cat(
  note("c5 e5 g5 b5 g5 e5").fast(1.5),
  note("a4 c5 e5 a5 e5 c5").fast(1.5)
).gain(0.22).delay(0.25).lpf(3000);

// Percussions avec variation
const rythme = stack(
  s("bd").mask("1 0 0 1 1 0 0 0"),
  s("hh").fast(2).gain(0.28),
  s("~ sn ~ ~").gain(0.45),
  s("~ ~ ~ oh").gain(0.2)
);

// Composition finale
stack(
  melodie,
  basse,
  pad,
  arpege,
  rythme.gain(0.4)
)
.room(0.35)
.lpf(2200);
