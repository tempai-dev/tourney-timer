import moment from 'moment';
require('moment-duration-format')(moment);

const HANCHAN_DURATION = moment.duration(90, 'minutes')

var gHanchanEnd = localStorage.getItem('hanchan_end');
if (gHanchanEnd === "null") { // fucking javascript
  localStorage.removeItem('hanchan_end')
  gHanchanEnd = null
}

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
  if (remaining == 5*60) {
    PlaySound('5min.warn')
    flashClock('floop', 2900)
  }
  if (remaining == 15*60) {
    PlaySound('15min.warn')
    flashClock('floop', 2900)
  }
}

function PlaySound(audioid) {
  let audio = document.getElementById(audioid)
  audio.currentTime = 0
  audio.play()
}

function StartHanchanCountdown() {

  let flashClock = function(flashclass, duration) {
    let clock = document.querySelector('.clock')
    clock.classList.add(flashclass)
    setTimeout(() => clock.classList.remove(flashclass), duration)
  }

  RefreshClock()
  let startTimer = function() {
    gHanchanEnd = moment().add(HANCHAN_DURATION)
    localStorage.setItem('hanchan_end', gHanchanEnd)
  }
  setTimeout(() => { PlaySound('tick'); flashClock('blip', 350); }, 1000)
  setTimeout(() => { PlaySound('tick'); flashClock('blip', 350); }, 2000)
  setTimeout(() => { PlaySound('tick'); flashClock('blip', 350); }, 3000)
  setTimeout(() => { PlaySound('tick'); flashClock('blip', 350); }, 4000)
  setTimeout(() => { PlaySound('gong'); flashClock('floop', 2900); startTimer(); }, 5000)
  /* Yoroshiku Onegaishimasu! */
}
