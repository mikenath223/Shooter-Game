import { Score } from '../../modules/scoreBoard';
import 'phaser';

class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'bullet')

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.incX = 0;
    this.incY = 0;
    this.lifeSpan = 0;
    this.speed = Phaser.Math.GetSpeed(600, 1);
  }

  fire(x, y) {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(0, 0);
    this.angle = Phaser.Math.Angle.Between(x, y, 0, 0);

    this.setRotation(this.angle);
    this.incX = Math.cos(this.angle);
    this.incY = Math.sin(this.angle);
    this.lifeSpan = 1000;
  }


  update(time, diff) {
    this.lifeSpan -= diff;

    this.x -= this.incX * (this.speed * diff);
    this.y -= this.incY * (this.speed * diff);

    if (this.lifeSpan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('Game')
    this.bullets1;
  }


  preload() {
    this.load.spritesheet('background', '../assets/space.png',
      {
        frameWidth: 540,
        frameHeight: 763,
      });
    this.load.spritesheet('sprEnemy2', '../assets/content/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('player', '../assets/images/ship.png');
    this.load.image('bullet1', '../assets/images/bullet11.png');
    this.load.audio('sndExplode0', '../assets/content/sndExplode0.wav');
    this.load.audio('sndExplode1', '../assets/content/sndExplode1.wav');
    this.load.audio('sndLaser', '../assets/content/sndLaser.wav');
  }

  create() {
    this.anims.create({
      key: 'bgImg',
      frames: this.anims.generateFrameNumbers('background', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });
    this.background = this.add.sprite(250, 280, 'bgImg');
    this.ship = this.add.sprite(480 * 0.5,
      640 * 0.5, 'player').setDepth(1).setScale(0.5);

    this.isClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastFired = 0;

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
    let Bullet = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

        function Bullet(scene) {
          Phaser.GameObjects.Image.call(this, scene, 480 * 0.5,
            640 * 0.5, 'bullet1');

          this.incX = 0;
          this.incY = 0;
          this.lifespan = 0;

          this.speed = Phaser.Math.GetSpeed(600, 1);
        },

      fire: function (x, y) {
        this.setActive(true);
        this.setVisible(true);

        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(480 * 0.5,
          640 * 0.5);

        var angle = Phaser.Math.Angle.Between(x, y, 480 * 0.5,
          640 * 0.5);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 1000;
      },

      update: function (time, delta) {
        this.lifespan -= delta;

        this.x -= this.incX * (this.speed * delta);
        this.y -= this.incY * (this.speed * delta);

        if (this.lifespan <= 0) {
          this.setActive(false);
          this.setVisible(false);
        }
      }

    });

    this.bullets1 = this.add.group({
      classType: Bullet,
      maxSize: 50,
      runChildUpdate: true
    });

  }

  update(time, diff) {
    this.background.anims.play('bgImg', true);
    this.ship.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.ship.x, this.ship.y) - Math.PI / 2);

    if (this.isClicked && time > this.lastFired) {
      var bullet = this.bullets1.get();

      if (bullet) {
        bullet.fire(this.mouseX, this.mouseY);

        this.lastFired = time + 50;
      }
    }
  }
}