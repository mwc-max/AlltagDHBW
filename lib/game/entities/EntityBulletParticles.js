ig.module(
  'game.entities.EntityBulletParticles'
)
.requires(
  'impact.entity'
)

.defines(function(){

  EntityBulletParticles=ig.Entity.extend({

    size:{x:24,y:24},

    _wmIgnore: true,

    //Could be crappy if the performance is bad
    timeset:18,

    animSheet: new ig.AnimationSheet( 'media/NewBulletParticles.png', 24, 24 ),
    pos: {x: 0, y:0},

    init: function(x,y,settings) {
      this.parent(x,y);

      this.pos.x=x;
      this.pos.y=y;

      this.addAnim( 'explode', 0.04, [0,1,2,3,4,5,6,7] );

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
