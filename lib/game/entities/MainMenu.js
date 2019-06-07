ig.module(
  'game.entities.MainMenu'
)

.requires(
  'impact.entity'
)

.defines(function(){

  EntityMainMenu=ig.Entity.extend({

    size:{x:768,y:480},

    GameMenuMusic: new ig.Sound("media/sounds/GameMenuMusic.*"),

    _wmIgnore: true,

    animSheet: new ig.AnimationSheet( 'media/TitleScreenCorrect.png', 768, 480 ),

    init: function(x,y,settings) {
      this.parent(x,y,settings);

      this.addAnim( 'idle', 0.15, [0,1,2] );
      this.addAnim( 'firstOption', 0.15, [3,4,5] );
      this.addAnim( 'secondOption', 0.15, [6,7,8] );
      this.addAnim( 'thirdOption', 0.15, [9,10,11] );
  		this.pos.x = x;
  		this.pos.y = y;
      ig.input.initMouse();
      ig.input.bind(ig.KEY.MOUSE1, 'leftclick');

      this.GameMenuMusic.play();
      this.GameMenuMusic.loop=true;
    },

    draw: function()
    {
      this.parent();

      /*var canvas=document.getElementById('canvas');
      var context= canvas.getContext("2d");
      
      context.fillStyle = "#F00000";
      context.font = "13px Arial";
      context.beginPath();
      context.rect(630,130,80,80);
      context.fill();
      context.fillStyle = "#000000";
      context.fillText("Level Select", 635, 175);*/
    },

    update: function(){
      this.parent();
      

      var mouseX = ig.input.mouse.x;
      var mouseY = ig.input.mouse.y;


      if(mouseX>173 && mouseX<578 && mouseY>126 && mouseY<212)
      {
        if(ig.input.pressed('leftclick'))
        {
          this.kill();
          this.GameMenuMusic.stop();
          ig.system.setGame(Level1);
        }
        this.currentAnim=this.anims.firstOption;
      }
      else if(mouseX>173 && mouseX<578 && mouseY>251 && mouseY<337)
      {
        if(ig.input.pressed('leftclick'))
        {
          this.kill();
          this.GameMenuMusic.stop();
          ig.system.setGame(EndlessMode);
        }
        this.currentAnim=this.anims.secondOption;
      }
      else if(mouseX>173 && mouseX<578 && mouseY>364 && mouseY<450)
      {
        this.currentAnim=this.anims.thirdOption;
        if(ig.input.pressed('leftclick'))
        {
          this.kill();
          ig.system.setGame(OptionMenu);
        }
      }
      /*else if(mouseX>628 && mouseX<710 && mouseY>130 && mouseY<210)
      {
        if(ig.input.pressed('leftclick'))
        {
          this.kill();
          ig.system.setGame(LevelSelectMenu);
        }
      }*/
      else
      {
        this.currentAnim=this.anims.idle;
      }

    }

  });
});
