import Phaser from 'phaser';
import Userdetails from '../modules/scoreBoard';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;

const { GetValue } = Phaser.Utils.Objects;
function CreateLoginDialog(scene, config) {
  let username = GetValue(config, 'username', '');
  const title = GetValue(config, 'title');
  const x = GetValue(config, 'x', 0);
  const y = GetValue(config, 'y', 0);
  const width = GetValue(config, 'width', undefined);
  const height = GetValue(config, 'height', undefined);

  const background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
  const titleField = scene.add.text(0, 0, title);
  const userNameField = scene.rexUI.add.label({
    orientation: 'x',
    background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
    text: scene.rexUI.add.BBCodeText(0, 0, username, { fixedWidth: 150, fixedHeight: 36, valign: 'center' }),
    space: { left: 50, bottom: 50, top: -30 },
  })
    .setInteractive()
    .on('pointerdown', () => {
      const config = {
        onTextChanged(textObject, text) {
          username = text;
          textObject.text = text;
        },
      };
      scene.rexUI.edit(userNameField.getElement('text'), config);
    });

  const loginButton = scene.rexUI.add.label({
    orientation: 'x',
    background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
    text: scene.add.text(0, 0, 'SUBMIT'),
    space: {
      top: 8, bottom: 8, left: 8, right: 8,
    },
  })
    .setInteractive()
    .on('pointerdown', () => {
      loginDialog.emit('login', username);
    });

  const loginDialog = scene.rexUI.add.sizer({
    orientation: 'y',
    x,
    y,
    width,
    height,
  })
    .addBackground(background)
    .add(titleField, 0, 'center', {
      top: 10, bottom: 10, left: 10, right: 10,
    }, false)
    .add(userNameField, 0, 'top', { bottom: 10, left: 10, right: 10 }, true)
    .add(loginButton, 0, 'center', { bottom: 10, left: 10, right: 10 }, false)
    .layout();


  return loginDialog;
}

export default class PlayerDetails extends Phaser.Scene {
  constructor() {
    super('PlayerDetails');
  }

  preload() {
    this.load.image('gameoverBg', 'assets/stars.jpg');
  }

  create() {
    this.add.image(230, 380, 'gameoverBg');

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const print = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Star Craft',
      style: {
        font: '800 50px monospace',
        fill: 'rgb(0, 255, 255)',
        stroke: '#fff',
        strokeThickness: 5,
        shadow: '#fff',
      },
    });
    print.setOrigin(0.5, 3.5);

    CreateLoginDialog(this, {
      x: 250,
      y: 300,
      title: 'Welcome, kindly enter your username',
      username: '',
    })
      .on('login', function played(username) {
        if (username.length > 0) {
          new Userdetails().setUser(username);
          this.scene.scene.start('Title');
        }
      })
      .popUp(2000);
  }
}
