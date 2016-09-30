/**
 * Created by jornv on 9/30/2016.
 */
class Cue extends CubeObject {
    constructor() {
        let geometry = new THREE.CylinderGeometry(0.05, 0.05, 10);
        let material = new THREE.MeshPhongMaterial({color: "brown"});
        super(geometry, material, true);
        this.group = new THREE.Group();
        this.group.add(this.mesh);
        GAME.registerForUpdates(this.updatePosition, this);
    }

    //noinspection JSMethodCanBeStatic
    updatePosition(that) {
        that.group.position.set(GAME.whiteBall.mesh.position.x, GAME.whiteBall.mesh.position.y, GAME.whiteBall.mesh.position.z);
        that.mesh.position.setY(that.mesh.geometry.parameters.height / 2 + 0.2);

        that.group.rotation.set(GAME.orbitControls.object.rotation.x, GAME.orbitControls.object.rotation.y, GAME.orbitControls.object.rotation.z);
        //that.mesh.lookAt(TESTSPHERE.mesh.position);
        // that.mesh.translateZ(1);
        //that.mesh.translateY(1);
    }
}