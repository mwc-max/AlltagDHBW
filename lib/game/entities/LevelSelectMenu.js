ig.module(
  'game.entities.LevelSelectMenu'
)

.requires(
  'impact.entity'
)

.defines(function(){

  EntityLevelSelectMenu=ig.Entity.extend({

    size:{x:768,y:480},

    _wmIgnore: true,


    init: function(x,y,settings) {
      this.parent(x,y,settings);


  		this.pos.x = x;
  		this.pos.y = y;
      ig.input.initMouse();
      ig.input.bind(ig.KEY.MOUSE1, 'leftclick');

      ig.input.bind( ig.KEY._1, 'Level1');
		  ig.input.bind( ig.KEY._2, 'Level2');
		  ig.input.bind( ig.KEY._3, 'Level3');
    },

    draw: function(){
      this.parent();

      var canvas=document.getElementById('canvas');
			var context= canvas.getContext("2d");
      context.fillStyle = "#FFFFFF";
      context.font = "25px Arial";
      context.beginPath();
      context.fillText("Press   1 for Level 1    2 for Level 2    3 for Level 3", 100, 410);
      
    },

    update: function(){
      this.parent();
      

      var mouseX = ig.input.mouse.x;
      var mouseY = ig.input.mouse.y;
      
      if(ig.input.pressed('Level1'))
      {
        this.kill();
        ig.system.setGame(Level1);
      }
      else if(ig.input.pressed('Level2'))
      {
        this.kill();
        ig.system.setGame(Level2);
      }
      else if(ig.input.pressed('Level3'))
      {
        this.kill();
        ig.system.setGame(Level3);
      }

    }

  });
});
