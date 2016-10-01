/**
 * Created by jornv on 9/30/2016.
 */
class Cue extends CubeObject {
    constructor() {
        let geometry = new THREE.CylinderGeometry(0.05, 0.05, 10);
        let material = new THREE.MeshPhongMaterial({color: "brown"});
        super(geometry, material, false);
        //this.group = new THREE.Group();

        this.pivotPoint = new THREE.Object3D();
        this.mesh.rotateX(Math.PI / 2);
        this.mesh.position.set(0,0,0);
        this.mesh.position.setZ(-5.2);
        this.pivotPoint.add(this.mesh);
        GAME.scene.add(this.pivotPoint);
        this.pivotPoint.rotateX(Math.PI / 8);

        GAME.registerForUpdates(this.updatePosition, this);
    }

    //noinspection JSMethodCanBeStatic
    updatePosition(that) {
        that.pivotPoint.position.set(GAME.whiteBall.mesh.position.x, GAME.whiteBall.mesh.position.y, GAME.whiteBall.mesh.position.z);
    }
}