    class Menu extends Phaser.Scene 
    {
        constructor() 
        {
            super('menuScene')
        }

        preload() //load images, audio, sprites here
        {
            this.load.image('MenuBackground', './assets/NinjasEscapeBackground.png')
            this.load.atlas('animations', './assets/NinjaSpriteSheet.png', './assets/NinjaSpriteSheet.json')
            this.load.audio('gameMusic', './assets/the-big-heist-188391.mp3')

        }

        create() //add custom background, animation configuration, display menu text and instructions, define keys
        {
            this.backgroundImage = this.add.tileSprite(0, 0, 800, 600, 'MenuBackground').setOrigin(0, 0)       
            this.music = this.sound.add('gameMusic')

            this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

            this.anims.create
            ({
                key: 'ninjaAnims',
                frames: this.anims.generateFrameNames('animations', {prefix: "run", start: 1, end: 5, suffix: ".png"}),
                repeat: -1,
                frameRate: 12
            })
        }

        update() //transition from menu to play if P key is pressed
        {
            if (this.startGame.isDown)
            {
                this.music.play()
                this.music.setVolume(0.2)
                this.scene.start('playScene')
            }

        }
    }