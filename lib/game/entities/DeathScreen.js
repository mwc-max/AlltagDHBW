ig.module(
  'game.entities.DeathScreen'
)

.requires(
  'impact.entity',
  'game.entities.BluetruenstigeKlausurMovingEntity'
)

.defines(function(){

  EntityDeathScreen=ig.Entity.extend({

    size:{x:768,y:480},

    Todessound : new ig.Sound( 'media/sounds/exmatrikulation.*' ),

    _wmIgnore: true,

    achievedScore:0,
    walktimer:40,
    Klausur:null,

    collides: ig.Entity.COLLIDES.NONE,

    animSheet: new ig.AnimationSheet( 'media/DyingScreen.png', 768, 480 ),

    init: function(x,y,settings) {
      this.parent(x,y,settings);


      this.addAnim( 'idle', 1, [0] );

  		this.pos.x =ig.game.screen.x;
  		this.pos.y =ig.game.screen.y;

      ig.input.bind( ig.KEY.R, 'reload');
      ig.input.bind(ig.KEY.G, 'sound');

      this.zIndex = 900;


      

      this.Klausur=ig.game.spawnEntity(EntityBluetruenstigeKlausurMovingEntity,70,320);

    },

    update: function(){
      this.parent();
      this.pos.x =ig.game.screen.x;
      this.pos.y =ig.game.screen.y;
      

      this.walktimer-=1;

      console.log(this.walktimer);
      

      if(this.walktimer<=0)
      {
        this.Klausur.vel.x=-70;
        this.Klausur.currentAnim = this.Klausur.anims.walking;
      }

      if(ig.input.pressed('reload'))
      {
        this.kill();
        ig.system.setGame(MainMenu);
      }
    }
  });
});
