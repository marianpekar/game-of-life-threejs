const game = new Game(settings);
game.setFewRandomCellsAlive();

new THREE.OrbitControls( game.sceneManager.camera, game.sceneManager.renderer.domElement );