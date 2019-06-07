ig.module(
  'game.entities.NoteSechs'

)

.requires(
  'impact.entity',
  'game.entities.bullet'
)

.defines(function(){

    EntityNoteSechs=ig.Entity.extend({

      size:{x:18,y:26},

      lifetime: 240,
      _wmIgnore: true,
      sizex:0,
      sizey:0,
      velx:0,
      vely:0,

      collides: ig.Entity.COLLIDES.LIGHT,
      type: ig.Entity.TYPE.A,

      maxVel: {x: 1000, y: 1000},

      animSheet: new ig.AnimationSheet( 'media/NoteSechs.png', 18, 26 ),
      pos: {x: 0, y:0},




      init: function(x,y,settings) {
        this.parent(x,y,settings);

        this.velx=settings.velx;
        this.vely=settings.vely;

        this.id = ++ig.Entity._lastId;

        this.addAnim( 'idle', 1, [0] );
    		this.pos.x = this.last.x = x;
    		this.pos.y = this.last.y = y;
      },

      draw: function(){

        this.parent();
      },

      handleMovementTrace: function(res)
      {
        if(res.collision.x)
        {
          ig.game.spawnEntity(EntityBulletParticles,this.pos.x,this.pos.y);
          this.kill();
        }
        if(res.collision.y)
        {
          ig.game.spawnEntity(EntityBulletParticles,this.pos.x,this.pos.y);
          this.kill();
        }
        this.parent(res);
      },

      update: function(){

        this.vel.x=this.velx;
        this.vel.y=this.vely;

        this.parent();
      }
  });
});
