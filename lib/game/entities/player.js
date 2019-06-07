ig.module(
  'game.entities.player'
)

  .requires(
    'impact.entity',
    'game.entities.bullet',
    'game.entities.NoteSechs',
    'game.entities.PickupEnergyDrink',
    'game.entities.PickupKaffee'
  )

  .defines(function () {

    EntityPlayer = ig.Entity.extend({

      Getroffenwerden : new ig.Sound( 'media/sounds/PlayerHit.*' ),
      ThrowingSound : new ig.Sound( 'media/sounds/ThrowingSound.*' ),

      size: { x: 28, y: 40 },
      currentPossiblePickup: null,

      EnergyDrinkPickupPossible: false,
      EnergyDrinkPickedUp: false,

      KaffeePickupPossible: false,
      KaffeePickedUp: false,

      Motivation:4,

      speed: 160,
      bulletspeed: 600,

      shootingspeed:0.25,

      collides: ig.Entity.COLLIDES.LIGHT,
      checkAgainst: ig.Entity.TYPE.A,
      type: ig.Entity.TYPE.A,


      timer: new ig.Timer(),
      timerSpecial: 0,
      KaffeeTimerPickup:99999,
      EnergyTimerPickup:99999,

      animSheet: new ig.AnimationSheet('media/oliver.png', 28, 40),

      init: function (x, y, settings) {
        this.parent(x, y, settings);

        this.zIndex = 990;

        ig.game.player = this;

        this.addAnim('idle', 0.1, [0]);
        this.addAnim('walkdownward', 0.05, [0, 1, 2, 3, 4, 5]);
        this.addAnim('walkupward', 0.05, [6, 7, 8, 9, 10, 11]);
        this.addAnim('walkleft', 0.05, [27, 26, 25, 24, 23, 22, 21, 20]);
        this.addAnim('walkright', 0.05, [12, 13, 14, 15, 16, 17, 18, 19]);

        this.addAnim('shootdownward', 1, [0]);
        this.addAnim('shootupward', 1, [6]);
        this.addAnim('shootleft', 1, [23]);
        this.addAnim('shootright', 1, [12]);


        this.timer.set(this.shootingspeed);
        this.timerSpecial = 200;


        ig.game.screen.x = this.pos.x - ig.system.width / 2;
        ig.game.screen.y = this.pos.y - ig.system.height / 2;


        this.maxVel.x = this.speed * 2;
        this.maxVel.y = this.speed * 2;
      },

      check: function (other) {
        this.EnergyDrinkPickupPossible = false;

        if (other instanceof EntityNoteSechs) {
          ig.game.spawnEntity(EntityBulletParticles, this.pos.x, this.pos.y);
          this.Motivation -= 1;
          this.Getroffenwerden.play();
          other.kill();
        }

        if (other instanceof EntityPickupEnergyDrink) {
          this.currentPossiblePickup = other;
          this.EnergyDrinkPickupPossible = true;
          if (this.EnergyDrinkPickedUp == true) {
            other.kill();
          }
        }

        if (other instanceof EntityPickupKaffee) {
          this.currentPossiblePickup = other;
          this.KaffeePickupPossible = true;
          if (this.KaffeePickedUp == true) {
            other.kill();
          }
        }


        this.parent(other);
      },

      update: function () {
        this.parent();

        //Check if the Death Screen is active
        if (ig.game.dead != 1) {
          //Movement
          MovementControls(ig, this, this.speed);

          //Walking Sound Control


          //Shooting Controls
          if (this.timer.delta() >= 0) {
            ShootingControls(ig, EntityBullet, this, this.bulletspeed);
            this.timer.set(this.shootingspeed);
          }


          //Special Attack
          this.timerSpecial -= 1;
          if (this.timerSpecial <= 0) {
            ig.game.SpecialStatus = true;
            if (ig.input.pressed('special')) {
              StarShot(ig, this, EntityBullet, 600);
              ig.game.SpecialStatus = false;
              this.timerSpecial = 200;
            }
          }
          

          this.EnergyTimerPickup-=1;
          if(this.EnergyTimerPickup<=0)
          {
            this.EnergyTimerPickup=999999;
            this.speed/=2;
          }

          this.KaffeeTimerPickup-=1;
          if(this.KaffeeTimerPickup<=0)
          {
            this.KaffeeTimerPickup=999999;
            this.shootingspeed = 0.25;
          }



          //PickupActivationControls
          if (ig.input.pressed('pickup')) 
          {
            if (this.currentPossiblePickup instanceof EntityPickupEnergyDrink) 
            {
              this.speed *= 2;
              ig.game.player.Motivation+=2;
              this.EnergyTimerPickup=400;
              this.EnergyDrinkPickedUp = true;
            }

            if(this.currentPossiblePickup instanceof EntityPickupKaffee)
            {
              this.shootingspeed = 0.1;
              this.KaffeeTimerPickup=200;
              ig.game.player.Motivation+=1;
              this.KaffeePickedUp = true;
            }
          }

        }
      }
    });
  });







