import floor from "../assets/floor.png";
import background from "../assets/background.png";
import spikeBall from "../assets/spikeball.png";
import replay from "../assets/replayBtn.png";
import powerUp from "../assets/powerUp.png";
import touchArrow from "../assets/touchScreenKey2.png";

import reverseNorm from "../assets/reverse500.png";
import reverse700 from "../assets/reverse700.png";
import reverse1000 from "../assets/reverse1000.png";
import speedNorm from "../assets/powerUp500.png";
import speed700 from "../assets/powerUp700.png";
import speed1000 from "../assets/powerUp1000.png";

export default class loadImages {
  constructor() {}

  loadImages(data) {
    data.image("ground", floor);
    data.image("background", background);
    data.image("spike", spikeBall);
    data.image("replay", replay);
    data.image("powerUp", powerUp);
    data.image("baseTouchKey", touchArrow);

    data.image("reverse 500", reverseNorm);
    data.image("reverse 700", reverse700);
    data.image("reverse 1000", reverse1000);
    data.image("powerUp 500", speedNorm);
    data.image("powerUp 700", speed700);
    data.image("powerUp 1000", speed1000);
  }
}
