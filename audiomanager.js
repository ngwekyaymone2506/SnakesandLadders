// audio-manager.js

document.addEventListener('DOMContentLoaded', () => {
  const audioId = 'background-audio';
  let audio = document.getElementById(audioId);

  // If the audio element does not exist, create it
  if (!audio) {
      audio = document.createElement('audio');
      audio.id = audioId;
      audio.src = 'Gaming intro Sound Effect(MP3_160K).mp3';
      audio.loop = true; // Set to true if you want the music to loop
      audio.autoplay = true;
      document.body.appendChild(audio);
  }

  // Function to decrease the audio volume
  function decreaseVolume() {
      audio.volume = Math.max(0, audio.volume - 0.1);
  }

  // Add an event listener to the document for click events
  document.addEventListener('click', decreaseVolume);
});
