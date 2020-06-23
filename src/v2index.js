
var x = document.createElement("Canvas")
var ctx = x.getContext("2d");
var space = document.getElementById('v2')
ctx.fillStyle = "#00000";
ctx.fillRect(0,0, 500, 500);
space.appendChild(x);
console.log(space)