ig.module(
  'game.entities.Player'
)

.requires(
  'impact.entity'
)

.defines(function(){

  EntityPlayer=ig.Entity.extend({

    size:{x:79,y:78},

    speed:200,

    collides: ig.Entity.COLLIDES.NONE,
    checkAgainst:ig.Entity.TYPE.A,

    animSheet: new ig.AnimationSheet( 'media/boat.png', 79, 78 ),

    init: function(x,y,settings) {
      this.parent(x,y,settings);

      this.zIndex = 990;

      ig.game.player = this;

      this.addAnim( 'idle', 1, [0] );

      this.maxVel.x=this.speed*2;
  		this.maxVel.y=this.speed*2;
    },

    update: function(){
      this.parent();

      MovementControls(ig,this,this.speed);




    },

    /*check: function(other)
	  {
      if(other instanceof  EntityBaer1)
      {
        ig.game.Score+=1;
        other.kill();
      }
		this.parent(other);
  },*/

    draw: function(){
      this.parent();


    }

  });
});
