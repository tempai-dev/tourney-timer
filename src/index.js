import vue from 'vue';

function StartHanchanCountdown() {
  let tick = document.getElementById('tick')
  let gong = document.getElementById('gong')

  let playOnce = function(audio) {
    return function() {
      audio.currentTime = 0
      audio.play()
    }
  }
  setTimeout(playOnce(tick), 1000)
  setTimeout(playOnce(tick), 2000)
  setTimeout(playOnce(tick), 3000)
  setTimeout(playOnce(gong), 4000)
  /* Yoroshiku Onegaishimasu! */
}

document.getElementById('btn-start')
  .addEventListener('click', StartHanchanCountdown)
