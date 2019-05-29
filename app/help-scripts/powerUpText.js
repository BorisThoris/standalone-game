export default class spriteSheetHelper {
  constructor(player, text, add) {
    this.player = player;
    this.textTemplate = text;
    this.add = add;
  }

  powerUpText(Text, ammount) {
    if (Text === "star") {
      this.textTemplate.text = "Invincibility";
    } else if (this.player.body.touching.up) {
      switch (Text) {
        case "reverse":
          this.textTemplate.text = "ReVeRsEd";
          break;

        case "powerUp":
          if (ammount === "500") {
            this.textTemplate.text = "Speed Reset";
          } else this.textTemplate.text = "Speed Boost";

          break;
      }

      this.add.tween({
        targets: this.textTemplate,
        ease: "Sine.easeInOut",
        yoyo: true,
        duration: 1000,
        y: Math.random() * 300,
        x: Math.random() * 900,
        delay: 0,
        alpha: 1,
        scale: Math.random() * 2,
        onComplete: () => {
          this.textTemplate.alpha = 0;
          this.textTemplate.y = 290;
        }
      });
    }
  }
}
