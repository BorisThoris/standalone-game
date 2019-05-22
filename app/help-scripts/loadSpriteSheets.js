import runningMan from "../assets/runningMan.png";
import runningMan2 from "../assets/runningMan2.png";
import flexingMan from "../assets/flexingMan.png";
import crouchingflex from "../assets/croutching-flex.png";
import crouchingWalkLeft from "../assets/croutching-walk-left.png";
import crouchingWalkRight from "../assets/croutching-walk-right.png";
import jumpingMan from "../assets/jumpingMan.png";

export default class spriteSheetHelper {
  constructor() {}

  loadSpriteSheets(data) {
    data.spritesheet("mummy", runningMan, {
      frameWidth: 256,
      frameHeight: 256
    });
    data.spritesheet("mummy2", runningMan2, {
      frameWidth: 256,
      frameHeight: 256
    });
    data.spritesheet("flex", flexingMan, {
      frameWidth: 256,
      frameHeight: 256
    });
    data.spritesheet("crouch-flex", crouchingflex, {
      frameWidth: 256,
      frameHeight: 256
    });
    data.spritesheet("crouch-walk-left", crouchingWalkLeft, {
      frameWidth: 256,
      frameHeight: 256
    });
    data.spritesheet("crouch-walk-right", crouchingWalkRight, {
      frameWidth: 256,
      frameHeight: 256
    });
    data.spritesheet("jump", jumpingMan, {
      frameWidth: 256,
      frameHeight: 256
    });
  }
}
