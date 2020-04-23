import { Score } from '../../modules/scoreBoard';

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }


  preload() {
    this.load.spritesheet('background', '../assets/space.png',
      {
        frameWidth: 540,
        frameHeight: 763,
      });
    this.load.image('player', '../assets/images/ship.png');
    this.load.image('bullet', '../assets/images/bullet11.png')
  }

  create() {
    this.anims.create({
      key: 'bgImg',
      frames: this.anims.generateFrameNumbers('background', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });
    this.background = this.add.sprite(250, 280, 'bgImg');
    this.ship = this.add.sprite(this.game.config.width * 0.5,
      this.game.config.height * 0.5, 'player').setDepth(1);

    this.isClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;

    this.input.on('pointerdown', (point) => {
      this.isClicked = true
      this.mouseX = point.x;
      this.mouseY = point.y;
    });
    this.input.on('pointermove', (point) => {
      this.mouseX = point.x;
      this.mouseY = point.y;
    });
    this.input.on('pointerup', () => {
      this.isClicked = false;
    });
  }

  update() {
    this.background.anims.play('bgImg', true);
    this.ship.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.ship.x, this.ship.y) - Math.PI / 2);
  }
}