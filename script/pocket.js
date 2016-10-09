class Pocket extends CubeObject {
    constructor(x, z) {
        const pocketDetectorHeight = 2;
        const pocketDetectorWidth = 0.1;

        const blackHoleHeight = 0.001;
        const blackHoleWidth = 0.4;

        let geometry =  new THREE.BoxGeometry(pocketDetectorWidth, pocketDetectorHeight, pocketDetectorWidth);
        let material = new THREE.MeshBasicMaterial({visible: false });
        super(geometry, material, false);
        this.mesh.position.set(x, GAME.poolTable.plateY, z);
        this.boundingBoxHelper.update();

        let blackHoleGeometry = new THREE.BoxGeometry(blackHoleWidth, blackHoleHeight, blackHoleWidth);
        let blackHoleMaterial = new THREE.MeshBasicMaterial({color: "black"});
        this.blackHoleMesh = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
        this.blackHoleMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    }

    collidedWith(otherObject) {
        console.log("stopping movement");
        otherObject.movement.set(0,0,0);
        otherObject.isMovable = false;
        otherObject.isInPocket = true;
        GAME.collisionController.deregisterObject(otherObject);
        console.log("going down");

        let downTween = new TWEEN.Tween({x: otherObject.mesh.position.x, y: otherObject.mesh.position.y, z: otherObject.mesh.position.z})
            .to({x: this.mesh.position.x, y: this.mesh.position.y - 2, z: this.mesh.position.z}, 500)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                otherObject.mesh.position.setX(this.x);
                otherObject.mesh.position.setY(this.y);
                otherObject.mesh.position.setZ(this.z);
            })
            .onComplete(function() {
                otherObject.mesh.material.visible = false;



            });

        console.log("going down");

        downTween.start();
    }
}