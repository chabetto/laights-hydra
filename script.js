var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false,
    enableStreamCapture: false,
})

function createOscillator(freq, scrollX, size, output, modulators, kaleid) {
    let oscil = osc(freq,scrollX)
    if (size != 0) { // size = 0 is sine, else square
        oscil.thresh(size)
    } if (kaleid) {
        oscil.kaleid(99)
    } if (modulators.length != 0) {
        for (let i = 1; i < modulators.length; i++){
            oscil.modulate(modulators[i])
        }
    }
    oscil.out(output)
}

function updateModulators() {
    let modArray1 = [];
    if (document.getElementById("os1mod1").checked) {
        modArray1.push(o0)
    } if (document.getElementById("os1mod2").checked) {
        modArray1.push(o1)
    } if (document.getElementById("os1mod3").checked) {
        modArray1.push(o2)
    }
    let modArray2 = []
    if (document.getElementById("os2mod1").checked) {
        modArray2.push(o0)
    } if (document.getElementById("os2mod2").checked) {
        modArray2.push(o1)
    } if (document.getElementById("os2mod3").checked) {
        modArray2.push(o2)
    }
    let modArray3 = []
    if (document.getElementById("os3mod1").checked) {
        modArray3.push(o0)
    } if (document.getElementById("os3mod2").checked) {
        modArray3.push(o1)
    } if (document.getElementById("os3mod3").checked) {
        modArray3.push(o2)
    }
    return [modArray1,modArray2,modArray3]
}

function updateFrequency() {
    let freq1 = document.getElementById("os1freq").valueAsNumber
    let freq2 = document.getElementById("os2freq").valueAsNumber
    let freq3 = document.getElementById("os3freq").valueAsNumber
    return [freq1,freq2,freq3]
}

function updateScrollSpeed() {
    let scro1 = document.getElementById("os1scro").valueAsNumber
    let scro2 = document.getElementById("os2scro").valueAsNumber
    let scro3 = document.getElementById("os3scro").valueAsNumber
    return [scro1,scro2,scro3]
}

function updateSize() {
    let size1 = document.getElementById("os1size").valueAsNumber
    let size2 = document.getElementById("os2size").valueAsNumber
    let size3 = document.getElementById("os3size").valueAsNumber
    return [size1,size2,size3]
}

function updateKaleid() {
    let kal1 = document.getElementById("os1kaleid").checked
    let kal2 = document.getElementById("os2kaleid").checked
    let kal3 = document.getElementById("os3kaleid").checked
    return [kal1,kal2,kal3]
}

function updateAllOsc() {
    let modArrays = updateModulators()
    let freqArray = updateFrequency()
    let scroArray = updateScrollSpeed()
    let kaleidArray = updateKaleid()
    let sizeArray = updateSize()
    let outputs = [o0,o1,o2]
    for (let i = 0;i < 3;i++) {
        createOscillator(freqArray[i],scroArray[i],sizeArray[i],outputs[i],modArrays[i],kaleidArray[i])
        console.log(freqArray[i],scroArray[i],sizeArray[i],outputs[i],modArrays[i],kaleidArray[i])
    }
}


createOscillator([30,20,10,1,10,20,30].smooth(),2,0.2,o1,[],false)
createOscillator(20,1,0,o0,[o1],false)
createOscillator(40,2,0,o2,[],false)
//render(o0)