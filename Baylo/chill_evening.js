/**
 * Title: Chill Evening
 * Author: Baylo
 *
 * Software: Strudel.cc
 *
 * Structure complète (~3-4 min) :
 *   Intro      — pad + cello, atmosphérique
 *   A          — thème principal, piano + basse + cello
 *   A          — répétition thème
 *   B          — plein orchestre + percus
 *   D          — mineur mélancolique, cordes en avant
 *   D          — répétition mélancolique
 *   Bridge     — rupture, piano + pad suspendus
 *   E          — montée tendue, violons + percus
 *   E²         — tension maximale
 *   B²         — retour orchestre enrichi
 *   C          — retour thème, piano + cordes sans percus
 *   A²         — thème varié, plus expressif
 *   Outro      — dissolution, pad + cello
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

// ─── Section A_var : thème en arpège, registre haut ─────────────────────────
// Même harmonie mais piano en arpège rapide, basse pizzicato, pas de cello

const sectionA_var = stack(
  // Piano — arpège montant/descendant au lieu de mélodie linéaire
  note("c5 e5 g5 e5 b4 g4 e4 c4").sound("piano").gain(0.45).delay(0.1),
  // Basse pizzicato — notes courtes et sèches
  note("a2 ~ f2 ~ g2 ~ c2 ~").sound("bass").gain(0.52),
  // Violons en contrepoint grave — registre medium
  note("a3 c4 f3 e3 g3 b3 c4 e4").sound("string").gain(0.32).room(0.65).cutoff(3500),
  // Percus légères qui n'existaient pas dans A
  stack(
    s("bd ~ ~ ~").gain(0.42),
    s("~ ~ sn ~").gain(0.32),
    s("hh ~ hh ~").gain(0.14)
  )
).slow(2);

// ─── Section A² : thème varié, plus expressif ────────────────────────────────

const sectionA2 = stack(
  note("c4 e4 g4 b4 a4 g4").sound("piano").gain(0.55),
  // Violons ajoutés pour enrichir
  note("e5 g5 a5 b5 a5 g5").sound("string").gain(0.3).room(0.8).cutoff(5000),
  note("a2 f2 g2 c2").sound("bass").gain(0.55),
  note("a2 f2 g2 c2").sound("string").gain(0.3).lpf(900).room(0.5),
  // Percus légères
  stack(
    s("bd ~ ~ ~").gain(0.45),
    s("~ ~ sn ~").gain(0.35),
    s("hh ~ hh ~").gain(0.15)
  )
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

// ─── Section B² : orchestre enrichi, plus dense ──────────────────────────────

const sectionB2 = stack(
  note("c4 e4 g4 b4 a4 g4 e4 c4").sound("piano").gain(0.52),
  note("a2 f2 g2 c2 e2 a2 f2 g2").sound("bass").gain(0.6),
  // Violons plus haut
  note("g5 a5 b5 c6 b5 a5 g5 e5").sound("string").gain(0.32).room(0.75).cutoff(5000),
  note("a2 f2 g2 c2 e2 a2 f2 g2").sound("string").gain(0.35).lpf(800).room(0.5),
  // Arpège plus présent
  note("c5 e5 g5 e5").fast(2).gain(0.2).delay(0.2).lpf(3500),
  // Pad en fond pour l'épaisseur
  note("a3 c4 e4 g3").sound("pad").gain(0.12).room(0.8).cutoff(600),
  stack(
    s("bd ~ ~ bd ~ bd ~ ~").gain(0.72),
    s("~ ~ sn ~ ~ ~ sn ~").gain(0.52),
    s("hh*8").gain(0.24),
    s("~ ~ ~ ~ oh ~ ~ ~").gain(0.18)
  )
).slow(2);

// ─── Section D : mineur mélancolique ─────────────────────────────────────────

const sectionD = stack(
  note("a4 f4 d4 c4 d4 f4 a4 c5").sound("string").gain(0.45).room(0.8).cutoff(5000),
  note("a2 d2 g2 a2").sound("string").gain(0.4).lpf(900).room(0.6),
  note("a3 f3 d3 e3 f3 a3 c4 b3").sound("piano").gain(0.28),
  note("a2 d2 g2 a2").sound("bass").gain(0.5),
  stack(
    s("bd ~ ~ ~").gain(0.55),
    s("~ ~ sn ~").gain(0.4),
    s("hh*4").gain(0.18)
  )
).slow(2);

// ─── Section D_var : mélancolie nue, cordes seules + piano épars ─────────────
// Même harmonie Am→Dm→G→Am mais dépouillé — pas de basse, pas de percus

const sectionD_var = stack(
  // Violons — phrase longue, peu de notes, beaucoup de room
  note("a4 ~ ~ f4 ~ d4 ~ c4").sound("string").gain(0.48).room(0.92).cutoff(4500).legato(2.5),
  // Cello grave — tenu, presque une nappe
  note("a2 ~ d2 ~ g2 ~ a2 ~").sound("string").gain(0.42).lpf(700).room(0.85).legato(3),
  // Piano — 3 notes seulement, très espacées
  note("~ ~ a4 ~ ~ ~ f4 ~").sound("piano").gain(0.35).delay(0.35).room(0.7),
  // Pad discret pour soutenir l'harmonie
  note("a3 d3 g3 a3").sound("pad").gain(0.14).room(0.9).cutoff(600)
).slow(2);

// ─── Bridge : rupture, suspension ────────────────────────────────────────────

const bridge = stack(
  note("c4 ~ g4 ~ d5 ~ g4 ~").sound("piano").gain(0.55).delay(0.3),
  note("c3 g3 d4 g3").sound("pad").gain(0.2).room(0.9).cutoff(900),
  note("c4 e4 g4 d4").sound("pad").gain(0.15).room(0.95).cutoff(500)
).slow(2);

// ─── Section E : montée tendue ───────────────────────────────────────────────

const sectionE = stack(
  note("e5 f5 g5 a5 b5 a5 g5 f5").sound("string").gain(0.42).room(0.6).cutoff(6000),
  note("e2 b2 c2 g2 e2 b2 c2 g2").sound("string").gain(0.38).lpf(800).room(0.5),
  note("e4 b4 c4 g4 e4 b4 c4 g4").sound("piano").gain(0.45),
  note("e2 b2 c2 g2 e2 b2 c2 g2").sound("bass").gain(0.6),
  note("e5 g5 b5 g5").fast(2).gain(0.2).delay(0.15).lpf(4000),
  stack(
    s("bd ~ bd ~ bd ~ bd ~").gain(0.75),
    s("~ sn ~ sn ~ sn ~ sn").gain(0.55),
    s("hh*8").gain(0.25),
    s("~ ~ ~ ~ oh ~ ~ ~").gain(0.2)
  )
).slow(2);

// ─── Section E² : tension maximale ───────────────────────────────────────────

const sectionE2 = stack(
  // Violons encore plus haut
  note("b5 c6 d6 e6 d6 c6 b5 a5").sound("string").gain(0.45).room(0.6).cutoff(7000),
  note("e2 b2 c2 g2 e2 b2 c2 g2").sound("string").gain(0.4).lpf(800).room(0.5),
  note("e4 b4 c5 g4 e4 b4 c5 g4").sound("piano").gain(0.48),
  note("e2 b2 c2 g2 e2 b2 c2 g2").sound("bass").gain(0.62),
  note("e5 g5 b5 g5").fast(2).gain(0.22).delay(0.1).lpf(5000),
  // Pad tendu
  note("e3 b3 c4 g3").sound("pad").gain(0.14).room(0.7).cutoff(1200),
  stack(
    s("bd bd ~ bd bd ~ bd ~").gain(0.8),
    s("~ sn ~ sn ~ sn sn ~").gain(0.58),
    s("hh*8").gain(0.27),
    s("~ ~ oh ~ ~ ~ oh ~").gain(0.22)
  )
).slow(2);

// ─── Section C : retour thème, piano + cordes sans percus ────────────────────

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
  intro,        // Atmosphère
  sectionA,     // Thème — mélodie simple
  sectionA_var, // Thème — arpège + percus légères
  sectionB,     // Orchestre complet
  sectionD,     // Mélancolie — cordes en avant
  sectionD_var, // Mélancolie — dépouillé, nu
  bridge,       // Rupture/suspension
  sectionE,     // Tension montante
  sectionE2,    // Tension maximale
  sectionB2,    // Orchestre enrichi
  sectionC,     // Retour calme
  sectionA2,    // Thème varié + expressif
  outro         // Dissolution
)
.room(0.35)
.lpf(2200);
