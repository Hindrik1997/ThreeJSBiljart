/**
 * Created by hindr on 9/14/2016.
 */


class SkyBox {
    constructor(posX, negX, posY, negY, posZ, negZ) {
        let pref = "imgs/";
        this.urls = [posX, negX, posY, negY, posZ, negZ];
        console.log("first pos in urls", this.urls[0]);
        this.skyGeom = new THREE.CubeGeometry(1000, 1000, 1000);
        this.matArr = [];

        this.TCL = new THREE.TextureLoader();

        for (let i = 0; i < 6; ++i) {
            this.matArr.push(new THREE.MeshBasicMaterial({
                map: this.TCL.load(pref + this.urls[i]),
                side: THREE.BackSide
            }));
        }

        this.skyMat = new THREE.MeshFaceMaterial(this.matArr);
        this.skyBox = new THREE.Mesh(this.skyGeom, this.skyMat);
        GAME.scene.add(this.skyBox);
    }

    registerForUpdate() {
        GAME.registerForUpdates(
            function (that) {
                that.skyBox.position.set(GAME.camera.position.x, GAME.camera.position.y, GAME.camera.position.z);
            }, this
        );
    }


}