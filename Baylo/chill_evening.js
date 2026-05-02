/**
 * Title: Chill Evening
 * Author: Baylo
 *
 * Software: Strudel.cc
 *
 * Structure narrative :
 *   Intro   — pad + cello, atmosphérique
 *   A       — thème principal, piano + basse + cello
 *   B       — plein orchestre + percus
 *   D       — mineur mélancolique, cordes en avant
 *   Bridge  — rupture, piano + pad suspendus
 *   E       — montée tendue, violons + percus
 *   C       — retour thème, piano + cordes sans percus
 *   Outro   — dissolution, pad + cello
*/

// ─── Intro ────────────────────────────────────────────────────────────────────

const intro = stack(
  note("a3 c4 e4 g3").sound("pad").gain(0.25).room(0.8).cutoff(700),
  note("a2 f2 g2 c2").sound("string").gain(0.32).lpf(800).room(0.6)
).slow(2);

// ─── Section A : thème principal ─────────────────────────────────────────────

const sectionA = stack(
  note("c4 e4 g4 b4 a4 g4").sound("piano").gain(0.5),
  note("a2 f2 g2 c2").sound("bass").gain(0.55),
  note("a2 f2 g2 c2").sound("string").gain(0.28).lpf(900).room(0.5)
).slow(2);

// ─── Section B : plein orchestre ─────────────────────────────────────────────

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

// ─── Section D : mineur mélancolique ─────────────────────────────────────────
// Am → Dm → G → Am — cordes en avant, piano discret

const sectionD = stack(
  // Cordes en premier plan
  note("a4 f4 d4 c4 d4 f4 a4 c5").sound("string").gain(0.45).room(0.8).cutoff(5000),
  note("a2 d2 g2 a2").sound("string").gain(0.4).lpf(900).room(0.6),
  // Piano discret en fond
  note("a3 f3 d3 e3 f3 a3 c4 b3").sound("piano").gain(0.28),
  // Basse
  note("a2 d2 g2 a2").sound("bass").gain(0.5),
  // Percus douces
  stack(
    s("bd ~ ~ ~").gain(0.55),
    s("~ ~ sn ~").gain(0.4),
    s("hh*4").gain(0.18)
  )
).slow(2);

// ─── Bridge : rupture, suspension ────────────────────────────────────────────
// Piano seul + pad — harmonie suspendue sur Csus2

const bridge = stack(
  note("c4 ~ g4 ~ d5 ~ g4 ~").sound("piano").gain(0.55).delay(0.3),
  note("c3 g3 d4 g3").sound("pad").gain(0.2).room(0.9).cutoff(900),
  // Nappe longue suspendue
  note("c4 e4 g4 d4").sound("pad").gain(0.15).room(0.95).cutoff(500)
).slow(2);

// ─── Section E : montée tendue ────────────────────────────────────────────────
// Em → Bm → C → G — violons agressifs, percus plus denses

const sectionE = stack(
  // Violons tendus
  note("e5 f5 g5 a5 b5 a5 g5 f5").sound("string").gain(0.42).room(0.6).cutoff(6000),
  // Cello grave
  note("e2 b2 c2 g2 e2 b2 c2 g2").sound("string").gain(0.38).lpf(800).room(0.5),
  // Piano — accords rapides
  note("e4 b4 c4 g4 e4 b4 c4 g4").sound("piano").gain(0.45),
  // Basse
  note("e2 b2 c2 g2 e2 b2 c2 g2").sound("bass").gain(0.6),
  // Arpège tendu
  note("e5 g5 b5 g5").fast(2).gain(0.2).delay(0.15).lpf(4000),
  // Percus plus denses
  stack(
    s("bd ~ bd ~ bd ~ bd ~").gain(0.75),
    s("~ sn ~ sn ~ sn ~ sn").gain(0.55),
    s("hh*8").gain(0.25),
    s("~ ~ ~ ~ oh ~ ~ ~").gain(0.2)
  )
).slow(2);

// ─── Section C : retour thème, piano + cordes ────────────────────────────────

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
  sectionD,
  bridge,
  sectionE,
  sectionC,
  outro
)
.room(0.35)
.lpf(2200);
