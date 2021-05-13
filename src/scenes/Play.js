class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    preload() {
        this.load.image("background", "assets/TrailingLightsProtoBackground.png");
    }

    create() {
        this.background = this.add.sprite(game.config.width / 2, game.config.height / 2,"background").setOrigin(0.5,0.5).setDepth(-2);
    }

    update() {

    }
}