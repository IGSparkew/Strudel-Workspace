cpm(120/4)

/**
 * Title: Morning Season
 * Author: IGSparkew
 * 
 * Software: Strudel.cc
 * Link: https://strudel.cc/#c2V0Y3BtKDEyMC80KQoKCmNvbnN0IERSVU1TX09OID0gMTsKY29uc3QgTUVMT0RZX09OID0gMTsKY29uc3QgQkFTU19PTiA9IDE7CgpsZXQgZHJ1bXMgPSBzdGFjaygKICBzb3VuZCgiYmQ6Myo0IiksCiAgc291bmQoIlstIGNwOjJdKiAyIiksCiAgc291bmQoIlstIGhoOjFdKiA0Iikuc29tZXRpbWVzQnkoLjI1LGZhc3QoMikpCikuYmFuaygiUm9sYW5kVFI5MDkiKS5nYWluKERSVU1TX09OID8gMC44IDogMCkgLl9waWFub3JvbGwoKQpsZXQgbWVsb2R5ID0gc3RhY2soCiAgbigiWzAsIDQsIDddIFsxICw2ICw5XSIpLnNjYWxlKCJDNDptaW5vciIpLnNvdW5kKCJnbV9wYWRfd2FybToyIikuc2xvdygyKSwgCiAgbigiPFstIDBdIDMgWy0gMF0gMiAyIDQgWy0gMF0gMyBbLSAwXSAxIDIgWzQgNF0%2BKjgiKS5zY2FsZSgiQzQ6bWlub3IiKS5zb3VuZCgic3F1YXJlIikKKS5nYWluKE1FTE9EWV9PTiA%2FIDAuNSA6IDApLl9waWFub3JvbGwoKQoKbGV0IGJhc3MgPSBzdGFjaygKICBuKCI8MCA8NSAyPj4gKjgiKS5zY2FsZSgiQzI6bWlub3IiKS5zb3VuZCgic2luZSIpLnNwZWVkKC41KQopLmdhaW4oQkFTU19PTiA%2FIDAuNiA6IDApCi5fcGlhbm9yb2xsKCkKCgphcnJhbmdlKAogIFs0LCBkcnVtc10sCiAgWzgsIHN0YWNrKGRydW1zLCBiYXNzKV0sCiAgWzQsIG1lbG9keV0sCiAgWzgsIHN0YWNrKG1lbG9keSwgZHJ1bXMpXSwKICBbOCwgc3RhY2sobWVsb2R5LCBkcnVtcywgYmFzcyldCikuX3BpYW5vcm9sbCgp 
*/

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