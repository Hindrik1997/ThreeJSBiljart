/**
 * Created by hindr on 9/14/2016.
 */

class PoolTable
{
    constructor(width, height, GameObject)
    {
        this.basePlateGeom = new THREE.BoxGeometry(width, 0.2 ,height);
        this.basePlateMat = new THREE.MeshLambertMaterial({ color : "green" });
        this.basePlate = new CubeObject(this.basePlateGeom, this.basePlateMat, false);

        this.gameObjectRef = GameObject;
        this.gameObjectRef.scene.add(this.basePlate);


    }
}