let config = {
    type: Phaser.CANVAS,
    width: window.innerWidth - 30,
    height: window.innerHeight - 15,
    scene: [Menu, Level1, Instructions],
}

let playerScale = 0.6;
let musicPlaying = false;

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

let keyLeft, keyRight, keyUp, keyDown, keyI, keyEsc, keySpace;

// globals
let mapDims = {width: 4000, height: 4000 },
    playerStartPos = {x: 0, y: 0},
    playerSpeed = 10,
    borderWidth = 0;

// debug globals
let debugCounter = 0, isDebugTick = true;
