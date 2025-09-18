/**
@title ----
@by ------
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
const BPM = 120/2;

//BANK
const DRUM_BANK = "RolandTR909";

// On off your main pattern for live
const DRUMS_ON = 1;
const MELODY_ON = 1;
const BASS_ON = 1;

setcpm(BPM/4);

const drums = stack(
    
).bank(DRUM_BANK).gain(DRUMS_ON ? DRUMS_GAIN : 0)._punchcard().color(DRUMS_COLOR);

const melody = stack(

).gain(MELODY_ON ? MELODY_GAIN : 0)._punchcard().color(MELODY_COLOR);

const bass = stack(

).gain(BASS_ON ? BASS_GAIN : 0)._punchcard().color(BASS_COLOR);

// make off when loop finished
$: drums
$: melody
$: bass


/** 
const main = arrange(
    
)._pianoroll();
*/

/*
const drums = stack(
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
sound("[- - - -] [- - - -] [- - - -] [- - - -]"),
).bank(DRUM_BANK).gain(DRUMS_ON ? DRUMS_GAIN : 0)._pianoroll();
*/