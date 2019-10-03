
export const Analyser = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(document.querySelector('video'));
    const gainNode = audioCtx.createGain();

    console.log(gainNode.gain.value);

    source.connect(analyser);
    source.connect(audioCtx.destination);

    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    // CANVAS setup here
    const width = 500;
    const height = 500;
    const canvas = document.querySelector('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    const canvasCtx = canvas.getContext('2d');
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 1)';
    //canvasCtx.translate(width/2, height/2);
    //canvasCtx.fillRect(-width/2, -height/2, width, height);
    canvasCtx.fillRect(0, 0, width, height);

    var logo = new Image();
    logo.src = process.env.PUBLIC_URL + "/shape-round-large.svg";
    logo.onload = () => canvasCtx.drawImage(logo, 0, 0, 500, 500);

    const draw = () => {
        requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        let test = Math.max.apply( null, dataArray );
        console.log(test/256)
        let percent = test/256;

        canvasCtx.clearRect(0, 0, width, height);
        canvasCtx.fillRect(0, 0, width, height);
        canvasCtx.drawImage(logo, 0, 0, 500 * percent, 500 * percent);
        
        // for(var i = 0; i < bufferLength; i++) {
        //     console.log(dataArray[i]);
        // }
    }
    draw();
    //setInterval(draw, 100);

    /*if (navigator.getUserMedia) {
        navigator.getUserMedia (
            { audio: true },
            (stream) => {
                source = audioCtx.createMediaStreamSource(stream);
                source.connect(analyser);
            },
            (error) => {
                console.log(error);
            }
        );
    }*/
}

/*
const canvas = document.querySelector('canvas');
canvas.setAttribute('width',width);
canvas.setAttribute('height',height);

const canvasCtx = canvas.getContext("2d");
canvasCtx.fillStyle = 'rgba(0, 0, 0, 1)';
canvasCtx.strokeStyle = 'rgb(255, 0, 0)';
canvasCtx.lineWidth = 1;
canvasCtx.translate(width/2, height/2);
*/


export default Analyser;