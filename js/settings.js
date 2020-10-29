const sceneSettings = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x010b1a,
    borderLinesColor: 0xcacacc,
    ambientLightColor: 0xffffff,
    cellOpacity: 0.5
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
            x: Math.floor(worldSettings.width / 2),
            y: Math.floor(worldSettings.height / 2),
            z: Math.floor(worldSettings.depth / 2)
        },
        isVisible: true
    }
}

// Any live cell with count of neighbors <= _underpopulated_ dies
// Any live cell with count of neighbors >= _overpopulated_ dies
// Any dead cell with count of neighbors == _ideal_ becomes a live cell
const gameSettings = {
    rules: {
        underpopulated: 3,
        overpopulated: 7,
        ideal: 5
    }
}

const settings = {
    world: worldSettings,
    scene: sceneSettings,
    camera: cameraSettings,
    controller: controllerSettings,
    game: gameSettings
}