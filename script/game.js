function resizeWindow(gameObject)
{
    let h = $("body").height();
    let w = $("body").width();

    gameObject.renderer.setSize(w,h);
    gameObject.camera.aspect = (w / h);
    gameObject.camera.updateProjectionMatrix();
}

class Game {
    constructor() {
        // Setup Three.js base
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;

        $("body").css("width", "100%");
        $("body").css("height", "100%");
        $("body").css("background-color", "#" + getRandomColor().toString(16));
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize($("body").width(), $("body").height() );
        $("body").append(this.renderer.domElement);

        // Initialize update array
        this.updateList = [];
    }

    render(that) {
        that.updateList.forEach(function(element){
            element.function(element.that);
        });

        requestAnimationFrame(function () {
            that.render(that)
        });
        that.renderer.render(that.scene, that.camera);
    }

    // Registers a function and the object it belongs to, this makes it run every frame
    registerForUpdates(func, that)
    {
        this.updateList.push({function: func, that: that});
    }
}