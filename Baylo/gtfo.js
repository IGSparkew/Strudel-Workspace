const dbank = "tr909";

// Pattern global de batterie
const drums = stack(
  // Hi-hat simple
  s("hh*8").gain(0.2),

  // Kick euclidien
  s("bd(<5 7>,16)").bank(dbank),

  // Snare sur 4 et 12
  s("sd").bank(dbank).beat("4,12", 16),

  // Mid-snare sur 2 et 6
  s("md").bank(dbank).beat("2,6", 16),

  // Nouveau : petit clap sur 8 pour casser la routine
  s("cp").bank(dbank).beat("8", 16)
);

// Basse simple qui colle au kick euclidien
const bass = s("sub*4")
  .n("0 0 -3 0")    // pattern ultra simple, mineur
  .gain(0.6)
  .slow(2);         // on l’étire un peu pour pas marcher sur les drums

$: drums;   
$: bass;

// On joue tout le kit d'un coup
$: drums._punchcard();

