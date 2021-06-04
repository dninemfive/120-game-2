let config = {
    type: Phaser.CANVAS,
    width: window.innerWidth - 30,
    height: window.innerHeight - 15,
    scene: [Menu, Level1, Instructions, OpeningCutscene, EndCutscene, Credits],
    physics: {
        default: 'arcade',
        arcade: {debug:true}
    },
    // This \/ was an attempt at dynamic scaling, but not sure how to work it exactly.
    // Apparently requires a CSS file to accomplany it, which I deleted, but we can
    // try it again if you'd like.
    /*
    callbacks: {
        postBoot: function (game) {
            // In v3.15, you have to override Phaser's default styles
            game.canvas.style.width = '100%';
            game.canvas.style.height = '100%';
        }
    }*/
    // Also a try at dynamic scaling. This is simpler, and I like that it preserves the
    // aspect ratio, but I'm still having trouble making getting things right. I'm leaving it as
    // is for now
    /*
    scale: {
        mode: Phaser.Scale.FIT
    },*/
}

let musicPlaying = false;
let playerWin = false;


//blinking text, credit: https://www.stephengarside.co.uk/blog/phaser-3-flashing-text-easy-example/
class TweenHelper {
    static flashElement(scene, element, repeat = true, easing = 'Linear', overallDuration = 1500, visiblePauseDuration = 500) {
        if (scene && element) {
            let flashDuration = overallDuration - visiblePauseDuration / 2;

            scene.tweens.timeline({
                tweens: [
                    {
                        targets: element,
                        duration: 0,
                        alpha: 0,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 1,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: visiblePauseDuration,
                        alpha: 1,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 0,
                        ease: easing,
                        onComplete: () => {
                            if (repeat === true) {
                                this.flashElement(scene, element);
                            }
                        }
                    }
                ]
            });
        }
    }
}



let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLeft, keyRight, keyUp, keyDown, keyI, keyEsc, keySpace, keyR, keyF, keyC, keyS, key0, keyLEFTARROW, keyRIGHTARROW;

// globals
let mapDims = {width: 4000, height: 4000 },
    playerStartPos = {x: 0, y: 0},
    playerSpeed = 10,
    borderWidth = 0,
    playerScale = 0.2,
    switchScale = 0.3;

// debug globals
let debugCounter = 0, isDebugTick = true;
