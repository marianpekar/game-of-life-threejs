class Appearance {
    constructor(game) {
        this.game = game;
        this.sceneManager = this.game.sceneManager;
        this.settings = this.game.settings;

        this.cellMaterial = new THREE.MeshPhongMaterial({ opacity: this.settings.scene.cellOpacity, transparent: true });
        this.cellNormalMaterial = new THREE.MeshNormalMaterial({ opacity: this.settings.scene.cellOpacity, transparent: true });

        this.borderLinesMaterial = new THREE.LineBasicMaterial( { color: this.game.settings.scene.borderLinesColor } );
        this.drawWorldBordeLines();

        this.showBorderLines(this.settings.appearance.showBorderLines);

        this.selectedMaterial = null;
        this.showCubesNormalMaterial(this.settings.appearance.showNormalMaterial);

        this.setMaterialOpacity(this.settings.appearance.materialOpacity);
        this.setCubesMaterialColor(this.settings.appearance.materialColor);
    }
    
    //     e----f
    //    /|   /|
    //   c----d |
    //   | h--|-g
    //   |/   |/
    //   a----b
    drawWorldBordeLines() {
        const world = this.settings.world;

        const a = { x: 0,            y:0,             z: 0 };
        const b = { x: world.width,  y:0,             z: 0 };
        const c = { x: 0,            y:world.height,  z: 0 };
        const d = { x: world.height, y:world.height,  z: 0 };
        const h = { x: 0,            y:0,             z: world.depth };
        const g = { x: world.width,  y:0,             z: world.depth };
        const e = { x: 0,            y:world.height,  z: world.depth };
        const f = { x: world.height, y:world.height,  z: world.depth };

        this.borderLines = [];
        this.borderLines.push(this.sceneManager.drawLine(a, b, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(b, d, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(d, c, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(c, a, this.borderLinesMaterial));

        this.borderLines.push(this.sceneManager.drawLine(h, g, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(g, f, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(f, e, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(e, h, this.borderLinesMaterial));

        this.borderLines.push(this.sceneManager.drawLine(a, h, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(b, g, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(c, e, this.borderLinesMaterial));
        this.borderLines.push(this.sceneManager.drawLine(d, f, this.borderLinesMaterial));
    }

    showBorderLines(show) {
        this.borderLines.forEach(b => {
            b.visible = show;
        });
    }

    showCubesNormalMaterial(show) {
        if(show)
            this.setCubesMaterial(this.cellNormalMaterial);
        else
            this.setCubesMaterial(this.cellMaterial);
    }

    setCubesMaterial(material) {
        this.selectedMaterial = material;
        this.game.cubes.forEach(c => { c.material = this.selectedMaterial });
    }

    setMaterialOpacity(opacity) {
        if(opacity < 0.0 || opacity > 1.0)
            return;

        this.cellMaterial.opacity = opacity;
        this.cellNormalMaterial.opacity = opacity;
    }

    setCubesMaterialColor(color) {
        this.cellMaterial.color.setRGB(color.r / 255, color.g / 255, color.b / 255);
    }
}