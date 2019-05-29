export default class collisiosnHelper {
  constructor(player, playerMovementHelper, lives) {
    this.player = player;
    this.playerMovementHelper = playerMovementHelper;
    this.lives = lives;
  }

  // Power up collision
  powerUpsCollision(tempPowerUp, type, ammount) {
    console.log(this.lives);
    if (type === "star") {
      this.destroy(tempPowerUp);

      console.log(this.player);
    } else if (this.player.body.touching.up) {
      this.destroy(tempPowerUp);

      switch (type) {
        case "powerUp":
          this.playerMovementHelper.updateSpeed(Number(ammount));
          break;
        case "reverse":
          this.playerMovementHelper.updateSpeed(Number(-ammount));
          break;
      }

      // let powerUp = Math.floor(Math.random() * 6);
      // //   this.ooGnome.play();

      // if (powerUp === 1) {
      //   this.playerMovementHelper.updateSpeed(-500);
      // } else if (powerUp === 2) {
      //   this.playerMovementHelper.updateSpeed(500);
      // } else if (powerUp === 3) {
      //   this.playerMovementHelper.updateSpeed(700);
      // } else if (powerUp === 4) {
      //   this.playerMovementHelper.updateSpeed(-700);
      // } else if (powerUp === 5) {
      //   this.playerMovementHelper.updateSpeed(1000);
      // } else if (powerUp === 6) {
      //   this.playerMovementHelper.updateSpeed(-1000);
      // }

      // if (this.walkSpeed > 0) {
      //   this.croutchSpeed = this.walkSpeed - 200;
      // } else {
      //   this.croutchSpeed = this.walkSpeed + 200;
      // }
    }
  }

  destroy(thing) {
    thing.active = false;
    thing.destroy();
  }
}
