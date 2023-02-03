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
        for (let i = 0; i < modulators.length; i++){
            kaleid ? oscil.modulate(modulators[i]) : oscil.modulateRotate(modulators[i])
        }
    }
    oscil.out(output)
}

function updateOsc(no) {
    // modulators
    let modArray = [];
    if (document.getElementById("os" + no + "mod1").checked) {
        modArray.push(o0)
    } if (document.getElementById("os" + no + "mod2").checked) {
        modArray.push(o1)
    } if (document.getElementById("os" + no + "mod3").checked) {
        modArray.push(o2)
    }
    // output
    let output = [o0,o1,o2][no - 1]
    // freq
    let freq = document.getElementById("os" + no + "freq").valueAsNumber / 10
    // scroll
    let scro = document.getElementById("os" + no + "scro").valueAsNumber / 10
    // size
    let size = document.getElementById("os" + no + "size").valueAsNumber / 100
    // kaleidoscope
    let kal = document.getElementById("os" + no + "kaleid").checked
    createOscillator(freq,scro,size,output,modArray,kal)
}

function setUpOsc(no) {
    let kal = document.getElementById("os" + no + "kaleid")
    let mod1 = document.getElementById("os" + no + "mod1")
    let mod2 = document.getElementById("os" + no + "mod2")
    let mod3 = document.getElementById("os" + no + "mod3")
    let size = document.getElementById("os" + no + "size")
    let scro = document.getElementById("os" + no + "scro")
    let freq = document.getElementById("os" + no + "freq")
    kal.onclick = () => updateOsc(no)
    mod1.onclick = () => updateOsc(no)
    mod2.onclick = () => updateOsc(no)
    mod3.onclick = () => updateOsc(no)
    size.oninput = () => updateOsc(no)
    scro.oninput = () => updateOsc(no)
    freq.oninput = () => updateOsc(no)
}

function start() {
    for (let i = 1; i < 4; i++) {
        setUpOsc(i)
        updateOsc(i)
    }
    document.getElementById("upload").addEventListener("change", playAudio, false);
}

function playAudio() {
    let uploadedFile = document.getElementById("upload").files[0];
    $("#src").attr("src", URL.createObjectURL(uploadedFile));
    document.getElementById("audio").load();
}

start()