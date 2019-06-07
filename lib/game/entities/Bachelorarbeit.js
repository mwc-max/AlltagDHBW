ig.module(
  'game.entities.Bachelorarbeit'
)

  .requires(
    'impact.entity',
    'game.entities.bullet',
    'game.entities.NoteSechs',
    'game.entities.EntityBulletEnemy',
    'game.entities.EnemyExplosionParticles',
    'game.entities.EnemyHitAnimation',
    'game.entities.BluetruenstigeKlausur',
		'game.entities.KamikazeKlausur',
		'game.entities.FallstudieKlausur',
    'impact.entity-pool',
    'game.entities.player'
  )

  .defines(function () {

    EntityBachelorarbeit = ig.Entity.extend({

      CrumblingPaper : new ig.Sound( 'media/sounds/crumbling paper.*' ),

      Leben: 10,
      _wmIgnore: true,
      size: { x: 88, y: 69 },
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

      Lebenspunkte: 1000,

      maxVel: { x: 80, y: 80 },

      animSheet: new ig.AnimationSheet('media/BachelorarbeitAnimated.png', 88, 69),

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
          ig.game.spawnEntity(EntityEnemyHitAnimation, this.pos.x + 30, this.pos.y + 30);
          this.CrumblingPaper.play();
          other.kill();
        }

        if (other instanceof EntityPlayer) {
          if (this.damagetimer <= 0) {
            other.Lebenspunkte -= 10;
            this.damagetimer = 10;
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


        //Shoot towards Player
        this.ShootingTimer -= 1;
        if (this.ShootingTimer <= 0) {

          if(this.pos.x<1200&&this.pos.x>200&&this.pos.y<500&&this.pos.y>150)
          {
            //EnemySpawner(ig, this.pos.x, this.pos.x, this.pos.y, this.pos.x, [EntityBluetruenstigeKlausur, EntityFallstudieKlausur, EntityKamikazeKlausur], ESpawNrGen(1,4));
            EnemySpawnerBA(ig,this, [EntityBluetruenstigeKlausur, EntityFallstudieKlausur, EntityKamikazeKlausur], 3);
          }

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
          ig.game.spawnEntity(EnemyExplosionParticles, this.pos.x, this.pos.y + 50);
          ig.game.spawnEntity(EnemyExplosionParticles, this.pos.x + 20, this.pos.y - 10);
          ig.game.spawnEntity(EnemyExplosionParticles, this.pos.x + 40, this.pos.y + 20);
          ig.game.spawnEntity(EnemyExplosionParticles, this.pos.x + 50, this.pos.y - 10);
          ig.game.spawnEntity(EnemyExplosionParticles, this.pos.x - 30, this.pos.y + 20);
          ig.game.WaveScore += 5000;
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


function EnemySpawner(ig, upxlim, lowxlim, upylim, lowylim, type, amount) {
  var length = type.length;

  for (var i = amount; i > 0; i--) {
    ig.game.spawnEntity(type[ESpawNrGen(0, length)], ESpawNrGen(lowxlim, upxlim), ESpawNrGen(lowylim, upylim));
  }
  return;
}

function EnemySpawnerBA(ig,game, type, amount) {
  var length = type.length;

  for (var i = amount; i > 0; i--) {
    ig.game.spawnEntity(type[ESpawNrGen(0, length)],game.pos.x, game.pos.y);
  }
  return;
}

function ESpawNrGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}