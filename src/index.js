import moment from 'moment';
require('moment-duration-format')(moment);

const HANCHAN_DURATION = moment.duration(90, 'minutes')

var gHanchanEnd = localStorage.getItem('hanchan_end');

setInterval(RefreshClock, 1000)
setInterval(CheckTimeouts, 1000)

function RefreshClock() {
  let clock = document.querySelector('.clock')
  let text = (!! gHanchanEnd)
        ? moment.duration(moment(gHanchanEnd).diff(moment())).format('hh:mm:ss')
        : HANCHAN_DURATION.format('hh:mm:ss')
  clock.innerText = text
}

function CheckTimeouts() {
  if (!gHanchanEnd) return;
  let remaining = moment(gHanchanEnd).diff(moment(), 'seconds')
  console.log(remaining + " seconds remaining")
  if (remaining == 0) {
    // stop the clock
    gHanchanEnd = null
    localStorage.setItem('hanchan_end', gHanchanEnd)
  }
  if (remaining == 1*60) {
    console.log('last minute warning!')
  }
}

function StartHanchanCountdown() {
  let tick = document.getElementById('tick')
  let gong = document.getElementById('gong')

  let flashClock = function() {
    let clock = document.querySelector('.clock')
    clock.classList.add('flashing')
    setTimeout(() => clock.classList.remove('flashing'), 400)
  }

  let playOnce = function(audio) {
    audio.currentTime = 0
    audio.play()
    flashClock()
  }

  RefreshClock()
  let startTimer = function() {
    gHanchanEnd = moment().add(HANCHAN_DURATION)
    localStorage.setItem('hanchan_end', gHanchanEnd)
  }
  setTimeout(() => playOnce(tick), 1000)
  setTimeout(() => playOnce(tick), 2000)
  setTimeout(() => playOnce(tick), 3000)
  setTimeout(() => { playOnce(gong); startTimer(); }, 4000)
  /* Yoroshiku Onegaishimasu! */
}

document.getElementById('btn-start')
  .addEventListener('click', StartHanchanCountdown)
