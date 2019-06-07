ig.module(
  'game.entities.EnemyExplosionParticles'
)
.requires(
  'impact.entity'
)

.defines(function(){

  EnemyExplosionParticles=ig.Entity.extend({

    size:{x:120,y:82},

    _wmIgnore: true,

    //Could be crappy if the performance is bad
    timeset:40,

    animSheet: new ig.AnimationSheet( 'media/Explosion of Enemy Correct Size.png', 120, 92 ),
    pos: {x: 0, y:0},

    init: function(x,y,settings) {
      this.parent(x,y);

      this.pos.x=x;
      this.pos.y=y;

      this.pos.x-=25;
      this.pos.y-=75;

      this.addAnim( 'explode', 0.05, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] );

      this.currentAnim=this.anims.explode;
    },

    update: function(){

      this.timeset=this.timeset-1;
      //Could be crappy solution if the performance is bad
      if(this.timeset<=0)
      {
        this.kill();
      }

      this.parent();
    }

  });
});
