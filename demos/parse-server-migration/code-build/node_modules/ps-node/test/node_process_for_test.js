var now = Date.now();
console.log('[child] child process start!');

function doSomething() {
  return null;
}

setInterval(function () {
  doSomething();
}, 50);
