// Ninjas Escape
// Name: Emil Sabev
// Date: 2/14/2024

//credits: https://pixabay.com/music/crime-scene-the-big-heist-188391/

'use strict'

let config = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: { autoCenter: Phaser.Scale.CENTER_BOTH},
    physics: { default: 'arcade', arcade: { debug: true }},
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
