let GAME;
let BALLS;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    addBalls(4);
    GAME.render(GAME);
    new Sun();
}

function addBalls(num)
{
    BALLS = new THREE.Group();

    for(let i = 0; i < num; ++i)
    {
        let b = new Ball(Math.random() + 0.5, getRandomColor());
        BALLS.add(b);
        b.randomizePos();
    }

    GAME.scene.add(BALLS);
}

function getRandomColor()
{
    return Math.floor(Math.random() * 0xffffff);
}