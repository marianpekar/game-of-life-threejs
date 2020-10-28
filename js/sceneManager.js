class SceneManager {
    constructor(sceneSettings, cameraSettings) {
        this.createScene();
        this.createRenderer();
        this.createCamera();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(sceneSettings.backgroundColor);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( sceneSettings.width, sceneSettings.height );
        window.document.body.appendChild( this.renderer.domElement );
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera( cameraSettings.fov, sceneSettings.width / sceneSettings.height, cameraSettings.nearClip, cameraSettings.farClip );
        this.camera.position.set(cameraSettings.position.x, cameraSettings.position.y, cameraSettings.position.z);  
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
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    };
}