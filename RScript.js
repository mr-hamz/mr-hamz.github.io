var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var isMoving = false;

var box0 = {x_pos: 100, y_pos: 100}
var box1 = {x_pos: 70, y_pos: 40}

var keys = [];
var herd = [];
function animal(name,x,y, speed) {
this.x_pos = x;
this.y_pos = y;
this.speed = speed;
this.name = name;
}
function update(){



if(keys[65]) { left();}
if(keys[68]) { right();}
if(keys[87]) { up();}
if(keys[83]) { down();}
clear();
draw();

}

function RunGame(){
document.addEventListener("keydown", function (e) {keys[e.keyCode] = true;}, false)
document.addEventListener("keyup", function (e) { delete keys[e.keyCode]} , false)

herd.push(new animal('mule', 20,20,2))
herd.push(new animal('deer', 45, 70,2))
herd.push(new animal('cat', 150,150,2))
console.log(herd[0])
var interval = setInterval(update,17)

}



function draw (){
if (isMoving) {
	down()
}





for (var i=0; i<3; i++) {
	 var h = herd[i]
  
   if (Math.hypot((box0.x_pos - h.x_pos),(box0.y_pos - h.y_pos))< 20) {
     
     x = (h.x_pos - box0.x_pos)
     y = (h.y_pos - box0.y_pos)
     
     
     
     
     theta = Math.atan(y/x)
     
     if (x < 0 && y>0) {theta += Math.PI}

     if (x<0 && y<0) {theta -= Math.PI}

      var x1 = Math.cos(theta);
      var y1 = Math.sin(theta);
     
      var a = 20 * x1
      var b = 20 * y1
      var new_x = h.x_pos +  a    
      var new_y = h.y_pos +  b
    if(new_x > 0 && new_x <180) {h.x_pos += a} 
    if(new_y > 0 && new_y <180) {h.y_pos += b}

  } 
  
  else {
    
     val = Math.random()
  if (val > 0 && val < 0.25) {x_dir = 1 
  y_dir =1}
  if (val >= 0.25 && val < 0.50) {x_dir = -1 
  y_dir =1}
  if (val >= 0.50 && val < 0.75) {x_dir =1 
  y_dir = -1}
  if (val >= 0.75 && val < 1.00) {x_dir = -1 
  y_dir = -1}
  
  var n_x = h.x_pos + (x_dir * h.speed)
  var n_y = h.y_pos + (y_dir * h.speed)
  
  
  if(n_x > 20 && n_x <180) {h.x_pos = n_x} 
    if(n_y > 20 && n_y <180) {h.y_pos= n_y}
  
  
  
  
 
  
  
  } 
  ctx.fillRect(h.x_pos, h.y_pos, 10,10)
  ctx.fillRect(box0.x_pos,box0.y_pos,10,10);
  }
  
  
}



function vector(hx, hy, h) {


var x = box0.x_pos - hx
var y = box0.y_pos - hy

angle = Math.atan(y/x)

if (x < 0 && y>0) {
angle += Math.PI

}

if (x<0 && y<0) {
angle -= Math.PI
}



var x1 = Math.cos(angle);
var y1 = Math.sin(angle);

 var a = 20* x1
var b = 20 * y1
n_x = h.x_pos + a;
n_y = h.y_pos + b;

if( n_x < 0 || n_x >200 || n_y < 0 || n_y > 200) {
  
  } else {
  
  h.x_pos = n_x;
  h.y_pos = n_y;
  }

}


function down(){

if (box0.y_pos < 190) {
box0.y_pos += 2;
}

}
function right(){
if (box0.x_pos < 190) {
box0.x_pos += 2;

}

}
function left(){
if (box0.x_pos > 0) {
box0.x_pos -= 2;

}

}
function up(){
if (box0.y_pos > 0) {
box0.y_pos -= 2;

}

}

function clear() {
ctx.clearRect(0,0,200,200);
}



