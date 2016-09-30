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

        this.tweenPlaying = false;

        this.start = {y: this.mesh.geometry.parameters.height / 2 + 0.2};
        this.end = {y: 0};
        this.forwardTween = new TWEEN.Tween(this.start).to(this.end, 1000);
        let that = this;
        this.forwardTween.onUpdate(function() { that.mesh.position.setY(that.start.y) });
        this.forwardTween.onComplete(function() {
            GAME.whiteBall.movement.set(1,0,1);
            that.backwardTween.start();
        });
        this.backwardTween = new TWEEN.Tween(this.end).to(this.start, 5000);
        this.backwardTween.onUpdate(function() { that.mesh.position.setY(that.end.y) });
        this.backwardTween.onComplete(function() {
            that.tweenPlaying = false;
        })
    }

    //noinspection JSMethodCanBeStatic
    updatePosition(that) {
        that.group.position.set(GAME.whiteBall.mesh.position.x, GAME.whiteBall.mesh.position.y, GAME.whiteBall.mesh.position.z);

        if(!that.tweenPlaying) that.mesh.position.setY(that.mesh.geometry.parameters.height / 2 + 0.2);

        that.group.rotation.set(GAME.orbitControls.object.rotation.x, GAME.orbitControls.object.rotation.y, GAME.orbitControls.object.rotation.z);
        //that.mesh.lookAt(TESTSPHERE.mesh.position);
        // that.mesh.translateZ(1);
        //that.mesh.translateY(1);
    }

    play() {
        this.tweenPlaying = true;
        this.forwardTween.start();
    }
}