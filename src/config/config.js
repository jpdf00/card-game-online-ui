import { Boot } from '../scenes/Boot';
import { Game } from '../scenes/Game';
import { GameOver } from '../scenes/GameOver';
import { MainMenu } from '../scenes/MainMenu';
import { Preloader } from '../scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 2560,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#333333',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

export default config