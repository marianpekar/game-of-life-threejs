const sceneSettings = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x010b1a,
    borderLinesColor: 0xcacacc,
    ambientLightColor: 0xffffff
}

const worldSettings = {
    width: 46,
    height: 46,
    depth: 46
}

const cameraSettings = {
    fov: 75,
    position: {
        x: worldSettings.width * 1.5,
        y: worldSettings.height * 1.5,
        z: worldSettings.depth * 1.5
    },
    nearClip: 0.1,
    farClip: 1000
}

const controllerSettings = {
    cursor: {
        color: 0xFF0000,
        opacity: 0.5,
        position: {
            x: 0,
            y: 0,
            z: 0,
        },
        isVisible: true
    }
}

const settings = {
    world: worldSettings,
    scene: sceneSettings,
    camera: cameraSettings,
    controller: controllerSettings
}

const game = new Game(settings);
game.setFewRandomCellsAlive();

new THREE.OrbitControls( game.sceneManager.camera, game.sceneManager.renderer.domElement );