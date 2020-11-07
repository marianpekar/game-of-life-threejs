class Settings {
    constructor() {
        this.sceneSettings = {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x010b1a,
            borderLinesColor: 0xcacacc,
            ambientLightColor: 0xffffff,
            cellOpacity: 0.5
        }
        
        this.worldSettings = {
            width: 46,
            height: 46,
            depth: 46
        }
        
        this.cameraSettings = {
            fov: 75,
            position: {
                x: this.worldSettings.width * 1.5,
                y: this.worldSettings.height * 1.5,
                z: this.worldSettings.depth * 1.5
            },
            nearClip: 0.1,
            farClip: 1000
        }
        
        this.controllerSettings = {
            cursor: {
                color: 0xFF0000,
                opacity: 0.5,
                isVisible: true
            }
        }
        
        // Any live cell with count of neighbors <= _underpopulated_ dies
        // Any live cell with count of neighbors >= _overpopulated_ dies
        // Any dead cell with count of neighbors == _ideal_ becomes a live cell
        this.gameSettings = {
            rules: {
                underpopulated: 3,
                overpopulated: 7,
                ideal: 5
            }
        }

        this.apperanceSettings = {
            showBorderLines: true,
            cubesNormalMaterial: true,
            materialOpacity: 0.5,
            materialColor: {
                r: 255,
                g: 255,
                b: 255
            }
        }
        
        this.allSettings = {
            world: this.worldSettings,
            scene: this.sceneSettings,
            camera: this.cameraSettings,
            controller: this.controllerSettings,
            game: this.gameSettings,
            apperance: this.apperanceSettings
        }
    }
}
