export default class collisiosnHelper {
  constructor(player, playerMovementHelper) {
    this.player = player;
    this.playerMovementHelper = playerMovementHelper;
  }

  // Power up collision
  powerUpsCollision(tempPowerUp) {
    if (this.player.body.touching.up) {
      console.log(tempPowerUp.texture.key);
      let type = tempPowerUp.texture.key.split(" ")[0];
      let ammount = tempPowerUp.texture.key.split(" ")[1];
      console.log(`type: ${type} ammount: ${ammount}`);

      tempPowerUp.active = false;
      tempPowerUp.destroy();

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

      if (this.walkSpeed > 0) {
        this.croutchSpeed = this.walkSpeed - 200;
      } else {
        this.croutchSpeed = this.walkSpeed + 200;
      }
    }
  }
}
