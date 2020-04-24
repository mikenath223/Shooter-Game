import Phaser from 'phaser';
import { Score } from '../../modules/scoreBoard';

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('isDead', false);
  }

  explode(score) {
    if (!this.getData('isDead')) {
      this.setTexture('sprExplosion');
      this.play('sprExplosion');
      this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();

      this.on('animationcomplete', function () {
        this.destroy();
        score.increaseScore()
      }, this);
      this.setData('isDead', true);
    }
  }
}


class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy2');
  }
}


export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('Game');
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
    this.load.spritesheet('sprExplosion', '../assets/content/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
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

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };


    this.isClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastFired = 0;

    this.input.on('pointerdown', (point) => {
      this.isClicked = true;
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

    const Bullet = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

        function Bullet(scene) {
          Phaser.GameObjects.Image.call(this, scene, 480 * 0.5,
            640 * 0.5, 'bullet1');

          this.incX = 0;
          this.incY = 0;
          this.lifespan = 0;
          this.scene = scene;
          this.scene.add.existing(this);
          this.scene.physics.world.enableBody(this, 0);

          this.speed = Phaser.Math.GetSpeed(600, 1);
        },

      fire(x, y) {
        this.setActive(true);
        this.setVisible(true);

        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(480 * 0.5,
          640 * 0.5);

        const angle = Phaser.Math.Angle.Between(x, y, 480 * 0.5,
          640 * 0.5);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 1000;
      },

      update(time, delta) {
        this.lifespan -= delta;

        this.x -= this.incX * (this.speed * delta);
        this.y -= this.incY * (this.speed * delta);

        if (this.lifespan <= 0) {
          this.setActive(false);
          this.setVisible(false);
        }
      },

    });

    this.bullets = this.add.group({
      classType: Bullet,
      maxSize: 50,
      runChildUpdate: true,
    });

    this.enemies = this.add.group();


    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = new ChaserShip(
          this,
          Phaser.Math.Between(10, 450),
          Phaser.Math.Between(10, 600)
        )

        if (enemy != null) {
          enemy.setScale(2.5);
          this.enemies.add(enemy)
        }
      },
      callbackScope: this,
      loop: true,
    })

    const score = new Score();

    this.physics.add.collider(this.bullets, this.enemies, (bullet, enemy) => {
      console.log('touch');
      if (enemy) {
        enemy.explode(score);
        bullet.destroy();
      }
    }, null, this);

    this.time.addEvent({
      delay: 1500,
      callback() {
        if (this.enemies.getChildren().length > 5) {
          this.ship.setTexture('sprExplosion');
          this.ship.play('sprExplosion')
          this.sfx.explosions[Phaser.Math.Between(0, this.sfx.explosions.length - 1)].play();
          this.ship.on('animationcomplete', function () {
            this.ship.destroy()
            this.scene.start('GameOver');
          }, this);
        }
      },
      callbackScope: this,
      loop: true
    })
  }

  update(time) {
    this.background.anims.play('bgImg', true);
    this.ship.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.ship.x, this.ship.y) - Math.PI / 2);

    if (this.isClicked && time > this.lastFired) {
      const bullet = this.bullets.get();
      bullet.setScale(0.6);
      if (bullet) {
        bullet.fire(this.mouseX, this.mouseY);
        this.sfx.laser.play();
        this.lastFired = time + 50;
      }
    }
  }
}