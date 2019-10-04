
export const Analyser = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(document.querySelector('video'));

    source.connect(analyser);
    source.connect(audioCtx.destination);

    analyser.fftSize = 1024;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    let iterations = 0;
    let width = 1000;
    let height = 1000;
    const canvas = document.querySelector('canvas');
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.fillStyle = 'rgba(23,23,26, 1)';

    var logo = new Image();
    logo.src = process.env.PUBLIC_URL + "/shape-round-large.svg";
    logo.onload = () => canvasCtx.drawImage(logo, 0, 0, 500, 500);

    const draw = () => {
        requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        let test = Math.max.apply( null, dataArray );

        const percent = test/256;
        const offset = (800 * percent) / 2;
        //console.log(width, height, test/256, offset)

        if(++iterations === 25) {
            iterations = 0;
            canvasCtx.clearRect(-width/2, -height/2, width, height);
        }

        canvasCtx.drawImage(logo, -offset, -offset, 800 * percent, 800 * percent);
    }

    draw();

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvasCtx.translate(width/2, height/2);
    };

    window.addEventListener('resize', resize);

    resize();
}

export default Analyser;