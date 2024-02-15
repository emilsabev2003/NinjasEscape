// Ninjas Escape
// Name: Emil Sabev
// Date: 2/14/2024

//credits: https://pixabay.com/music/crime-scene-the-big-heist-188391/
//         https://www.fesliyanstudios.com/royalty-free-sound-effects-download/whoosh-and-swoosh-73
//         https://pixabay.com/sound-effects/medium-explosion-40472/

'use strict'

let config = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: { autoCenter: Phaser.Scale.CENTER_BOTH},
    physics: 
    { 
        default: 'arcade', 
        arcade: 
        {
            gravity: { y: 500}, 
            debug: false
        }
    },
    scene: [ Menu, Play, GameOver ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
