ig.module(
  'game.entities.Scholle1'
)

.requires(
  'impact.entity'
)

.defines(function(){

  EntityScholle1=ig.Entity.extend({

    size:{x:100,y:100},

    collides: ig.Entity.COLLIDES.NONE,


    collected:false,

    animSheet: new ig.AnimationSheet( 'media/scholle1.png', 100, 100 ),

    init: function(x,y,settings) {
      this.parent(x,y,settings);

      this.vel.x=settings.velx;

      //Delete All Entites on the MAP

      this.addAnim( 'idle', 1, [0] );

    },

    handleMovementTrace: function(res)
    {
      if(res.collision.x)
      {
        this.kill();
      }
      if(res.collision.y)
      {
        this.kill();
      }
      this.parent(res);
    },

    update: function(){
      this.parent();


    },

    draw: function(){
      this.parent();


    }

  });
});
