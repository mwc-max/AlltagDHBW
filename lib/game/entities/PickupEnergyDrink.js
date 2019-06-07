ig.module(
  'game.entities.PickupEnergyDrink'
)
.requires(
  'impact.entity'
)

.defines(function(){

  EntityPickupEnergyDrink=ig.Entity.extend({

    size:{x:20,y:50},

    //_wmIgnore: true,

    //Could be crappy if the performance is bad
    type:ig.Entity.TYPE.A,

    animSheet: new ig.AnimationSheet( 'media/monster-energy.png', 20, 50 ),

    init: function(x,y,settings) {
      this.parent(x,y);

      this.addAnim( 'idle', 1, [0] );

    },

    update: function(){

      this.parent();
    }

  });
});
