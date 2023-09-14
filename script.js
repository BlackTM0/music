var audio, context, analyser, src, array, logo,play;

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");
play = document.getElementById("play");

play.onclick = function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
        play.textContent ='Пауза'; 
    }else{
        audio.pause();
        play.textContent ='Играть'; 
    }
}

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logo.minHeight = (array[40])+"px";
    logo.width =  (array[40])+"px";
}