ig.game.spawnEntity(EntityScholle1,50,ypos,{velx:70});





type: ig.Entity.TYPE.A,

checkAgainst:ig.Entity.TYPE.A,




check: function(other)
{
  if(other instanceof  EntityBaer1)
  {
    ig.game.Score+=1;
    other.kill();
  }
this.parent(other);
},






draw: function() {
  // Draw all entities and backgroundMaps
  this.parent();

  this.font.draw("Score:"+this.Score,20,20);

}



function RanNum(min,max)
{
	return Math.floor(Math.random() * (max - min) + min);
}



ig.input.bind( ig.KEY.UP_ARROW, 'up');
ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');





ig.game.loadLevel( LevelMain );






//Determined by the number. Ausführen in der init funktion
this.zIndex = 990;

//Ausführen in der Update Funktion, nachdem die Entities gespawnt wurden.
ig.game.sortEntitiesDeferred();




ig.game.spawnEntity(EntityBall,this.pos.x,this.pos.y,{velx:Math.cos(this.currentAnim.angle) * this.speedBall,vely:Math.sin(this.currentAnim.angle) * this.speedBall});




if(ig.input.state('left'))
{
  this.currentAnim.angle-=0.04;
}
else if (ig.input.state('right'))
{
  this.currentAnim.angle+=0.04;
}







//==>Alles nach der this.parent einfügen
//TruckBild laden für ein HUD
truck90: new ig.Image("media/truck90.png"),

//in der draw Function
this.truck90.draw(0,0);


//Canvas Element
var canvas=document.getElementById('canvas');
var context= canvas.getContext("2d");



context.fillStyle = "#FF0000";



context.beginPath();
context.rect(25,83,30,10);
context.fill();




var truck = getEntitiesByType('EntityTruck')[0];





this.vel.x = -Math.cos(rad(alpha))*speed;
this.vel.y = -Math.sin(rad(alpha))*speed;





in Weltmeister key:name, value:der tatsächliche Name
var entity= getEntityByName("Peter");





var angle=this.currentAnim.angle

var Ball=ig.game.spawnEntity(...);

Ball.vel.x=Math.cos(angle)*100;
Ball.vel.y=Math.sin(angle)*100;




context.lineWidth = 0;
context.font = "15px Arial";
context.stroke.fillText("Hello World", 10, 50);
context.stroke.fillText("Hello World", 10, 70);
context.stroke.fillRect(80, 20, 150, 100);

context.stroke();
