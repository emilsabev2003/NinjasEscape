// Ninjas Escape
// Name: Emil Sabev
// Date: 2/14/2024
// Approx Hours Spent: 13

//credits: https://pixabay.com/music/crime-scene-the-big-heist-188391/
//         https://www.fesliyanstudios.com/royalty-free-sound-effects-download/whoosh-and-swoosh-73
//         https://pixabay.com/sound-effects/medium-explosion-40472/

/*
This is the first time I've ever used a pixel art editor, and while the programming itself may not be that great, I am still proud of the animations 
I was able to draw for the ninja. It was very difficult figuring out how to format the pngs and atlas together but the end result felt very satisfying.
*/

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
