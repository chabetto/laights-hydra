var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false,
    enableStreamCapture: false,
})

function createOscillator(freq, scrollX, size, output, modulate, feedback = false, kaleid = false) {
    let oscil = osc(freq,scrollX)
    if (size != 0) { // size = 0 is sine, else square
        oscil.thresh(size)
    } if (kaleid) {
        oscil.kaleid(99)
    } if (modulate[0]) {
        for (let i = 1; i < modulate.length; i++){
            oscil.modulate(modulate[1])
        }
    } if (feedback) {
        oscil.modulate(output)
    }
    oscil.out(output)
}

createOscillator([30,20,10,1,10].smooth(),2,0.2,o1,[false,o0])
createOscillator(20,1,0,o0,[true,o1,o2],1,1)
createOscillator(5,2,0,o2,[true,o0],1,1)
render(o0)