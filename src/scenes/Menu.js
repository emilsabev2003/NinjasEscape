    class Menu extends Phaser.Scene 
    {
        constructor() 
        {
            super('menuScene')
        }

        preload() //load images, audio, sprites here
        {
            this.load.image('MenuBackground', './assets/NinjasEscapeBackground.png')
            this.load.atlas('animations', './assets/sprites1.png', './assets/sprites1.json')
            this.load.audio('gameMusic', './assets/the-big-heist-188391.mp3')
            this.load.image('PlayBackground', './assets/PlayBackground.png')
            this.load.image('groundCollision', './assets/groundCollision.png')
            this.load.audio('jumpsound1', './assets/Woosh-D2-www.fesliyanstudios.com.mp3')
            this.load.audio('jumpsound2', './assets/Woosh-D5-www.fesliyanstudios.com.mp3')
            this.load.audio('jumpsound3', './assets/Woosh-D6-www.fesliyanstudios.com.mp3')
            this.load.audio('impact', './assets/medium-explosion-40472.mp3')
        }

        create() //add custom background, animation configuration, display menu text and instructions, define keys
        {
            this.backgroundImage = this.add.tileSprite(0, 0, 800, 600, 'MenuBackground').setOrigin(0, 0)       
            this.music = this.sound.add('gameMusic')

            this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

            this.anims.create
            ({
                key: 'runAnims',
                frames: this.anims.generateFrameNames('animations', {prefix: "run", start: 1, end: 5, suffix: ".png"}),
                repeat: -1,
                frameRate: 12
            })

            this.anims.create
            ({
                key: 'jumpAnims',
                frames: this.anims.generateFrameNames('animations', {prefix: "jump", start: 1, end: 7, suffix: ".png"}),
                repeat: 0,
                frameRate: 12
            })

            this.anims.create
            ({
                key: 'mineAnims',
                frames: this.anims.generateFrameNames('animations', {prefix: "mine", start: 1, end: 4, suffix: ".png"}),
                repeat: -1,
                frameRate: 12
            })
        }

        update() //transition from menu to play
        {
            if (this.startGame.isDown)
            {
                this.music.play({loop: true})
                this.music.setVolume(0.3)
                this.scene.start('playScene')

            }

        }
    }