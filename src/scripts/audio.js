let audioElement = document.getElementById('audio-element')
// audioElement.crossOrigin = 'anonymous';

const file = document.getElementById('music-upload')
file.addEventListener('change', function(){
  let files = this.files
  audioElement.src = URL.createObjectURL(files[0]);
  audioElement.load();
})

function randomIdFinder(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min);
};

export async function fetchJamendoSound() {
  let jamendoID = randomIdFinder(10, 250100);
  try{
    let res = await fetch(`http://localhost:5000/jamendosound?id=${jamendoID}`);
    let body = await res.json();
    if (body.results.length === 1) {
      audioElement.src = body.results[0].audio;
    } else {
      return await fetchJamendoSound();
    };
    }
    catch (err) {
    console.log(err)
  };
}

export async function fetchYoutubeSound() {
  const youtubeAPI = 'http:localhost:5000/youtubesound';  
  try {
    let res = await fetch(youtubeAPI);
    let body = await res.json();
    let randomId = randomIdFinder(0, 5142);
    let youtubeSoundKey = body.arr[randomId];
    console.log(body.map[youtubeSoundKey])
    let res2 = await fetch(`http://localhost:5000/youtubesounds?url=${encodeURIComponent(body.map[youtubeSoundKey])}`);
    let body2 = await res2.blob()
    console.log(URL.createObjectURL(body2))
    audioElement.src = URL.createObjectURL(body2)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchFreeSound(){
  let freeSoundId = randomIdFinder(6, 682339)
  const freeSoundAPI = `http://localhost:5000/freesound?id=${freeSoundId}`
  try {
    let res = await fetch(freeSoundAPI)
    let body = await res.json();
    audioElement.src = body.previews['preview-hq-mp3'];
  } catch (error) {
    console.log(error)
  }
}


//audio controls feature to be added later
// const playButton = document.getElementById('playbutton')

// playButton.addEventListener('click', function(){
//   audioElement.play();
// })