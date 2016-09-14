/**
 * Created by hindr on 9/14/2016.
 */


class SkyBox
{
    constructor(gameObject, posx, negx, posy, negy, posz, negz)
    {
        this.gameObjectRef = gameObject;
        let pref = "imgs/";
        this.urls = [ pref + posx, pref + negx, pref + posy, pref + negy, pref + posz, pref + negz ];
        this.skyGeom = new THREE.CubeGeometry(1000,1000,1000);
        this.matArr = [];

        this.TCL = new THREE.TextureLoader();

        for(let i = 0; i < 6; ++i)
        {
            this.matArr.push(new THREE.MeshBasicMaterial({
                map: this.TCL.load(this.urls[i]),
                side: THREE.BackSide
            }));
        }

        this.skyMat = new THREE.MeshFaceMaterial(this.matArr);
        this.skyBox = new THREE.Mesh(this.skyGeom, this.skyMat);
        this.gameObjectRef.scene.add(this.skyBox);
    }

    registerForUpdate()
    {
        this.gameObjectRef.registerForUpdates(
            function(that){
                that.skyBox.position.set(that.gameObjectRef.camera.position.x, that.gameObjectRef.camera.position.y, that.gameObjectRef.camera.position.z);
            }, this
        );
    }



}