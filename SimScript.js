
var flock = []
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

function boid (x, y, velocity, x_vel, y_vel) {
    this.x = x
    this.y = y
    this.velocity = velocity
    this.x_vel = x_vel
    this.y_vel = y_vel  
}



var Vd = [150, 150]




  
function RunSim(){
 
  flock.push(new boid(10, 10, 6, 0.7, -0.7))
  flock.push(new boid(60, 37, 6, -0.7, 0.7))
  flock.push(new boid(300, 400, 6, 0.7, -0.7))
  
  ctx.fillRect(150,150, 5,5)
  gameloop = setInterval(update, 50);
  
}

function update () {
 
  for (var i=0; i < flock.length; i++) {
   var agent = flock[i]

       var a = (goal(agent))
       var v1 = vector1(agent, i)
  
  var current_vx = agent.x_vel * agent.velocity
  var current_vy = agent.y_vel * agent.velocity
  
  var sum_x =    a[0] + v1[0]
  var sum_y =    a[1] + v1[1]
  
  sum_x /=  amplitude(sum_x, sum_y) //normalize
  sum_y /=  amplitude(sum_x, sum_y) //normalize
  
  
  
  var d_x = sum_x * agent.velocity
  var d_y = sum_y * agent.velocity
 
  
  
  
  var steer_x = d_x - current_vx
  var steer_y = d_y - current_vy
  
  //normalize steer force
  
  steer_x /= amplitude(steer_x, steer_y)
  steer_y /= amplitude(steer_x, steer_y)
 
  var newx = ( (agent.x_vel * agent.velocity) + steer_x *2)
  var newy = ( (agent.y_vel * agent.velocity) + steer_y * 2)

  agent.x_vel = newx / amplitude(newx,newy)
  agent.y_vel = newy / amplitude(newx,newy)
  
 agent.x += agent.x_vel * agent.velocity
 agent.y += agent.y_vel * agent.velocity
   
   ctx.fillRect(flock[i].x, flock[i].y, 10,10)
   
   }
 
}

function vector1 (agent, i) {
  var totalx = 0
  var totaly = 0
  var align = []
  var n_count = 0
  for(var f = 0; f < flock.length; f++) {
    if(f !== i) {
      console.log(f + " " + i)
     totalx += flock[f].x_vel
     totaly += flock[f].y_vel
     n_count++
    }
    
    
   
    
  }
  
   
  
  align[0] = (totalx / n_count) / amplitude(totalx, totaly)
  align[1] = (totaly / n_count) / amplitude(totalx, totaly)
  
  return align
}



  function goal (boid) {
  //obtain desired velocity to target 
  var accel = []
  var dx = ((Vd[0] - boid.x))
  var dy = ((Vd[1] - boid.y))
  var amp = amplitude(dx,dy)
  //find acceleration vectors by desired velocity - current velocity
  
 accel[0] = dx / amp
 accel[1] = dy / amp
 
   return accel
}

function amplitude (x,y) {
   return Math.abs(Math.sqrt((x * x)+(y * y)))
      
}

function stop () {
  clearInterval(gameloop)
}
  

function cohesion () {
     var totalx
     var totaly
     var n_count
     var center = []
  for(var k = 0; k < flock.length; k++) {
        totalx += flock[k].x_pos
        totaly += flock[k].y_pos
        n_count++
      }

totalx /= n_count
totaly /= n_count

var amp = amplitude(totalx, totaly)

center [0] = totalx / amp
center [1] = totaly / amp

return center
}







