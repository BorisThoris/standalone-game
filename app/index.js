// const DodgeGame = require("/scenes/dodgeGame");
import Phaser from "./scripts/phaser.js";
import DodgeGame from "./scenes/dodgeGame";
import "./styles/sad.css";

var config = {
  type: Phaser.CANVAS,
  parent: "phaser-example",
  width: 1280,
  height: 720,
  backgroundColor: "#7d7d7d",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 },
      debug: true
    }
  },
  scene: [DodgeGame]
};

//Creating game
var game = new Phaser.Game(config);
