const sceneSettings = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x010b1a
}

const worldSettings = {
    width: 46,
    length: 46,
    depth: 46
}

const cameraSettings = {
    fov: 75,
    position: {
        x: worldSettings.width * 1.5,
        y: worldSettings.length * 1.5,
        z: worldSettings.depth * 1.5
    },
    nearClip: 0.1,
    farClip: 1000
}

const gameSettings = {
    worldSettings: worldSettings,
    sceneSettings: sceneSettings,
    cameraSettings: cameraSettings
}

const game = new Game(gameSettings);
game.setFewRandomCellsAlive();

function onKeyDown(event) {
    if(event.keyCode == 32) {
        game.step();
    }
}
document.addEventListener( 'keydown', onKeyDown, false );

function animate() {
    requestAnimationFrame(animate);
    game.sceneManager.renderer.render(game.sceneManager.scene, game.sceneManager.camera);
};
animate();

new THREE.OrbitControls( game.sceneManager.camera, game.sceneManager.renderer.domElement ); 