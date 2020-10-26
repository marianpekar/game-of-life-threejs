class SceneManager {
    constructor(sceneSettings, cameraSettings) {
        this.createScene();
        this.createRenderer();
        this.createCamera();
    }

    createScene() {
        this.scene = new THREE.Scene();
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

    addMesh(geometry, material, position, isVisible) {
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
        mesh.visible = isVisible;
        this.scene.add(mesh);

        return mesh;
    }
}