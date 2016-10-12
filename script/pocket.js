class Pocket extends CubeObject {
    constructor(x, z, width, height, offsetx, offsety) {
        const pocketDetectorHeight = 2;
        const pocketDetectorWidth = 0.1;

        const blackHoleHeight = 0.001;
        const blackHoleWidth = width;
        const blackholeHeight = height;

        let geometry =  new THREE.BoxGeometry(pocketDetectorWidth, pocketDetectorHeight, pocketDetectorWidth);
        let material = new THREE.MeshBasicMaterial({color: "green", visible: true });
        super(geometry, material, false);
        this.mesh.position.set(x, GAME.poolTable.plateY, z);
        this.boundingBoxHelper.update();

        let blackHoleGeometry = new THREE.BoxGeometry(blackHoleWidth, blackHoleHeight, blackholeHeight);
        let blackHoleMaterial = new THREE.MeshBasicMaterial({color: "black"});
        this.blackHoleMesh = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
        this.blackHoleMesh.position.set(this.mesh.position.x + offsetx, this.mesh.position.y, this.mesh.position.z + offsety);

    }

    collidedWith(otherObject) {
        //stop movement
        otherObject.movement.set(0,0,0);
        otherObject.isMovable = false;
        otherObject.isInPocket = true;

        if(GAME.playerManager.currentPlayer.color === Color.UNDECIDED)
        {
            if(Utils.ballNumberToColor(otherObject.ballNr) == "red")
            {
                GAME.playerManager.currentPlayer.color = Color.RED;
                GAME.playerManager.swapPlayers();
                GAME.playerManager.currentPlayer.color = Color.BLUE;
                GAME.playerManager.swapPlayers();
            }
            else
                if(Utils.ballNumberToColor(otherObject.ballNr) == "blue")
                {
                    GAME.playerManager.currentPlayer.color = Color.BLUE;
                    GAME.playerManager.swapPlayers();
                    GAME.playerManager.currentPlayer.color = Color.RED;
                    GAME.playerManager.swapPlayers();
                }
                //else somebody lost or pocketed white ball
        }


        GAME.collisionController.deregisterObject(otherObject);
        //going down

        GAME.infofeed.writeBallPocketed(otherObject);

        let downTween = new TWEEN.Tween({x: otherObject.mesh.position.x, y: otherObject.mesh.position.y, z: otherObject.mesh.position.z})
            .to({x: this.mesh.position.x, y: this.mesh.position.y - 2, z: this.mesh.position.z}, 500)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                otherObject.mesh.position.setX(this.x);
                otherObject.mesh.position.setY(this.y);
                otherObject.mesh.position.setZ(this.z);
            })
            .onComplete(function() {
                if(otherObject === GAME.whiteBall)
                {
                    //pocketed white ball, oops
                    otherObject.mesh.position.set(0,GAME.poolTable.plateY + GAME.whiteBall.distanceToGround,0);
                    GAME.collisionController.registerObject(otherObject);
                    otherObject.isMovable = true;
                    otherObject.isInPocket = false;
                    otherObject.prevPosition = otherObject.mesh.position;

                }
                else {
                    if(otherObject === GAME.blackBall){
                        if(this === GAME.playerManager.currentPlayer.lastPocketUsed.opposite && GAME.playerManager.currentPlayer.getRemainingBalls() == 0)
                        {
                            //win
                            GAME.playerManager.win();
                        }
                        else
                        {
                            //lose
                            GAME.playerManager.lose();
                        }
                    } else
                    otherObject.mesh.material.visible = false;
                }

            });

        downTween.start();
    }
}