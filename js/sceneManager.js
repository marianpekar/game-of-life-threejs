class SceneManager {
    constructor(sceneSettings, cameraSettings) {
        this.sceneSettings = sceneSettings;
        this.cameraSettings = cameraSettings;

        this.createScene();
        this.createRenderer();
        this.createCamera();
        this.animate();

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.sceneSettings.backgroundColor);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.sceneSettings.width, this.sceneSettings.height );
        window.document.body.appendChild( this.renderer.domElement );
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera( 
            this.cameraSettings.fov, 
            this.sceneSettings.width / this.sceneSettings.height, 
            this.cameraSettings.nearClip, 
            this.cameraSettings.farClip
        );
        this.camera.position.set(this.cameraSettings.position.x, this.cameraSettings.position.y, this.cameraSettings.position.z);  
    }

    addLight(position, color, intensity) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(position.x, position.y, position.z);
        this.scene.add(light);
    }

    addAmbientLight(color) {
        const light = new THREE.AmbientLight(color);
        this.scene.add(light);
    }


    addMesh(geometry, material, position, isVisible) {
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
        mesh.visible = isVisible;
        this.scene.add(mesh);

        return mesh;
    }

    drawLine(startPosition, endPosition, material) {
        const points = [];
        points.push( new THREE.Vector3( startPosition.x, startPosition.y, startPosition.z ));
        points.push( new THREE.Vector3( endPosition.x, endPosition.y, endPosition.z ));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);

        return line;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}