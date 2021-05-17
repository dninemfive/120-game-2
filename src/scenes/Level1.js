class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    preload() {
        this.load.image("background", "assets/TrailingLightsProtoBackground.png");
        this.load.image("player", "assets/TrailingLightsProtoCharacter.png");
    }

    create() {
        this.background = this.add.sprite(0, 0,"background").setOrigin(0.5,0.5).setDepth(-2);
        this.background.setScale(1.5);

        this.player = new Player(this, 0, 0, "player").setOrigin(0.5, 0.5);
        this.player.setScale(playerScale);

        let debugConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '30px',
            color: 'lime',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.debugCoords = this.add.text(game.config.width / 2, game.config.height, "asdf", debugConfig).setOrigin(0.5,1);
        console.log(this.background.displayWidth + "; " + this.background.displayHeight);

        this.switches = new Set();
        for(let i = 0; i < 5; i++){
            let w = this.background.displayWidth / 2, h = this.background.displayHeight / 2;
            let x = Phaser.Math.Between(0, w), y = Phaser.Math.Between(0, h);
            this.switches.add(
                new Switch(this, x, y, "switchOff").setOrigin(0.5, 0.5)
            );
        }

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {
        this.player.update();
        for(let s of this.switches) s.update();        
        this.debugCoords.text = "screen: (" + Math.round(this.player.x) + ", " + Math.round(this.player.y) + "); internal: (" + 
                                 Math.round(this.player.pos.x) + ", " + Math.round(this.player.pos.y) + ")";
    }

    
}