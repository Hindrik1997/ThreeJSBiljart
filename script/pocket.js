/**
 * Created by jornv on 10/6/2016.
 */
class Pocket extends CubeObject {
    constructor(width, depth, x, z) {
        const pocketBoxHeight = 0.3;

        let geometry =  new THREE.BoxGeometry(width, pocketBoxHeight, depth);
        let material = new THREE.MeshBasicMaterial({color: "black", visible: false });
        super(geometry, material, false);
        this.mesh.position.set(x, GAME.poolTable.plateY - pocketBoxHeight + 0.1601, z);


    }

    collidedWith(otherObject) {
        console.log("in pocket");
        otherObject.isInPocket = true;
        otherObject.dispose();
        // Don't actually collide with the pocket
    }
}