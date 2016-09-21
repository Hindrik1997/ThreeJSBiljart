/**
 * Created by hindr on 9/14/2016.
 */

class PoolTable
{
    constructor(width, height)
    {
        let tcl = new THREE.TextureLoader();

        let aM = tcl.load("imgs/carpet.jpg");

        aM.wrapS = aM.wrapT = THREE.RepeatWrapping;
        aM.repeat.set(width / 2, height / 2);

        this.basePlateGeom = new THREE.BoxGeometry(width, 0.2 ,height);
        this.basePlateMat = new THREE.MeshPhysicalMaterial({
            map : aM,
            roughness : 0.78,
            reflectivity : 0.95,
            metalness : 0.15
        });


        this.basePlate = new CubeObject(this.basePlateGeom, this.basePlateMat, false);
        GAME.scene.add(this.basePlate.mesh);

        this.standMat = new THREE.MeshPhysicalMaterial({
            reflectivity : 0.6,
            metalness : 0.7,
            roughnessMap : tcl.load("imgs/wood_roughness.jpg"),
            map : tcl.load("imgs/wood.jpg"),
            side: THREE.DoubleSide
        });

        this.standGeom = new THREE.BoxGeometry(width * 0.9, 2.5, height * 0.9);


        this.lrSide = new THREE.BoxGeometry(width * 0.05, 0.5, height * 1.05);
        this.tdSide = new THREE.BoxGeometry(width * 1.05 - (2 * width*0.05) , 0.5, width * 0.05);

        this.leftSide = new CubeObject(this.lrSide, this.standMat, false);
        this.rightSide = new CubeObject(this.lrSide, this.standMat, false);

        this.topSide = new CubeObject(this.tdSide, this.standMat, false);
        this.downSide = new CubeObject(this.tdSide, this.standMat, false);

        this.leftSide.translate(-width/2, 2.63,0);
        this.rightSide.translate(width/2, 2.63, 0);

        this.topSide.translate(0, 2.63, -height/2 - 0.075);
        this.downSide.translate(0, 2.63, height / 2 + 0.075);

        GAME.scene.add(this.leftSide.mesh);
        GAME.scene.add(this.rightSide.mesh);
        GAME.scene.add(this.topSide.mesh);
        GAME.scene.add(this.downSide.mesh);


        this.standMesh = new THREE.Mesh(this.standGeom, this.standMat);
        this.standMesh.position.y = 1.225;

        this.basePlate.translate(0, 2.5, 0);
        this.basePlate.mesh.position.y = 2.5;
        GAME.scene.add(this.standMesh);
    }
}