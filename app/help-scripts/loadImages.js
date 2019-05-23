import floor from "../assets/floor.png";
import background from "../assets/background.png";
import spikeBall from "../assets/spikeball.png";
import replay from "../assets/replayBtn.png";
import powerUp from "../assets/powerUp.png";
import touchArrow from "../assets/touchScreenKey.png";

export default class loadImages {
  constructor() {}

  loadImages(data) {
    data.image("ground", floor);
    data.image("background", background);
    data.image("spike", spikeBall);
    data.image("replay", replay);
    data.image("powerUp", powerUp);
    data.image("baseTouchKey", touchArrow);
  }
}
