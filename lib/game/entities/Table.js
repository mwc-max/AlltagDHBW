ig.module(
  'game.entities.Table'
)

.requires(
  'impact.entity',
  'game.entities.bullet',
  'game.entities.EntityBulletEnemy'
)

.defines(function(){

  EntityTable=ig.Entity.extend({

    size:{x:42,y:74},

    collides: ig.Entity.COLLIDES.NONE,
    checkAgainst:ig.Entity.TYPE.A,


    animSheet: new ig.AnimationSheet( 'media/TableEntity.png', 42, 74 ),

    init: function(x,y,settings) {
      this.parent(x,y,settings);


      this.addAnim( 'idle', 5, [0] );

    },

    update: function(){
      this.parent();


    },


    draw: function(){
      this.parent();


    }

  });
});
