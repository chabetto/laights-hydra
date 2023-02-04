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
    let freq = document.getElementById("os" + no + "freq").valueAsNumber
    // scroll
    let scro = document.getElementById("os" + no + "scro").valueAsNumber
    // size
    let size = document.getElementById("os" + no + "size").valueAsNumber
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
    size.onchange = () => updateOsc(no)
    scro.onchange = () => updateOsc(no)
    freq.onchange = () => updateOsc(no)
}

function start() {
    for (let i = 1; i < 4; i++) {
        setUpOsc(i)
        updateOsc(i)
    }
    document.getElementById("upload").addEventListener("change", playAudio, false);
}

function playAudio(stopTime = false) {
    const uploadedFile = document.getElementById("upload").files[0];
    $("#src").attr("src", URL.createObjectURL(uploadedFile));
    document.getElementById("audio").load();
    const audioContext = new AudioContext();
    const htmlAudioElement = document.getElementById("audio");
    const source = audioContext.createMediaElementSource(htmlAudioElement);
    source.connect(audioContext.destination);

    const freqOsc3 = document.getElementById("os3scro")

    if (typeof Meyda === "undefined") {
    console.log("Meyda could not be found! Have you included it?");
    }
    else {
    const analyzer = Meyda.createMeydaAnalyzer({
        "audioContext": audioContext,
        "source": source,
        "bufferSize": 4096*2,
        "featureExtractors": ["rms"],
        "callback": features => {
        console.log(features);
        freqOsc3.value = features.rms * 30;
        }
    });
    analyzer.start();
    }

    let gameTime = window.setInterval(() => {
        updateOsc(3)
    },  100);
}

start()