class SkyBox {
    constructor(posX, negX, posY, negY, posZ, negZ) {
        let pref = "imgs/";
        this.urls = [posX, negX, posY, negY, posZ, negZ];
        let skyGeom = new THREE.CubeGeometry(1000, 1000, 1000);
        let matArr = [];

        this.TCL = new THREE.TextureLoader();

        for (let i = 0; i < 6; ++i) {
            matArr.push(new THREE.MeshBasicMaterial({
                map: this.TCL.load(pref + this.urls[i]),
                side: THREE.BackSide
            }));
        }

        let skyMat = new THREE.MeshFaceMaterial(matArr);
        this.mesh = new THREE.Mesh(skyGeom, skyMat);

        this.registerForUpdate();
    }

    registerForUpdate() {
        GAME.registerForUpdates(
            function (that) {
                that.mesh.position.set(GAME.camera.position.x, GAME.camera.position.y, GAME.camera.position.z);
            }, this
        );
    }


}