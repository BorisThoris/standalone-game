export default class spriteSheetHelper {
  constructor(player, text, add) {
    this.player = player;
    this.textTemplate = text;
    this.add = add;
  }

  powerUpText(Text, ammount) {
    if (this.player.body.touching.up) {
      console.log(":)");

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
        duration: 500,
        y: Math.random() * 300,
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
