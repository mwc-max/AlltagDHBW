ig.module(
  'game.entities.FallstudieKlausur'
)

  .requires(
    'impact.entity',
    'game.entities.bullet',
    'game.entities.NoteSechs',
    'game.entities.EntityBulletEnemy',
    'game.entities.EnemyExplosionParticles',
    'game.entities.EnemyHitAnimation',
    'impact.entity-pool',
    'game.entities.player'
  )

  .defines(function () {

    EntityFallstudieKlausur = ig.Entity.extend({

      CrumblingPaper : new ig.Sound( 'media/sounds/crumbling paper.*' ),

      Leben: 10,
      _wmIgnore: true,
      size: { x: 30, y: 30 },
      sizex: 0,
      sizey: 0,
      velx: 0,
      vely: 0,
      timer: 0,
      ShootingTimer: 0,

      //Player Schaden zufügen bei Berührung Timer
      damagetimer: 10,


      //Direction Change Timer
      lowerLimit: 100,
      upperLimit: 300,

      bulletspeed: 300,

      Lebenspunkte: 100,

      maxVel: { x: 250, y: 250 },

      animSheet: new ig.AnimationSheet('media/FallstudieKlausurAnimated.png', 30, 30),

      pos: { x: 0, y: 0 },
      collides: ig.Entity.COLLIDES.NONE,
      checkAgainst: ig.Entity.TYPE.A,


      init: function (x, y, settings) {
        this.parent(x, y);

        //Anpassen mit Random Generator
        this.velx = RandomGenerator(this);
        this.vely = RandomGenerator(this);



        this.timer = RandomPosGen(200, 800);
        this.ShootingTimer = RandomPosGen(50, 200);

        this.addAnim('idle', 0.1, [0, 1, 2]);
        this.pos.x = this.last.x = x;
        this.pos.y = this.last.y = y;
      },

      draw: function () {

        this.parent();
      },

      check: function (other) {
        if (other instanceof EntityBullet) {
          this.Lebenspunkte -= 50;
          ig.game.spawnEntity(EntityEnemyHitAnimation, this.pos.x, this.pos.y);
          this.CrumblingPaper.play();
          other.kill();
        }

        if (other instanceof EntityPlayer) {
          if (this.damagetimer <= 0) {
            ig.game.player.Motivation-=1;
            this.damagetimer = 50;
          }
        }
      },

      handleMovementTrace: function (res) {

        if (res.collision.x) {
          this.velx = -this.vel.x;
        }

        if (res.collision.y) {
          this.vely = -this.vel.y;
        }

        this.parent(res);
      },

      update: function () {

        //Damage Timer on Collision with Player
        this.damagetimer -= 1;


        //Shoot towards Player
        this.ShootingTimer -= 1;
        if (this.ShootingTimer <= 0) {
          var r = Math.atan2(ig.game.player.pos.y - this.pos.y, ig.game.player.pos.x - this.pos.x);
          var vel2y = Math.sin(r) * this.bulletspeed; //.desiredVel is just the velocity I would want if we were going in a straight line directly out of the right of the player. I just put it as a property of the entity since I refer to it in multiple locations
          var vel2x = Math.cos(r) * this.bulletspeed;

          //Small Change instead of EntityBulletEnemy now EntityNoteSechs
          ig.game.spawnEntity(EntityNoteSechs, this.pos.x, this.pos.y, { velx: vel2x, vely: vel2y });


          this.ShootingTimer = RandomPosGen(50, 200);
        }

        //Change Direction of walking
        this.timer -= 1;
        if (this.timer <= 0) {
          this.velx = RandomGenerator(this);
          this.vely = RandomGenerator(this);
          this.timer = RandomPosGen(this.lowerLimit, this.upperLimit);
        }


        if (this.Lebenspunkte <= 0) {
          ig.game.spawnEntity(EnemyExplosionParticles, this.pos.x, this.pos.y);
          ig.game.TotalScore += 1;
          ig.game.WaveScore += 1;
          this.kill();
        }

        this.vel.x = this.velx;
        this.vel.y = this.vely;


        this.parent();
      }

    });
  });


function RandomPosGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function BulletSpawner() {
  var type = RanNumGen(0, 3);

  if (type == 0) {
    return EntityNoteSechs;
  }
}

function RanNumGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function RandomGenerator(object) {
  var vorzeichen = Math.floor(Math.random() * (2 - 0) + 0);
  var max = object.maxVel.x;
  var min = object.maxVel.x / 2;

  if (vorzeichen == 1) {
    return -(Math.floor(Math.random() * (max - min) + min));
  }
  else {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
