ig.module(
  'game.entities.bullet'

)

.requires(
  'impact.entity',
  'game.entities.EntityBulletParticles',
  'impact.entity-pool'
)

.defines(function(){

  EntityBullet=ig.Entity.extend({

    size:{x:20,y:18},

    lifetime: 240,
    _wmIgnore: true,
    sizex:0,
    sizey:0,
    velx:0,
    vely:0,

    collides: ig.Entity.COLLIDES.LIGHT,
    type: ig.Entity.TYPE.A,

    maxVel: {x: 1000, y: 1000},

    animSheet: new ig.AnimationSheet( 'media/PaperballCorrectSize.png', 20, 18 ),
    pos: {x: 0, y:0},




    init: function(x,y,settings) {
      this.parent(x,y);

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
  ig.EntityPool.enableFor( EntityBullet );
});
