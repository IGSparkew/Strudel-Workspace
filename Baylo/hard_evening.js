/**
@title Hard Evening
@by Baylo
*
* Software: Strudel.cc
*/

// Colors
const DRUMS_COLOR = "red";
const MELODY_COLOR = "blue";
const BASS_COLOR = "magenta";

// GAINS
const DRUMS_GAIN = 1;
const MELODY_GAIN = 1;
const BASS_GAIN = 1;

// BPM
const BPM = 140;

//BANK
const DRUM_BANK = "RolandTR909";

// On off your main pattern for live
const DRUMS_ON = 1;
const MELODY_ON = 1;
const BASS_ON = 1;

setcpm(BPM/4);

// VERSE DRUMS - More minimal
const verseDrums = stack(
    sound("bd ~ ~ ~").gain(1.0),
    sound("~ ~ sd ~").gain(1.2).room(0.3),
    sound("hh ~ hh ~").gain(0.6).hpf(8000)
).bank(DRUM_BANK);

// CHORUS DRUMS - Full power
const chorusDrums = stack(
    sound("bd bd ~ bd").gain(1.2).distort(0.3),
    sound("~ ~ sd ~").gain(1.5).room(0.5),
    sound("hh hh hh hh").gain(0.8).hpf(8000),
    sound("~ ~ ~ [sd sd]").sometimes(x => x.speed(2)),
    sound("~ ~ ~ ~").struct("x(3,8)").s("kick").gain(0.8)
).bank(DRUM_BANK);

// BRIDGE DRUMS - Breakbeat style
const bridgeDrums = stack(
    sound("bd ~ bd ~").gain(1.1),
    sound("~ sd ~ [sd sd]").gain(1.3).room(0.4),
    sound("[hh hh] ~ [hh hh] ~").gain(0.7).hpf(6000)
).bank(DRUM_BANK);

// VERSE MELODY - Simpler
const verseMelody = stack(
    note("[c3 eb3] [g3 ~] [f3 ab3] [g3 ~]")
        .s("square")
        .lpf(1000)
        .gain(0.4)
        .slow(2)
);

// CHORUS MELODY - Full intensity
const chorusMelody = stack(
    note("c4 ~ eb4 ~ g4 ~ f4 ~")
        .s("sawtooth")
        .lpf(sine.range(1200, 3000).fast(2))
        .gain(0.7)
        .distort(0.6)
        .room(0.3)
        .delay(0.125)
        .delayfeedback(0.4),
    note("c5 c5 eb5 eb5 g5 g5 bb5 bb5")
        .s("square")
        .gain(0.6)
        .distort(0.8)
        .crush(4)
        .hpf(1000)
        .room(0.8)
        .sometimes(x => x.speed(2))
        .fast(2)
);

// BRIDGE MELODY - Different harmony
const bridgeMelody = stack(
    note("f3 ab3 bb3 c4")
        .s("triangle")
        .lpf(1200)
        .gain(0.5)
        .delay(0.25)
        .delayfeedback(0.4)
);

// VERSE BASS - Minimal
const verseBass = stack(
    note("c1 ~ ~ ~ eb1 ~ ~ ~ g1 ~ ~ ~ f1 ~ ~ ~")
        .s("sine")
        .gain(0.8)
        .slow(2)
);

// CHORUS BASS - Full power
const chorusBass = stack(
    note("c1 c1 ~ c1 eb1 eb1 ~ eb1 g1 g1 ~ g1 f1 f1 ~ f1")
        .s("square")
        .lpf(150)
        .gain(1.2)
        .distort(0.5)
        .crush(6),
    note("c1 ~ c1 ~ eb1 ~ g1 f1")
        .s("808")
        .gain(1.5)
        .lpf(80)
        .distort(0.3)
        .room(0.2)
        .fast(0.5)
);

// BRIDGE BASS - Walking bass
const bridgeBass = stack(
    note("f1 g1 ab1 bb1")
        .s("sawtooth")
        .lpf(200)
        .gain(1.0)
);

// Simplified sections based on gain control
const verse = stack(
    verseDrums.gain(DRUMS_ON ? DRUMS_GAIN : 0).color(DRUMS_COLOR),
    verseMelody.gain(MELODY_ON ? MELODY_GAIN : 0).color(MELODY_COLOR),
    verseBass.gain(BASS_ON ? BASS_GAIN : 0).color(BASS_COLOR)
);

const chorus = stack(
    chorusDrums.gain(DRUMS_ON ? DRUMS_GAIN : 0).color(DRUMS_COLOR),
    chorusMelody.gain(MELODY_ON ? MELODY_GAIN : 0).color(MELODY_COLOR),
    chorusBass.gain(BASS_ON ? BASS_GAIN : 0).color(BASS_COLOR)
);

const bridge = stack(
    bridgeDrums.gain(DRUMS_ON ? DRUMS_GAIN : 0).color(DRUMS_COLOR),
    bridgeMelody.gain(MELODY_ON ? MELODY_GAIN : 0).color(MELODY_COLOR),
    bridgeBass.gain(BASS_ON ? BASS_GAIN : 0).color(BASS_COLOR)
);

// Song arrangement like dark.js
arrange(
   [4, verseMelody.gain(MELODY_ON ? MELODY_GAIN : 0).color(MELODY_COLOR)],
   [4, stack(verseMelody.gain(MELODY_ON ? MELODY_GAIN : 0).color(MELODY_COLOR), verseDrums.gain(DRUMS_ON ? DRUMS_GAIN : 0).color(DRUMS_COLOR))], 
   [6, verse],
   [6, chorus],
    [4, bridge],
   [4, verseMelody.gain(MELODY_ON ? MELODY_GAIN : 0).color(MELODY_COLOR)],
  [2, stack(verseMelody.gain(MELODY_ON ? MELODY_GAIN : 0).color(MELODY_COLOR), verseDrums.gain(DRUMS_ON ? DRUMS_GAIN : 0).color(DRUMS_COLOR))],
   [6, chorus],
   [4, bridge],
   [2, chorus],
   [2, verseMelody.gain(MELODY_ON ? MELODY_GAIN * 0.5 : 0).color(MELODY_COLOR)]
)._pianoroll()

/*
const drums = stack(
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
).bank(DRUM_BANK).gain(DRUMS_ON ? DRUMS_GAIN : 0)._pianoroll();
*/