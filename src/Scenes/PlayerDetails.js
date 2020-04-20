const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;

export default class PlayerDetails extends Phaser.Scene {
  constructor() {
    super('PlayerDetails')
  }

  preload() {
    // this.load.image('user', 'assets/person.png')
  }

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var print = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Star Craft',
      style: {
        font: '800 50px monospace',
        fill: 'rgb(0, 255, 255)',
        stroke: '#fff',
        strokeThickness: 5,
        shadow: '0 20px 20px rgba(0,0,0,.15)'
  }
    });
    print.setOrigin(0.5, 3.5);


    CreateLoginDialog(this, {
      x: 250,
      y: 300,
      title: 'Welcome, kindly enter your username',
      username: ''
    })
      .on('login', function (username) {
        if (username.length > 0) {
          this.scene.scene.start('Title');
          // print.text += `${username}`;
        }
      })
      //.drawBounds(this.add.graphics(), 0xff0000);
      .popUp(2000);

    // this.add.text(0, 560, 'Click user name or password field to edit it\nClick Login button to show user name and password')
  }

  update() { }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var CreateLoginDialog = function (scene, config, onSubmit) {
  var username = GetValue(config, 'username', '');
  var title = GetValue(config, 'title', 'Welcome');
  var x = GetValue(config, 'x', 0);
  var y = GetValue(config, 'y', 0);
  var width = GetValue(config, 'width', undefined);
  var height = GetValue(config, 'height', undefined);

  var background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
  var titleField = scene.add.text(0, 0, title);
  var userNameField = scene.rexUI.add.label({
    orientation: 'x',
    background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
    // icon: scene.add.image(0, 0, 'user'),
    text: scene.rexUI.add.BBCodeText(0, 0, username, { fixedWidth: 150, fixedHeight: 36, valign: 'center' }),
    space: { left: 150 }
  })
    .setInteractive()
    .on('pointerdown', function () {
      var config = {
        onTextChanged: function (textObject, text) {
          username = text;
          textObject.text = text;
        }
      }
      scene.rexUI.edit(userNameField.getElement('text'), config);
    });

  var loginButton = scene.rexUI.add.label({
    orientation: 'x',
    background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
    text: scene.add.text(0, 0, 'SUBMIT'),
    space: { top: 8, bottom: 8, left: 20, right: 20 }
  })
    .setInteractive()
    .on('pointerdown', function () {
      loginDialog.emit('login', username);
    });

  var loginDialog = scene.rexUI.add.sizer({
    orientation: 'y',
    x: x,
    y: y,
    width: width,
    height: height,
  })
    .addBackground(background)
    .add(titleField, 0, 'center', { top: 10, bottom: 10, left: 10, right: 10 }, false)
    .add(userNameField, 0, 'left', { bottom: 10, left: 10, right: 10 }, true)
    .add(loginButton, 0, 'center', { bottom: 10, left: 10, right: 10 }, false)
    .layout();
  return loginDialog;
};

