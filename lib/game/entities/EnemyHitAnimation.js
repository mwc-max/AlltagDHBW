ig.module(
  'game.entities.EnemyHitAnimation'
)
.requires(
  'impact.entity'
)

.defines(function(){

  EntityEnemyHitAnimation=ig.Entity.extend({

    size:{x:28,y:24},

    _wmIgnore: true,

    //Could be crappy if the performance is bad
    timeset:23,

    animSheet: new ig.AnimationSheet( 'media/EnemyHitAnimation.png', 28, 24 ),
    pos: {x: 0, y:0},

    init: function(x,y,settings) {
      this.parent(x,y);

      this.pos.x=x;
      this.pos.y=y;

      this.vel.y=40;

      //this.pos.x-=25;
      //this.pos.y-=75;

      this.addAnim( 'explode', 0.1, [0,1,2,3] );

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
