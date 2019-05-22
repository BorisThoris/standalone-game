import floor from "../assets/floor.png";
import background from "../assets/background.png";
import spikeBall from "../assets/spikeball.png";
import replay from "../assets/replayBtn.png";
import powerUp from "../assets/powerUp.png";

export default class animationsHelper {
  constructor() {}

  createAnimations(data) {
    data.create({
      key: "walkRight",
      frames: data.generateFrameNumbers("mummy"),
      frameRate: 10,
      repeat: -1
    });

    data.create({
      key: "walkLeft",
      frames: data.generateFrameNumbers("mummy2"),
      frameRate: 10,
      repeat: -1
    });

    data.create({
      key: "flex",
      frames: data.generateFrameNumbers("flex"),
      frameRate: 4,
      repeat: -1
    });

    data.create({
      key: "jump",
      frames: data.generateFrameNumbers("jump"),
      frameRate: 6,
      repeat: -1
    });

    data.create({
      key: "crouch-flex",
      frames: data.generateFrameNumbers("crouch-flex"),
      frameRate: 6,
      repeat: -1
    });

    data.create({
      key: "crouch-walk-left",
      frames: data.generateFrameNumbers("crouch-walk-left"),
      frameRate: 6,
      repeat: -1
    });

    data.create({
      key: "crouch-walk-right",
      frames: data.generateFrameNumbers("crouch-walk-right"),
      frameRate: 6,
      repeat: -1
    });
  }
}
