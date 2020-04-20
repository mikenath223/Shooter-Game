import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene/GameScene';
import GameOverScene from './Scenes/GameScene/GameoverScene';
import BootScene from './Scenes/BootScene';
import PlayerDetails from './Scenes/PlayerDetails';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);

    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('PlayerDetails', PlayerDetails);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();