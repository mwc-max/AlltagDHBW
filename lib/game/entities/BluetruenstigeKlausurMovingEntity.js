ig.module(
  'game.entities.BluetruenstigeKlausurMovingEntity'
)

.requires(
  'impact.entity'
)

.defines(function(){

  EntityBluetruenstigeKlausurMovingEntity=ig.Entity.extend({

    size:{x:90,y:90},

    collides: ig.Entity.COLLIDES.NONE,
    walktimer:50,


    animSheet: new ig.AnimationSheet('media/BlutruenstigeKlausurAnimatedMovingEntity.png', 90, 90),

    init: function(x,y) {
      this.parent(x,y);

      this.addAnim( 'idle', 0.15, [0] );
      this.addAnim( 'walking', 0.15, [0,1,2] );

      this.zIndex = 999;
    },

    update: function(){
      this.parent();

      this.walktimer-=1;

      if(this.walktimer<=0)
      {
        this.walktimer=9999;
      }
    }
  });
});
