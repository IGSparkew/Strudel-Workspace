/**
 * Title: Chill Evening
 * Author: Baylo
 *
 * Software: Strudel.cc
 *
 * Structure :
 *   Intro  — pad + cello
 *   A      — piano + basse + cello
 *   B      — tout + violons + percus
 *   C      — piano + cordes sans percus
 *   Outro  — pad + cello
*/

// ─── Intro ────────────────────────────────────────────────────────────────────

const intro = stack(
  note("a3 c4 e4 g3").sound("pad").gain(0.25).room(0.8).cutoff(700),
  note("a2 f2 g2 c2").sound("string").gain(0.32).lpf(800).room(0.6)
).slow(2);

// ─── Section A ────────────────────────────────────────────────────────────────

const sectionA = stack(
  note("c4 e4 g4 b4 a4 g4").sound("piano").gain(0.5),
  note("a2 f2 g2 c2").sound("bass").gain(0.55),
  note("a2 f2 g2 c2").sound("string").gain(0.28).lpf(900).room(0.5)
).slow(2);

// ─── Section B ────────────────────────────────────────────────────────────────

const sectionB = stack(
  note("c4 e4 g4 b4 a4 g4 e4 c4").sound("piano").gain(0.48),
  note("a2 f2 g2 c2 e2 a2 f2 g2").sound("bass").gain(0.58),
  note("e5 d5 c5 b4 c5 d5 e5 g5").sound("string").gain(0.28).room(0.7).cutoff(4000),
  note("a2 f2 g2 c2 e2 a2 f2 g2").sound("string").gain(0.32).lpf(800).room(0.5),
  note("c5 e5 g5 e5").fast(2).gain(0.16).delay(0.2).lpf(3000),
  stack(
    s("bd ~ ~ bd ~ bd ~ ~").gain(0.7),
    s("~ ~ sn ~ ~ ~ sn ~").gain(0.5),
    s("hh*8").gain(0.22)
  )
).slow(2);

// ─── Section C ────────────────────────────────────────────────────────────────

const sectionC = stack(
  note("c4 e4 g4 b4 a4 g4 e4 c4").sound("piano").gain(0.55),
  note("e5 g5 a5 g5 e5 d5 c5 d5").sound("string").gain(0.32).room(0.8).cutoff(5000),
  note("a2 f2 g2 c2").sound("string").gain(0.35).lpf(900).room(0.6)
).slow(2);

// ─── Outro ────────────────────────────────────────────────────────────────────

const outro = stack(
  note("a3 c4 e4 g3").sound("pad").gain(0.18).room(0.9).cutoff(500),
  note("a2 f2 g2 c2").sound("string").gain(0.22).lpf(700).room(0.7),
  note("c4 ~ ~ e4 ~ ~ g4 ~").sound("piano").gain(0.28)
).slow(2);

// ─── Composition finale ───────────────────────────────────────────────────────

cat(
  intro,
  sectionA,
  sectionB,
  sectionC,
  outro
)
.room(0.35)
.lpf(2200);
