let audioContext;
let channels = [[], [], [], []];
let currentChannel = null;
let startTime;
let isRecording = [false, false, false, false];


function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('AudioContext uruchomiony');
    }
}


function playSound(soundFile) {
    initAudioContext(); 
    console.log(`Próba odtworzenia pliku: ${soundFile}`);
    let audio = new Audio(soundFile);
    
    audio.addEventListener('canplaythrough', () => {
        console.log(`Plik dźwiękowy gotowy do odtworzenia: ${soundFile}`);
        audio.play().catch((error) => {
            console.log(`Błąd podczas odtwarzania dźwięku: ${error}`);
        });
    });

    audio.addEventListener('error', (e) => {
        console.error(`Błąd wczytywania pliku dźwiękowego: ${soundFile}`, e);
    });
}


function startRecording(channelNumber) {
    initAudioContext();  
    currentChannel = channelNumber - 1;  
    isRecording[currentChannel] = true;
    startTime = audioContext.currentTime;  
    console.log(`Rozpoczęto nagrywanie na kanale ${currentChannel + 1}`);
}

function recordSound(soundFile, key) {
    if (currentChannel !== null && isRecording[currentChannel]) {
        const time = audioContext.currentTime - startTime;
        channels[currentChannel].push({ sound: soundFile, key: key, time });
        console.log(`Nagrano dźwięk: ${soundFile}, w kanale: ${currentChannel + 1}, o czasie: ${time}`);
    }
}


function playChannel(channelNumber) {
    const channel = channels[channelNumber - 1];
    channel.forEach(note => {
        setTimeout(() => playSound(note.sound), note.time * 1000);
    });
}


function playAllChannels() {
    channels.forEach((channel, index) => playChannel(index + 1));
}


window.addEventListener('keydown', (e) => {
    let key = e.key.toLowerCase();
    let button = document.querySelector(`button[data-key="${key}"]`);

    if (button) {
        let soundFile = button.getAttribute('data-sound');
        playSound(soundFile);
        recordSound(soundFile, key);
    }
});

document.querySelectorAll('.record').forEach(button => {
    button.addEventListener('click', (e) => {
        console.log('Kliknięto przycisk nagrywania.');
        let channel = parseInt(e.target.getAttribute('data-channel'));
        startRecording(channel);
    });
});

document.querySelectorAll('.play').forEach(button => {
    button.addEventListener('click', (e) => {
        console.log('Kliknięto przycisk odtwarzania.');
        let channel = parseInt(e.target.getAttribute('data-channel'));
        playChannel(channel);
    });
});


document.getElementById('play-all').addEventListener('click', playAllChannels);
