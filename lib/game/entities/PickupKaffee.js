ig.module(
  'game.entities.PickupKaffee'
)
  .requires(
    'impact.entity'
  )

  .defines(function () {

    EntityPickupKaffee = ig.Entity.extend({

      size: { x: 25, y: 25 },

      //_wmIgnore: true,

      //Could be crappy if the performance is bad
      type: ig.Entity.TYPE.A,

      animSheet: new ig.AnimationSheet('media/kaffee.png', 25, 25),

      init: function (x, y, settings) {
        this.parent(x, y);

        this.addAnim('idle', 1, [0]);

      },

      update: function () {

        this.parent();
      }
    });
  });
