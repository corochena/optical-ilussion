var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

var nBalls = 1;
var R = 270, r = 15, freq = 1 / 6;
var t = 0, counter = 0;

requestAnimationFrame(cycle);

function cycle(time) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // dibuja un gran circulo rojo en el centro del canvas
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(width / 2, (height-80) / 2, R, 0, 2 * Math.PI);
  ctx.fill();

  // dibuja las bolitas blancas siguiendo un patron de movimiento armonico simple
  var multPhase = Number(document.querySelector("select").value);
  if (multPhase < 0) multPhase = 1 / multPhase;
  var angPhase = 2 * Math.PI / nBalls;
  for (var i = 1; i <= nBalls; i++) {
    var xMAS = xArmonic(t, R - r, freq, angPhase * i * multPhase, width / 2);
    var pos = rotate(xMAS, angPhase * i / 2, [width / 2, (height-80) / 2]);
    drawBall(pos[0], pos[1], r, i);
  }

  // dibuja el tiempo transcurrido
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("t = " + t.toFixed(1), 900, 60);

  // incrementa el numero de bolitas despues de 5 seg y lo restablece despues de 3 min
  if (counter % 300 == 0) nBalls++;
  if (counter % 10800 == 0) nBalls = 1;

  // incrementa el tiempo en 1/60 seg, incrementa el contador y ejecuta la animacion
  t += 1 / 60;
  counter++;
  requestAnimationFrame(cycle);
}

function drawBall(x, y, r, i) {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(i, x - 13, y + 7);
}

function xArmonic(t, Amp, freq, angPhase) {
  return Amp * Math.cos(2 * Math.PI * freq * t + angPhase);
}

function rotate(r, ang, center) {
  return [r * Math.cos(ang) + center[0], r * Math.sin(ang) + center[1]];
}