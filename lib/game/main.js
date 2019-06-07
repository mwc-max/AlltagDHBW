ig.module(
	'game.main'
)
	.requires(
		'impact.game',
		'impact.font',


		'game.entities.player',


		'game.entities.BluetruenstigeKlausur',
		'game.entities.KamikazeKlausur',
		'game.entities.FallstudieKlausur',
		'game.entities.Bachelorarbeit',


		'game.entities.PickupEnergyDrink',
		'game.entities.MainMenu',
		'game.entities.DeathScreen',
		'game.entities.OptionMenu',
		'game.entities.LevelSelectMenu',
		'game.entities.WinningScreen',


		'game.levels.Level1',
		'game.levels.Level2',
		'game.levels.Level3'

	)
	.defines(function () {

		Level1 = ig.Game.extend({

			BatterieStatus4: new ig.Image('media/Batterie4.png'),
			BatterieStatus3: new ig.Image('media/Batterie3.png'),
			BatterieStatus2: new ig.Image('media/Batterie2.png'),
			BatterieStatus1: new ig.Image('media/Batterie1.png'),
			BatterieStatusPlus: new ig.Image('media/plus.png'),

			SpecialAttackReady: new ig.Image('media/SpecialAttackReady.png'),
			SpecialAttackDue: new ig.Image('media/SpecialAttackDue.png'),


			CurrentSemester: 0,

			Semester1: 7,
			Semester2: 10,

			Semester1Text: "Und so beginnt es ...",
			Semester2Text: "So... die Aufw\u00e4rmrunde ist vorbei!",
			YearEndText: "Nicht schlecht, Kleiner.",
			Gegner: [EntityBluetruenstigeKlausur, EntityFallstudieKlausur],


			WaveScore: 0,
			Counter: 0,
			DrawingTimer: 0,
			DrawingTempText: "",
			DrawingTextPointer: 0,
			drawText: { allowed: false, text: "" },

			timer: new ig.Timer(),
			SpecialStatus: false,
			// Load a font
			font: new ig.Font('media/font.png'),


			init: function () {
				ig.input.bind(ig.KEY.W, 'w');
				ig.input.bind(ig.KEY.S, 's');
				ig.input.bind(ig.KEY.A, 'a');
				ig.input.bind(ig.KEY.D, 'd');
				ig.input.bind(ig.KEY.ESC, 'pause');
				ig.input.bind(ig.KEY.E, 'special');
				ig.input.bind(ig.KEY.F, 'pickup');


				ig.input.bind(ig.KEY.UP_ARROW, 'up');
				ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

				this.loadLevel(LevelLevel1);

				this.CurrentSemester += 1;
				this.timer.set(1);
			},

			update: function () {
				this.parent();

				if (ig.input.pressed('pause')) {
					ig.system.setGame(MainMenu);
				}

				// GAME LOGIC---------------------------------------------------------------------------------------------

				GameLogik(ig, this, 800, 200, 300, 100, Level2, this.Gegner);

				//TodesScreen
				if (this.player.Motivation <= 0) {
					ig.system.setGame(DeathScreen);
				}

				if (ig.input.pressed('pause')) {
					console.log("ESC Pressed");
				}

				//Screen stays focused on Player
				ScreenFocusToPlayer(this, ig, 1000, 0, 550, 0);

				ig.game.sortEntitiesDeferred();
			},

			draw: function () {
				this.parent();


				var canvas = document.getElementById('canvas');
				var context = canvas.getContext("2d");

				switch (ig.game.player.Motivation) {
					case 4:
						this.BatterieStatus4.draw(708, 400);
						break;

					case 3:
						this.BatterieStatus3.draw(708, 400);
						break;

					case 2:
						this.BatterieStatus2.draw(708, 400);
						break;

					case 1:
						this.BatterieStatus1.draw(708, 400);
						break;

					default:
						this.BatterieStatusPlus.draw(690, 380);
						this.BatterieStatus4.draw(708, 400);
						break;
				}


				if (this.drawText.allowed == true) {
					this.DrawingTimer -= 1;

					if (this.DrawingTimer <= 0) {
						this.DrawingTimer = 3;

						if (this.drawText.text.charAt(this.DrawingTextPointer) != "") {
							this.DrawingTempText += this.drawText.text.charAt(this.DrawingTextPointer);
						}
						this.DrawingTextPointer += 1;
					}

					var point = ig.system.width / 2 - (18 * this.drawText.text.length) / 2;
					var RectWidth = 18 * this.drawText.text.length;


					context.fillStyle = "#FFFFFF";
					context.font = "25px Andale Mono";
					context.beginPath();
					//context.globalAlpha = 0.5;
					context.rect(point, 50, RectWidth, 80);
					context.fill();
					context.lineWidth = 5;
					context.strokeStyle = "red";
					context.stroke();
					//context.globalAlpha = 1.0;
					context.fillStyle = "#000000";
					context.textAlign = "center";
					context.fillText(this.DrawingTempText, RectWidth / 2 + point, 100);
				}


				//Draw Special Status Ready
				if (this.SpecialStatus == false) {
					this.SpecialAttackDue.draw(20, 400);
				}
				else {
					this.SpecialAttackReady.draw(20, 400);
				}
			}
		});

		Level2 = ig.Game.extend({

			BatterieStatus4: new ig.Image('media/Batterie4.png'),
			BatterieStatus3: new ig.Image('media/Batterie3.png'),
			BatterieStatus2: new ig.Image('media/Batterie2.png'),
			BatterieStatus1: new ig.Image('media/Batterie1.png'),
			BatterieStatusPlus: new ig.Image('media/plus.png'),

			SpecialAttackReady: new ig.Image('media/SpecialAttackReady.png'),
			SpecialAttackDue: new ig.Image('media/SpecialAttackDue.png'),

			CurrentSemester: 0,

			Semester1: 10,
			Semester2: 20,

			Semester1Text: "Zweites Jahr. Es wird garantiert nicht einfacher",
			Semester2Text: "Die Hälfte ist rum",
			YearEndText: "You finished your first Year. Congratulations",
			Gegner: [EntityBluetruenstigeKlausur, EntityFallstudieKlausur, EntityKamikazeKlausur],


			WaveScore: 0,
			Counter: 0,
			DrawingTimer: 0,
			DrawingTempText: "",
			DrawingTextPointer: 0,
			drawText: { allowed: false, text: "" },

			timer: new ig.Timer(),
			SpecialStatus: false,
			// Load a font
			font: new ig.Font('media/font.png'),


			init: function () {
				ig.input.bind(ig.KEY.W, 'w');
				ig.input.bind(ig.KEY.S, 's');
				ig.input.bind(ig.KEY.A, 'a');
				ig.input.bind(ig.KEY.D, 'd');
				ig.input.bind(ig.KEY.ESC, 'pause');
				ig.input.bind(ig.KEY.E, 'special');
				ig.input.bind(ig.KEY.F, 'pickup');


				ig.input.bind(ig.KEY.UP_ARROW, 'up');
				ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

				this.loadLevel(LevelLevel2);

				this.CurrentSemester += 1;
				this.timer.set(1);
			},

			update: function () {
				this.parent();

				if (ig.input.pressed('pause')) {
					ig.system.setGame(MainMenu);
				}


				GameLogik(ig, this, 1200, 100, 400, 200, Level3, this.Gegner);


				//TodesScreen
				if (this.player.Motivation <= 0) {
					ig.system.setGame(DeathScreen);
				}

				if (ig.input.pressed('pause')) {
					console.log("ESC Pressed");
				}

				//Screen stays focused on Player
				ScreenFocusToPlayer(this, ig, 1500, 0, 800, 0);

				ig.game.sortEntitiesDeferred();
			},

			draw: function () {
				this.parent();// draw the background maps and entities first!

				var canvas = document.getElementById('canvas');
				var context = canvas.getContext("2d");

				switch (ig.game.player.Motivation) {
					case 4:
						this.BatterieStatus4.draw(708, 400);
						break;

					case 3:
						this.BatterieStatus3.draw(708, 400);
						break;

					case 2:
						this.BatterieStatus2.draw(708, 400);
						break;

					case 1:
						this.BatterieStatus1.draw(708, 400);
						break;

					default:
						this.BatterieStatusPlus.draw(690, 380);
						this.BatterieStatus4.draw(708, 400);
						break;
				}


				if (this.drawText.allowed == true) {
					this.DrawingTimer -= 1;

					if (this.DrawingTimer <= 0) {
						this.DrawingTimer = 3;

						if (this.drawText.text.charAt(this.DrawingTextPointer) != "") {
							this.DrawingTempText += this.drawText.text.charAt(this.DrawingTextPointer);
						}
						this.DrawingTextPointer += 1;
					}

					var point = ig.system.width / 2 - (18 * this.drawText.text.length) / 2;
					var RectWidth = 18 * this.drawText.text.length;


					context.fillStyle = "#FFFFFF";
					context.font = "25px Andale Mono";
					context.beginPath();
					//context.globalAlpha = 0.5;
					context.rect(point, 50, RectWidth, 80);
					context.fill();
					context.lineWidth = 5;
					context.strokeStyle = "red";
					context.stroke();
					//context.globalAlpha = 1.0;
					context.fillStyle = "#000000";
					context.textAlign = "center";
					context.fillText(this.DrawingTempText, RectWidth / 2 + point, 100);
				}


				//Draw Special Status Ready
				if (this.SpecialStatus == false) {
					this.SpecialAttackDue.draw(20, 400);
				}
				else {
					this.SpecialAttackReady.draw(20, 400);
				}
			}
		});

		Level3 = ig.Game.extend({

			BatterieStatus4: new ig.Image('media/Batterie4.png'),
			BatterieStatus3: new ig.Image('media/Batterie3.png'),
			BatterieStatus2: new ig.Image('media/Batterie2.png'),
			BatterieStatus1: new ig.Image('media/Batterie1.png'),
			BatterieStatusPlus: new ig.Image('media/plus.png'),

			SpecialAttackReady: new ig.Image('media/SpecialAttackReady.png'),
			SpecialAttackDue: new ig.Image('media/SpecialAttackDue.png'),

			CurrentSemester: 0,

			Semester1: 2,
			Semester2: 1,

			Semester1Text: "Das dritte Jahr. Beeindruckend Student!",
			Semester2Text: "Bekämpfe deine größte Furcht. DIE BACHELORARBEIT",
			YearEndText: "OMG. Du hast den Bachelor. Go and earn money :D",
			Gegner: [EntityBluetruenstigeKlausur, EntityFallstudieKlausur],


			WaveScore: 0,
			Counter: 0,
			DrawingTimer: 0,
			DrawingTempText: "",
			DrawingTextPointer: 0,
			drawText: { allowed: false, text: "" },

			timer: new ig.Timer(),
			SpecialStatus: false,
			// Load a font
			font: new ig.Font('media/font.png'),


			init: function () {
				ig.input.bind(ig.KEY.W, 'w');
				ig.input.bind(ig.KEY.S, 's');
				ig.input.bind(ig.KEY.A, 'a');
				ig.input.bind(ig.KEY.D, 'd');
				ig.input.bind(ig.KEY.ESC, 'pause');
				ig.input.bind(ig.KEY.E, 'special');
				ig.input.bind(ig.KEY.F, 'pickup');


				ig.input.bind(ig.KEY.UP_ARROW, 'up');
				ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

				this.loadLevel(LevelLevel3);

				this.CurrentSemester += 1;
				this.timer.set(1);
			},

			update: function () {
				this.parent();


				if (this.CurrentSemester == 2) {
					GameLogik(ig, this, 1300, 200, 500, 100, MainMenu, [EntityBachelorarbeit]);
				}
				else {
					GameLogikBoss(ig, this, 1300, 200, 500, 100, WinningScreen, this.Gegner);
				}

				if (ig.input.pressed('pause')) {
					ig.system.setGame(MainMenu);
				}


				//TodesScreen
				if (this.player.Motivation <= 0) {
					ig.system.setGame(DeathScreen);
				}

				if (ig.input.pressed('pause')) {
					console.log("ESC Pressed");
				}

				//Screen stays focused on Player
				ScreenFocusToPlayer(this, ig, 1500, 0, 800, 0);

				ig.game.sortEntitiesDeferred();
			},

			draw: function () {
				this.parent();// draw the background maps and entities first!

				var canvas = document.getElementById('canvas');
				var context = canvas.getContext("2d");

				switch (ig.game.player.Motivation) {
					case 4:
						this.BatterieStatus4.draw(708, 400);
						break;

					case 3:
						this.BatterieStatus3.draw(708, 400);
						break;

					case 2:
						this.BatterieStatus2.draw(708, 400);
						break;

					case 1:
						this.BatterieStatus1.draw(708, 400);
						break;

					default:
						this.BatterieStatusPlus.draw(690, 380);
						this.BatterieStatus4.draw(708, 400);
						break;
				}


				if (this.drawText.allowed == true) {
					this.DrawingTimer -= 1;

					if (this.DrawingTimer <= 0) {
						this.DrawingTimer = 3;

						if (this.drawText.text.charAt(this.DrawingTextPointer) != "") {
							this.DrawingTempText += this.drawText.text.charAt(this.DrawingTextPointer);
						}
						this.DrawingTextPointer += 1;
					}

					var point = ig.system.width / 2 - (18 * this.drawText.text.length) / 2;
					var RectWidth = 18 * this.drawText.text.length;


					context.fillStyle = "#FFFFFF";
					context.font = "25px Andale Mono";
					context.beginPath();
					//context.globalAlpha = 0.5;
					context.rect(point, 50, RectWidth, 80);
					context.fill();
					context.lineWidth = 5;
					context.strokeStyle = "red";
					context.stroke();
					//context.globalAlpha = 1.0;
					context.fillStyle = "#000000";
					context.textAlign = "center";
					context.fillText(this.DrawingTempText, RectWidth / 2 + point, 100);
				}


				//Draw Special Status Ready
				if (this.SpecialStatus == false) {
					this.SpecialAttackDue.draw(20, 400);
				}
				else {
					this.SpecialAttackReady.draw(20, 400);
				}
			}
		});

		EndlessMode = ig.Game.extend({

			BatterieStatus4: new ig.Image('media/Batterie4.png'),
			BatterieStatus3: new ig.Image('media/Batterie3.png'),
			BatterieStatus2: new ig.Image('media/Batterie2.png'),
			BatterieStatus1: new ig.Image('media/Batterie1.png'),
			BatterieStatusPlus: new ig.Image('media/plus.png'),

			SpecialAttackReady: new ig.Image('media/SpecialAttackReady.png'),
			SpecialAttackDue: new ig.Image('media/SpecialAttackDue.png'),

			paused: false,
			pausing: false,
			TotalScore: 0,

			WaveScore: 0,
			Counter: 10,
			drawText: { allowed: false, text: "" },
			timer: new ig.Timer(),
			SpecialStatus: false,
			// Load a font
			font: new ig.Font('media/font.png'),
			LevelType: 0,


			init: function () {
				ig.input.bind(ig.KEY.W, 'w');
				ig.input.bind(ig.KEY.S, 's');
				ig.input.bind(ig.KEY.A, 'a');
				ig.input.bind(ig.KEY.D, 'd');
				ig.input.bind(ig.KEY.ESC, 'pause');
				ig.input.bind(ig.KEY.E, 'special');
				ig.input.bind(ig.KEY.F, 'pickup');


				ig.input.bind(ig.KEY.UP_ARROW, 'up');
				ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');


				var leveltype = ESpawNrGen(0.5, 3.4);


				switch (leveltype) {
					case 0: this.loadLevel(LevelLevel1); this.LevelType = leveltype; break;

					case 1: this.loadLevel(LevelLevel2); this.LevelType = leveltype; break;

					case 2: this.loadLevel(LevelLevel3); this.LevelType = leveltype; break;

					default: break;
				}

				//EnemySpawner
				EnemySpawner(ig, 300, 100, 250, 80, [EntityBluetruenstigeKlausur, EntityFallstudieKlausur], this.Counter);


				ig.game.screen.x = this.player.pos.x - ig.system.width / 2;
				ig.game.screen.y = this.player.pos.y - ig.system.height / 2 + 20;

				this.player.shootingspeed = 0.1;
			},

			update: function () {
				this.parent();


				if (ig.input.pressed('pause')) {
					ig.system.setGame(MainMenu);
				}

				//Enemy Wave Generator // GAME LOGIC
				if (this.WaveScore == this.Counter) {
					this.Counter += 10;
					this.timer.set(5);
				}

				if (this.timer.delta() > 0) {
					if (this.WaveScore + 10 == this.Counter) {
						this.timer.set(30);
						this.WaveScore = 0;

						if (this.Counter > 50) {
							EnemySpawner(ig, 300, 100, 250, 80, [EntityBluetruenstigeKlausur, EntityKamikazeKlausur, EntityFallstudieKlausur], this.Counter);

						}
						else {
							EnemySpawner(ig, 300, 100, 250, 80, [EntityBluetruenstigeKlausur, EntityFallstudieKlausur], this.Counter);
						}
					}
				}


				//TodesScreen
				if (this.player.Motivation <= 0) {
					ig.system.setGame(DeathScreen);
				}

				//Screen stays focused on Player
				if (this.LevelType == 0) {
					ScreenFocusToPlayer(this, ig, 1000, 0, 550, 0);
				}
				else if (this.LevelType == 1) {
					ScreenFocusToPlayer(this, ig, 1500, 0, 800, 0);
				}
				else if (this.LevelType == 2) {
					ScreenFocusToPlayer(this, ig, 1500, 0, 800, 0);
				}

				ig.game.sortEntitiesDeferred();
			},

			draw: function () {
				this.parent();// draw the background maps and entities first!

				var canvas = document.getElementById('canvas');
				var context = canvas.getContext("2d");

				switch (ig.game.player.Motivation) {
					case 4:
						this.BatterieStatus4.draw(708, 400);
						break;

					case 3:
						this.BatterieStatus3.draw(708, 400);
						break;

					case 2:
						this.BatterieStatus2.draw(708, 400);
						break;

					case 1:
						this.BatterieStatus1.draw(708, 400);
						break;

					default:
						this.BatterieStatusPlus.draw(690, 380);
						this.BatterieStatus4.draw(708, 400);
						break;
				}

				if (this.paused) {
					this.font.draw(" - Paused - ", ig.system.width / 2, 232, ig.Font.ALIGN.CENTER);

					return;
				}


				//Draw Special Status Ready
				if (this.SpecialStatus == false) {
					this.SpecialAttackDue.draw(20, 400);
				}
				else {
					this.SpecialAttackReady.draw(20, 400);
				}
			}
		});

		MainMenu = ig.Game.extend({
			init: function () {
				ig.game.spawnEntity(EntityMainMenu, 0, 0);

				var x=40;
				for(var i=15;i>0;i--)
				{
					x+=768;
					console.log(x);
				}
			},
			update: function () {
				this.parent();
			},
			draw: function () {
				this.parent();
			}
		});

		OptionMenu = ig.Game.extend({
			init: function () {
				ig.game.spawnEntity(EntityOptionMenu, 0, 0);
			},
			update: function () {
				this.parent();
			},
			draw: function () {
				this.parent();

			}
		});

		LevelSelectMenu = ig.Game.extend({
			init: function () {
				ig.game.spawnEntity(EntityLevelSelectMenu, 0, 0);
			},
			update: function () {
				this.parent();
			},
			draw: function () {
				this.parent();
			}
		});

		DeathScreen = ig.Game.extend({
			init: function () {
				ig.game.spawnEntity(EntityDeathScreen, 0, 0);
			},

			update: function () {
				this.parent();
				ig.game.sortEntitiesDeferred();
			},

			draw: function () {
				this.parent();
			}

		});

		WinningScreen = ig.Game.extend({
			init: function () {
				ig.game.spawnEntity(EntityWinningScreen, 0, 0);
			},

			update: function () {
				this.parent();
				ig.game.sortEntitiesDeferred();
			},

			draw: function () {
				this.parent();
			}
		});


		/*if (ig.ua.mobile) {
			ig.Sound.enabled = false;
		}*/

		ig.Sound.enabled = true;

		ig.main('#canvas', MainMenu, 60, 768, 480, 1);
	});





