import config from '../../Config/config';
import Button from '../../Objects/Button';


export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver")
  }

  preload() {
    this.load.image("gameoverBg", "assets/stars.jpg");

  }

  create() {
    this.add.image(230, 380, 'gameoverBg');

    this.text = this.add.text(100, 100, 'GAME OVER!', {
      fill: '#fff',
      font: '800 50px monospace',
      stroke: '#fff',
      strokeThickness: 2,
    });
    this.reloadButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Reload', 'Game');
  }

}