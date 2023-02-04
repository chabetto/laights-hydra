var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false,
    enableStreamCapture: false,
})

function createOscillator(modulators, kaleid, no) { // modulators contain array of outputs
    let oscil = osc(() => bigArrayForOsc[no-1][0],() => bigArrayForOsc[no-1][1])
    oscil.thresh(() => bigArrayForOsc[no-1][2])
    if (kaleid) {
        oscil.kaleid(99)
    } if (modulators.length != 0) { // check if we are actually modulating
        for (let i = 0; i < modulators.length; i++){
            kaleid ? oscil.modulate(modulators[i]) : oscil.modulateRotate(modulators[i])
        }
    }
    let output = [o0,o1,o2][no - 1]
    oscil.out(output) // output
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
    // kaleidoscope
    let kal = document.getElementById("os" + no + "kaleid").checked
    createOscillator(modArray,kal,no)
}

function updateBigArray(no) {
    bigArrayForOsc[no-1][0] = document.getElementById("os" + no + "freq").valueAsNumber
    bigArrayForOsc[no-1][1] = document.getElementById("os" + no + "scro").valueAsNumber
    bigArrayForOsc[no-1][2] = document.getElementById("os" + no + "size").valueAsNumber

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
    size.oninput = () => updateBigArray(no)
    scro.oninput = () => updateBigArray(no)
    freq.oninput = () => updateBigArray(no)
}

function start() {
    for (let i = 1; i < 4; i++) {
        setUpOsc(i)
        updateOsc(i)
    }
    document.getElementById("upload").addEventListener("change", playAudio, false);
}

function playAudio() {
    const uploadedFile = document.getElementById("upload").files[0];
    $("#src").attr("src", URL.createObjectURL(uploadedFile));
    document.getElementById("audio").load();
    const audioContext = new AudioContext();
    const htmlAudioElement = document.getElementById("audio");
    const source = audioContext.createMediaElementSource(htmlAudioElement);
    source.connect(audioContext.destination);

    const freqOsc3 = document.getElementById("os3size")

    if (typeof Meyda === "undefined") {
    console.log("Meyda could not be found! Have you included it?");
    }
    else {
    const analyzer = Meyda.createMeydaAnalyzer({
        "audioContext": audioContext,
        "source": source,
        "bufferSize": 512,
        "featureExtractors": ["rms"],
        "callback": features => {
        console.log(features);
        freqOsc3.value = features.rms * 3;
        bigArrayForOsc[2][2] = features.rms * 3;
        }
    });
    analyzer.start();
    }
}
let bigArrayForOsc = [[5,1,0.01],[5,1,0.01],[5,1,0.01]]

start()