/*
used chatGPT to help with animations: https://chat.openai.com/share/1aa56c01-8b2f-45c7-af1a-d8e6d5c8b9cd
*/

class GameOver extends Phaser.Scene 
{
    constructor()
    {
        super('gameOverScene')
    }

    init(data)
    {
        this.timeAlive = data.timeAlive || 0
    }
    
    preload()
    {
        this.load.image('gameOverScreen', './assets/gameoverscreen.png')
    }

    create() 
    {
        //add background image to scene
        this.backgroundImage = this.add.tileSprite(0, 0, 800, 600, 'gameOverScreen').setOrigin(0, 0)
        this.displayClock = this.add.text(150, 280, 'Time Survived: ' + this.timeAlive + ' seconds', {fontSize: '40px', fontFamily: 'Monospace'})
        this.input.keyboard.on('keydown-P', this.resetGame, this)

    }

    resetGame()
    {
        this.scene.start('playScene')
    }

    

    update() 
    {

    }

}
