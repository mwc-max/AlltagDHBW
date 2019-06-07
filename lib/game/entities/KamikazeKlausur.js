ig.module(
  'game.entities.KamikazeKlausur'
)

.requires(
  'impact.entity',
  'game.entities.bullet',
  'game.entities.NoteSechs',
  'game.entities.EntityBulletEnemy',
  'game.entities.EnemyExplosionParticles',
  'impact.entity-pool',
  'game.entities.player'
)

.defines(function(){

  EntityKamikazeKlausur=ig.Entity.extend({

    Leben: 10,
    _wmIgnore: true,
    size:{x:30,y:30},
    sizex:0,
    sizey:0,
    velx:0,
    vely:0,
    timer: 20,
    ShootingTimer:0,

    //Player Schaden zufügen bei Berührung Timer
    damagetimer:10,

    Lebenspunkte:50,


    //Direction Change Timer
    lowerLimit:100,
    upperLimit:300,


    bulletspeed:300,

    maxVel: {x: 300, y: 300},

    animSheet: new ig.AnimationSheet( 'media/KamikazeKlausurAnimated.png', 30, 30 ),

    pos: {x: 0, y:0},
    collides: ig.Entity.COLLIDES.NONE,
    checkAgainst:ig.Entity.TYPE.A,


    init: function(x,y,settings) {
      this.parent(x,y);

      //Anpassen mit Random Generator
      this.velx=this.maxVel.x;//RandomGenerator(this);
      this.vely=this.maxVel.y;//RandomGenerator(this);


      this.addAnim( 'idle', 0.1, [0,1,2] );
  		this.pos.x = this.last.x = x;
  		this.pos.y = this.last.y = y;
    },

    draw: function(){
      this.parent();

    },

    check: function(other){

      if(other instanceof EntityBullet)
      {
        this.Lebenspunkte-=50;
  			other.kill();
      }

      if(other instanceof EntityPlayer)
      {
        if(this.damagetimer<=0)
        {
          other.Motivation-=2;
          ig.game.spawnEntity(EnemyExplosionParticles,this.pos.x,this.pos.y);
          this.Lebenspunkte=-20;
        }
      }
	 },

    handleMovementTrace: function(res){

      if(res.collision.x)
      {
        this.velx= -this.vel.x;
      }

      if(res.collision.y)
      {
        this.vely=-this.vel.y;
      }

      this.parent(res);
    },

    update: function(){

      //Damage Timer on Collision with Player
      this.damagetimer-=1;
      
      var r = Math.atan2(ig.game.player.pos.y-this.pos.y, ig.game.player.pos.x-this.pos.x);
      this.vel.y = Math.sin(r) * this.maxVel.x/2;
      this.vel.x =  Math.cos(r) * this.maxVel.y/2;
      

      if(this.Lebenspunkte<=0)
      {
        ig.game.spawnEntity(EnemyExplosionParticles,this.pos.x,this.pos.y);
        ig.game.TotalScore+=1;
        ig.game.WaveScore+=1;
        this.kill();
      }


     this.parent();
    }

  });
});


function RandomPosGen(min,max)
{
  return Math.floor(Math.random() * (max - min) + min);
}


function BulletSpawner()
{
  var type=RanNumGen(0,3);

  if(type==0)
  {
    return EntityNoteSechs;
  }
}

function RanNumGen(min,max)
{
	return Math.floor(Math.random() * (max - min) + min);
}


function RandomGenerator(object)
{
	var vorzeichen=Math.floor(Math.random() * (2 - 0) + 0);
  var max = object.maxVel.x;
  var min = object.maxVel.x/2;

  if(vorzeichen==1)
		{
			return -(Math.floor(Math.random() * (max - min) + min));
		}
		else
		{
			return Math.floor(Math.random() * (max - min) + min);
		}
}
