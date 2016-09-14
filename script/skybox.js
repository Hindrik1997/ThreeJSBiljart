/**
 * Created by hindr on 9/14/2016.
 */

function initSkybox(gameObject, posx, negx, posy, negy, posz, negz)
{
    let pref = "imgs/";

    let urls = [ pref + posx, pref + negx, pref + posy, pref + negy, pref + posz, pref + negz ];

    let skyGeom = new THREE.CubeGeometry(1000,1000,1000);

    let matArr = [];

    for(let i = 0; i < 6; ++i)
    {
        matArr.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(urls[i]),
            side: THREE.BackSide
        }));
    }

    let skyMat = new THREE.MeshFaceMaterial(matArr);

    let skyBox = new THREE.Mesh(skyGeom, skyMat);
    skyBox.position(0,0,0);
    gameObject.scene.add(skyBox);
}