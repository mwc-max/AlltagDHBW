ig.module(
  'game.entities.OptionMenu'
)

.requires(
  'impact.entity'
)

.defines(function(){

  EntityOptionMenu=ig.Entity.extend({

    size:{x:768,y:480},

    _wmIgnore: true,

    animSheet: new ig.AnimationSheet( 'media/Credits.png', 768, 480 ),

    init: function(x,y,settings) {
      this.parent(x,y,settings);

      this.addAnim( 'idle', 1, [0] );

  		this.pos.x = x;
  		this.pos.y = y;
      ig.input.initMouse();
      ig.input.bind(ig.KEY.MOUSE1, 'leftclick');
      ig.input.bind(ig.KEY.ESC, 'esc');
    },

    draw: function(){

      this.parent();
    },

    update: function(){
      this.parent();



      var mouseX = ig.input.mouse.x;
      var mouseY = ig.input.mouse.y;

      if(ig.input.pressed('esc'))
      {
        this.kill();
        ig.system.setGame(MainMenu);
      }

      if(ig.input.pressed('leftclick'))
      {
        this.kill();
        ig.system.setGame(MainMenu);
      }

    }

  });
});
