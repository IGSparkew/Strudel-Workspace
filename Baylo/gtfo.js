const dbank = "tr909";

// Hi-hat simple
$: s("hh*8").gain(.2);

// Kick pattern euclidien (5 coups répartis sur 16 steps)
$: s("bd(<5 7>,16)").bank(dbank)._punchcard();

// Snare pattern avec .beat() sur 4 et 12
$: s("sd").bank(dbank).beat("4,12", 16)._punchcard()

// Snare pattern avec .beat() sur 2 et 6
$: s("md").bank(dbank).beat("2,6", 16)._punchcard()
;