function MovementControls(ig, game, speed) {

  if (ig.input.state('w')) {
    if (ig.input.state('w') && ig.input.state('a')) {
      game.vel.y = -speed;
      game.vel.x = -speed;
      game.currentAnim = game.anims.walkupward;
    }
    else if (ig.input.state('w') && ig.input.state('d')) {
      game.vel.y = -speed;
      game.vel.x = speed;
      game.currentAnim = game.anims.walkupward;
    }
    else if (ig.input.state('w')) {
      game.vel.y = -speed;
      game.vel.x = 0;
      game.currentAnim = game.anims.walkupward;
    }
  }

  else if (ig.input.state('s')) {
    if (ig.input.state('s') && ig.input.state('a')) {
      game.vel.y = speed;
      game.vel.x = -speed;
      game.currentAnim = game.anims.walkdownward;
    }
    else if (ig.input.state('s') && ig.input.state('d')) {
      game.vel.y = speed;
      game.vel.x = speed;
      game.currentAnim = game.anims.walkdownward;
    }
    else if (ig.input.state('s')) {
      game.vel.y = speed;
      game.vel.x = 0;
      game.currentAnim = game.anims.walkdownward;
    }
  }
  else if (ig.input.state('a')) {
    if (ig.input.state('a') && ig.input.state('w')) {
      game.vel.y = -speed;
      game.vel.x = -speed;
      game.currentAnim = game.anims.walkleft;
    }
    else if (ig.input.state('a') && ig.input.state('s')) {
      game.vel.y = speed;
      game.vel.x = -speed;
      game.currentAnim = game.anims.walkleft;
    }
    else if (ig.input.state('a')) {
      game.vel.x = -speed;
      game.vel.y = 0;
      game.currentAnim = game.anims.walkleft;
    }
  }

  else if (ig.input.state('d')) {
    if (ig.input.state('d') && ig.input.state('w')) {
      game.vel.y = -speed;
      game.vel.x = speed;
      game.currentAnim = game.anims.walkright;
    }
    else if (ig.input.state('d') && ig.input.state('s')) {
      game.vel.y = speed;
      game.vel.x = speed;
      game.currentAnim = game.anims.walkright;
    }
    else if (ig.input.state('d')) {
      game.vel.x = speed;
      game.vel.y = 0;
      game.currentAnim = game.anims.walkright;
    }
  }
  else {
    game.vel.x = 0;
    game.vel.y = 0;
    if (game.currentAnim == game.anims.walkright || game.currentAnim == game.anims.walkleft || game.currentAnim == game.anims.walkupward || game.currentAnim == game.anims.walkdownward) {
      game.currentAnim = game.anims.idle;
    }
  }
}

function ShootingControls(ig, entityBullet, game, speed) {
  if (ig.input.state('up')) {
    if (ig.input.state('up') && ig.input.state('left')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: -speed, velx: -speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('up') && ig.input.state('right')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: -speed, velx: speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('up')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: -speed, velx: 0 });
      game.ThrowingSound.play();
    }
  }

  else if (ig.input.state('down')) {
    if (ig.input.state('down') && ig.input.state('left')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: -speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('down') && ig.input.state('right')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('down')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: 0 });
      game.ThrowingSound.play();
    }
  }

  else if (ig.input.state('left')) {
    if (ig.input.state('left') && ig.input.state('up')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: -speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('left') && ig.input.state('down')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('left')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: 0, velx: -speed });
      game.ThrowingSound.play();
    }
  }

  else if (ig.input.state('right')) {
    if (ig.input.state('right') && ig.input.state('up')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: -speed, velx: speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('right') && ig.input.state('down')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: speed });
      game.ThrowingSound.play();
    }
    else if (ig.input.state('right')) {
      ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: 0, velx: speed });
      game.ThrowingSound.play();
    }
  }
}

function StarShot(ig, game, entityBullet, speed) {

  for (var i = 5; i > 0; i--) {
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: -speed, velx: -speed });
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: speed });
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: -speed });
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: -speed, velx: speed });
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: 0, velx: -speed });
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: 0, velx: speed });
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: -speed, velx: 0 });
    ig.game.spawnEntity(entityBullet, game.pos.x, game.pos.y, { vely: speed, velx: 0 });
  }
}

function ESpawNrGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