function EnemySpawner(ig, upxlim, lowxlim, upylim, lowylim, type, amount) {
	var length = type.length;

	console.log(length);


	for (var i = amount; i > 0; i--) {
		ig.game.spawnEntity(type[ESpawNrGen(0, length)], ESpawNrGen(lowxlim, upxlim), ESpawNrGen(lowylim, upylim));
	}
	return;
}

function EntitySpawner(ig, lwLimX, upLimX, lwLimY, upLimY, amount, type) {
	for (var i = amount; i > 0; i--) {
		ig.game.spawnEntity(type, ESpawNrGen(lwLimX, upLimX), ESpawNrGen(lwLimY, lwLimY));
	}
	return;
}

function ESpawNrGen(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function ScreenFocusToPlayer(game, ig, upxlim, lowxlim, upylim, lowylim) {
	if ((game.player.pos.x - ig.system.width / 2) > lowxlim && (game.player.pos.x + ig.system.width / 2) < upxlim) {
		ig.game.screen.x = game.player.pos.x - ig.system.width / 2;
	}
	if ((game.player.pos.y - ig.system.height / 2) > lowylim && (game.player.pos.y + ig.system.height / 2) < upylim) {
		ig.game.screen.y = game.player.pos.y - ig.system.height / 2;
	}
}

function GameLogik(ig, game, upxlim, lowxlim, upylim, lowylim, Level, Gegner) {
	if (game.CurrentSemester == 1) {
		if (game.Counter == 0 && game.timer.delta() > 0) {
			game.timer.set(5);
			game.drawText.allowed = true;
			game.drawText.text = game.Semester1Text;
			game.Counter = game.Semester1;
		}
		else if (game.Counter == game.Semester1 && game.timer.delta() > 0) {
			game.drawText.allowed = false;
			game.DrawingTimer = 0;
			game.DrawingTempText = "";
			game.DrawingTextPointer = 0;
			EnemySpawner(ig, upxlim, lowxlim, upylim, lowylim, Gegner, game.Counter);
			game.CurrentSemester += 1;
		}
	}

	if (game.CurrentSemester == 2) {

		if (game.WaveScore == game.Semester1 && game.timer.delta() > 0) {
			game.timer.set(5);
			game.player.Motivation += 2;
			game.drawText.allowed = true;
			game.drawText.text = game.Semester2Text;
			game.Counter = game.Semester2;
			game.WaveScore += 1;
		}
		else if (game.Counter == game.Semester2 && game.timer.delta() > 0) {
			game.drawText.allowed = false;
			game.DrawingTimer = 0;
			game.DrawingTempText = "";
			game.DrawingTextPointer = 0;
			EnemySpawner(ig, upxlim, lowxlim, upylim, lowylim, Gegner, game.Counter);
			game.CurrentSemester += 1;
			game.WaveScore = 0;
		}
	}

	if (game.CurrentSemester == 3) {

		if (game.WaveScore == game.Semester2 && game.timer.delta() > 0) {
			game.timer.set(5);
			game.drawText.allowed = true;
			game.drawText.text = game.YearEndText;
			game.WaveScore = 0;
			game.Counter += 1;
		}
		else if (game.Counter == game.Semester2 + 1 && game.timer.delta() > 0) {
			ig.system.setGame(Level);
		}
	}
}

function GameLogikBoss(ig, game, upxlim, lowxlim, upylim, lowylim, Level, Gegner) {
	if (game.CurrentSemester == 1) {
		if (game.Counter == 0 && game.timer.delta() > 0) {
			game.timer.set(5);
			game.drawText.allowed = true;
			game.drawText.text = game.Semester1Text;
			game.Counter = game.Semester1;
		}
		else if (game.Counter == game.Semester1 && game.timer.delta() > 0) {
			game.drawText.allowed = false;
			game.DrawingTimer = 0;
			game.DrawingTempText = "";
			game.DrawingTextPointer = 0;
			EnemySpawner(ig, upxlim, lowxlim, upylim, lowylim, Gegner, game.Counter);
			game.CurrentSemester += 1;
		}
	}

	if (game.CurrentSemester == 2) {

		if (game.WaveScore == game.Semester1 && game.timer.delta() > 0) {
			game.timer.set(5);
			game.player.Motivation += 2;
			game.drawText.allowed = true;
			game.drawText.text = game.Semester2Text;
			game.Counter = game.Semester2;
			game.WaveScore += 1;
		}
		else if (game.Counter == game.Semester2 && game.timer.delta() > 0) {
			game.drawText.allowed = false;
			game.DrawingTimer = 0;
			game.DrawingTempText = "";
			game.DrawingTextPointer = 0;
			EnemySpawner(ig, upxlim, lowxlim, upylim, lowylim, Gegner, game.Counter);
			game.CurrentSemester += 1;
			game.WaveScore = 0;
		}
	}

	if (game.CurrentSemester == 3) {

		console.log(game.WaveScore);


		if (game.WaveScore >= 5000 && game.timer.delta() > 0) {
			game.timer.set(5);
			game.drawText.allowed = true;
			game.drawText.text = game.YearEndText;
			game.WaveScore = 0;
			game.Counter = 999;
			game.player.Motivation=50;
		}
		else if (game.Counter == 999 && game.timer.delta() > 0) {
			ig.system.setGame(Level);
		}
	}
}