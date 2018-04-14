import vue from 'vue';

function test() {
  var el = document.createElement('p')
  el.innerHTML = "test passed!"
  return el
}

document.body.appendChild(test())
