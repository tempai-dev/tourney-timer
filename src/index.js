import moment from 'moment';
require('moment-duration-format')(moment);

const HANCHAN_DURATION = moment.duration(90, 'minutes')

var gHanchanEnd = localStorage.getItem('hanchan_end');

setInterval(RefreshClock, 1000)
setInterval(CheckTimeouts, 1000)

document.getElementById('btn-start')
  .addEventListener('click', StartHanchanCountdown)

RefreshClock()

function hide(el) { el.classList.add('hide') }
function unhide(el) { el.classList.remove('hide') }

function RefreshClock() {
  let clock = document.querySelector('.clock')
  let digits = document.querySelector('.clock span')
  let button = document.getElementById('btn-start')
  if (!! gHanchanEnd) {
    hide(button)
    unhide(digits)
    digits.innerText = moment.duration(moment(gHanchanEnd).diff(moment()))
                        .format('hh:mm:ss')
  } else {
    unhide(button)
    hide(digits)
  }
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
  setTimeout(() => playOnce(tick), 4000)
  setTimeout(() => { playOnce(gong); startTimer(); }, 5000)
  /* Yoroshiku Onegaishimasu! */
}
