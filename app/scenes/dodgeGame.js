import musicBack from "../assets/backMusic(2).mp3";
import gameOver from "../assets/gameOver.mp3";
import ooGnome from "../assets/oo.mp3";

/* Helper, Services */
import PlayerMover from "../help-scripts/playerMovement";
import CollisionsHelper from "../help-scripts/collisionsHelper";
import spriteSheethelper from "../help-scripts/loadSpriteSheets";
import imageHelper from "../help-scripts/loadImages";
import animationsHelper from "../help-scripts/animationsHelper";
import auth from "../services/auth-service.js";

const style2 = {
  font: "bold 40px Arial",
  fill: "#fff",
  boundsAlignH: "center",
  boundsAlignV: "middle"
};

const text0 = { x: 970, y: 16 };
const text1 = { x: 1010, y: 66 };
const text2 = { x: 1010, y: 116 };
const text3 = { x: 1010, y: 166 };
const text4 = { x: 1010, y: 216 };
const text5 = { x: 1010, y: 266 };
const text6 = { x: 1010, y: 316 };
const text7 = { x: 1010, y: 366 };
const text8 = { x: 1010, y: 416 };

export default class DodgeGame extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });
    //Variables
    this.player = null;
    this.platforms = null;
    this.cursors = null;
    this.scoreText = null;
    this.spikes = null;
    this.powerUps = null;
    this.scoreText = null;
    this.gameOverText = null;
    this.replayButton = null;
    this.music = null;
    this.gameOverMusic = null;
    this.ooGnome = null;
    this.textEntry = null;

    //Variables with default values
    this.score = 0;
    this.timer = 0;
    this.gameOver = false;
    this.jumped = false;
    this.crouched = false;
    this.spikeMax = 0.4;
    this.listener = 0;

    //this.player vars
    this.playerHeight = 225;

    //Change walking speed
    this.walkSpeed = 500;
    this.croutchSpeed = this.walkSpeed - 100;

    //Helpers
    this.playerMovementHelper = null;
    this.collisionHelper = null;
    this.spriteSheethelper = new spriteSheethelper();
    this.imageHelper = new imageHelper();
    this.animationsHelper = new animationsHelper();
  }

  preload() {
    this.spriteSheethelper.loadSpriteSheets(this.load);
    this.imageHelper.loadImages(this.load);

    //Audio
    this.load.audio("musicBack", musicBack);
    this.load.audio("gameOver", gameOver);
    this.load.audio("ooGnome", ooGnome);
  }

  spikeCollision() {
    //On Collision with enemy
    if (this.player.body.touching.up) {
      //Stop BG this.music and play game over this.music
      this.music.pause();
      this.gameOverMusic.play();

      let score = Math.floor(this.timer / 50);

      this.gameOverFunc();
    }
  }

  initialAuth() {
    auth
      .login("sad", "sad")
      .then(userData => {
        auth.saveSession(userData);
        console.log(":) logged in");
      })
      .catch(() => console.log(":) error"));

    this.updateScores();
  }

  updateScores() {
    auth.getAllScores().then(data => {
      data.sort((a, b) => Number(b.score) - Number(a.score));

      this.score1.setText(`${data[0].name}: ${data[0].score}`);
      this.score2.setText(`${data[1].name}: ${data[1].score}`);
      this.score3.setText(`${data[2].name}: ${data[2].score}`);
      this.score4.setText(`${data[3].name}: ${data[3].score}`);
      this.score5.setText(`${data[4].name}: ${data[4].score}`);
      this.score6.setText(`${data[5].name}: ${data[5].score}`);
      this.score7.setText(`${data[6].name}: ${data[6].score}`);
      this.score8.setText(`${data[7].name}: ${data[7].score}`);
    });
  }

  settupPhysics() {
    this.spikes = this.physics.add.group({});
    this.powerUps = this.physics.add.group({});

    this.spikes.children.iterate(function(child) {
      child.body.friction.x = 5;
    });

    this.physics.add.collider(this.spikes, this.powerUps);
    this.physics.add.collider(this.powerUps, this.powerUps);
    this.physics.add.collider(this.spikes, this.player, () =>
      this.spikeCollision()
    );
    this.physics.add.collider(
      this.powerUps,
      this.player,
      (player, tempPowerUp) =>
        this.collisionHelper.powerUpsCollision(tempPowerUp)
    );

    this.physics.add.collider(this.player, this.platforms);
  }

  generateTexts() {
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "62px",
      fill: "#f6ff00"
    });

    this.score0 = this.add.text(text0.x, text0.y, "Highest Scores", style2);
    this.score1 = this.add.text(text1.x, text1.y, "Bobo: 1000", style2);
    this.score2 = this.add.text(text2.x, text2.y, "Bobo: 1000", style2);
    this.score3 = this.add.text(text3.x, text3.y, "Bobo: 1000", style2);
    this.score4 = this.add.text(text4.x, text4.y, "Bobo: 1000", style2);
    this.score5 = this.add.text(text5.x, text5.y, "Bobo: 1000", style2);
    this.score6 = this.add.text(text6.x, text6.y, "Bobo: 1000", style2);
    this.score7 = this.add.text(text7.x, text7.y, "Bobo: 1000", style2);
    this.score8 = this.add.text(text8.x, text8.y, "Bobo: 1000", style2);
  }

  create() {
    this.music = this.sound.add("musicBack");
    this.gameOverMusic = this.sound.add("gameOver");
    this.ooGnome = this.sound.add("ooGnome");

    this.music.play();
    this.initialAuth();
    this.animationsHelper.createAnimations(this.anims);

    //Background
    this.add.tileSprite(1280 / 2, 720 / 2, 1280, 720, "background");

    this.generateTexts();

    //Frame debug view
    this.frameView = this.add.graphics();

    //The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //Floor
    this.platforms
      .create(1280, 768, "ground")
      .setScale(2)
      .refreshBody();

    //Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.on(
      "gameobjectup",
      function(pointer, gameObject) {
        gameObject.emit("clicked", gameObject);
      },
      this
    );

    //Touch Arrows

    /*   Arrow Down   */
    this.down = this.add.image(480, 613, "baseTouchKey");
    this.down.setScale(0.18);
    this.down.angle -= 180;
    this.down.setInteractive();
    this.addTouchControls(this.down, this.cursors.down);

    /*   Arrow Left   */
    this.left = this.add.image(390, 613, "baseTouchKey");
    this.left.setScale(0.18);
    this.left.angle -= 90;
    this.left.setInteractive();
    this.addTouchControls(this.left, this.cursors.left);

    /*   Arrow Rigth   */
    this.right = this.add.image(570, 613, "baseTouchKey");
    this.right.setScale(0.18);
    this.right.angle -= 270;
    this.right.setInteractive();

    this.addTouchControls(this.right, this.cursors.right);

    /*   Arrow Up   */
    this.arrowUp = this.add.image(480, 523, "baseTouchKey");
    this.arrowUp.setScale(0.18);
    this.arrowUp.setInteractive();
    this.addTouchControls(this.arrowUp, this.cursors.up);

    //Creating this.player
    this.player = this.physics.add.sprite(
      600,
      +540,
      this.playerHeight,
      "mummy"
    );

    //Setting Up Helpers
    this.playerMovementHelper = new PlayerMover(this.player);
    this.collisionHelper = new CollisionsHelper(
      this.player,
      this.playerMovementHelper
    );

    //This.player physics properties
    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);

    //Collisions
    this.settupPhysics();
    this.player.setSize(600, this.playerHeight, true);
  }

  addTouchControls(object, cursor) {
    object.on("pointerdown", () => {
      cursor.isDown = true;
      cursor.isUp = false;
    });
    object.on("pointerup", () => {
      cursor.isDown = false;
      cursor.isUp = true;
    });
    object.on("pointerout", () => {
      cursor.isDown = false;
      cursor.isUp = true;
    });
  }

  updateFrameView() {}

  addSpike() {
    this.spikes
      .create(Math.random() * 1280, -100, "spike")
      .setScale(Math.random() * (1 - 0.4) + this.spikeMax);
  }

  addPowerUp() {
    this.powerUps.create(Math.random() * 1280, -100, "powerUp").setScale(0.15);
  }

  gameOverFunc() {
    //

    this.name = this.add.text(390, 290, "Enter your name:", {
      fontSize: "50px",
      fill: "#f6ff00"
    });

    this.textEntry = this.add.text(570, 340, "temp", {
      fontSize: "50px",
      fill: "#fff"
    });

    this.BACKSPACE = this.add.text(577, 390, "Delete", {
      fontSize: "30px",
      fill: "#f6ff00"
    });

    // keys = this.input.keyboard.addKeys('A,B,C');

    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyBackspace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    );

    if (this.listener < 1) {
      this.keyboardListener = this.input.keyboard.on("keydown", event => {
        if (event.keyCode === 8 && this.textEntry.text.length > 0) {
          this.textEntry.text = this.textEntry.text.substr(
            0,
            this.textEntry.text.length - 1
          );
        } else if (event.keyCode >= 48 && event.keyCode < 90) {
          if (this.textEntry.text.length < 4) {
            this.textEntry.text += event.key;
          }
        }
      });
      this.listener++;
    }
    //
    this.gameOver = "Ended";

    this.replayButtonFunc();
  }

  clearMemo() {
    if (this.gameOver !== "Ended") {
      let spikes = this.spikes.children.entries;
      let spikesLength = this.spikes.children.entries.length - 1;
      let powerUps = this.powerUps.children.entries;
      let powerUpsLength = this.powerUps.children.entries.length - 1;

      if (spikes[0] !== undefined && spikes[0].y > 1000) {
        spikes[0].destroy();
      }

      if (powerUps[0] !== undefined && powerUps[0].y > 1000) {
        powerUps[0].destroy();
      }
    }
  }

  resetVars() {
    this.timer = 0;
    this.walkSpeed = 500;
    this.croutchSpeed = this.walkSpeed - 100;
    this.spikeMax = 0.4;
    this.gameOver = false;
    this.replayButton.destroy();
    this.music.play();
    this.playerMovementHelper.reset();
  }

  replayButtonFunc() {
    this.replayButton = this.add.sprite(1280 / 2, 540, "replay");
    this.add.tween({
      targets: this.replayButton,
      ease: "Sine.easeInOut",
      duration: 2000,
      delay: 0,
      alpha: 0,
      repeat: -1
    });

    this.replayButton.opacity = 0;
    this.replayButton.setScale(0.2);
    this.replayButton.setInteractive();
    this.spikes.children.entries = [];
    this.replayButton.on("clicked", () => {
      let score = Number(Math.floor(this.timer / 50));
      let name = this.textEntry.text;
      let data = { score: Number(score), name: name };

      auth.createScore(data).then(userData => {
        this.updateScores();
      });
      //auth.createNewScore("bubu", 1000);

      this.name.destroy(),
        this.textEntry.destroy(),
        this.BACKSPACE.destroy(),
        this.resetVars();
    });
  }

  //Movement
  update() {
    //Checking if game is over
    if (this.gameOver === false) {
      this.timer++;
      this.crouched = false;
      this.scoreText.setText("Score: " + Math.floor(this.timer / 50));

      let score = Math.floor(this.timer / 50);

      //Checking phase
      let randomNum = Math.floor(Math.random() * 10);
      if (score < 10) {
        if (this.timer % 20 === 0 || this.timer === 1) {
          if (randomNum >= 1 && randomNum <= 4) {
            this.addSpike();
          } else {
            this.addPowerUp();
          }
        }
      }

      //Checking phase
      else if (score >= 10) {
        if (this.timer % 10 === 0 || this.timer === 1) {
          if (randomNum >= 1 && randomNum <= 6) {
            this.addSpike();
          } else {
            this.addPowerUp();
          }
        }
      }

      //Preventing memory leaks

      this.crouched = false;

      this.playerMovementHelper.playerMovment(this.cursors);
    } else if (this.gameOver == "Ended") {
      this.player.setVelocityX(0);
      this.player.anims.play("flex", true);
    }

    this.clearMemo();
  }
}
