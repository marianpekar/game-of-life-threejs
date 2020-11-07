class Game {
    constructor(settings) {
        this.settings = settings.allSettings;
        this.rules = this.settings.game.rules;
        this.appearance = this.settings.apperance;

        this.boxGeometry = new THREE.BoxGeometry();
        this.cellMaterial = new THREE.MeshPhongMaterial({ opacity: this.settings.scene.cellOpacity, transparent: true });
        this.cellNormalMaterial = new THREE.MeshNormalMaterial({ opacity: this.settings.scene.cellOpacity, transparent: true });

        this.world = new World(this.settings.world.width, this.settings.world.height, this.settings.world.depth);
        this.sceneManager = new SceneManager(this.settings.scene, this.settings.camera)
        this.controller = new Controller(this);

        this.cubes = [];
        this.populateWorld();

        this.borderLinesMaterial = new THREE.LineBasicMaterial( { color: this.settings.scene.borderLinesColor } );
        this.drawWorldBordeLines();

        //this.sceneManager.addAmbientLight(this.settings.scene.ambientLightColor);
        this.sceneManager.addLight({x:-1, y: 2, z: 4}, 0xFFFFFF, 1);
        this.sceneManager.addLight({x: 1, y:-1, z:-2}, 0xFFFFFF, 1);

        this.isRunning = false;
        this.simulationSpeed = 1; // 1 = one step per second
        this.timers = [];

        this.showBorderLines(this.appearance.showBorderLines);
        this.showCubesNormalMaterial(this.appearance.cubesNormalMaterial);
        this.setMaterialOpacity(this.appearance.materialOpacity);
        this.setCubesMaterialColor(this.appearance.materialColor);
    }

    populateWorld() {
        this.world.cells.forEach(c => {
            if(c != undefined) {
                let cube = this.sceneManager.addMesh(this.boxGeometry, this.cellMaterial, c.position, c.isAlive)
                this.cubes.push(cube);
            }
        });
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

    randomizeNeighbors(position, probability) {
        const centerCell = this.world.getCellByCoords(position.x, position.y, position.z);
        const neighbors = this.world.getCellNeighbors(centerCell);
        neighbors.forEach(n => {
            if(Math.random() >= 1.0 - probability && n != undefined) 
                n.born();
            else
                n.die();
        });

        this.setCellStates();
    }

    step() {
        this.applyRules();
        this.setCellStates();
    }

    run() {
        stop();

        this.timers.push(setInterval(this.step.bind(this), 1000 / this.simulationSpeed));
        this.isRunning = true;
    }

    stop() {
        if(!this.isRunning)
            return;

        this.timers.forEach(t => {
            clearInterval(t);
        });
    }

    setSimulationSpeed(speed) {
        this.stop();
        this.simulationSpeed = speed;

        if(this.isRunning)
            this.run();
    }

    applyRules() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            let aliveNeighbors = this.countAliveNeighbors(cell);
    
            if(cell.isAlive) 
            {
                if(aliveNeighbors <= this.rules.underpopulated) {
                    cell.shouldDie = true;
                    continue;
                }
                else if(aliveNeighbors >= this.rules.overpopulated) {
                    cell.shouldDie = true;
                    continue;
                }
            }
            else if(!cell.isAlive) 
            {
                if(aliveNeighbors == this.rules.ideal)
                    cell.shouldBorn = true;
                    continue
            }
        }
    }

    countAliveNeighbors(cell) {
        const neighbors = this.world.getCellNeighbors(cell);
        let counter = 0;
        neighbors.forEach(n => {
            if(n != undefined) {
                if(n.isAlive)
                counter++;
            }
        });
        return counter;
    }

    setCellStates() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            if(cell.shouldDie && cell.isAlive) {
                cell.die();
            }
            if (cell.shouldBorn && !cell.isAlive) {
                cell.born();
            }
    
            this.cubes[i].visible = cell.isAlive;
    
            cell.shouldBorn = false;
            cell.shouldDie = false;
        }
    }

    toggleCellAtCoords(position) {
        const cell = this.world.getCellByCoords(position.x, position.y, position.z).toggle();
        this.cubes[cell.index].visible = cell.isAlive;
    }

    clear() {
        this.world.cells.forEach(c => {
            c.isAlive = false;
            this.cubes[c.index].visible = c.isAlive;
        });
    }

    setMaterialOpacity(opacity) {
        if(opacity < 0.0 || opacity > 1.0)
            return;

        this.cellMaterial.opacity = opacity;
        this.cellNormalMaterial.opacity = opacity;
    }

    showCubesNormalMaterial(show) {
        if(show)
            this.setCubesMaterial(this.cellNormalMaterial);
        else
            this.setCubesMaterial(this.cellMaterial);
    }

    setCubesMaterial(material) {
        this.cubes.forEach(c => { c.material = material });
    }

    setCubesMaterialColor(color) {
        this.cellMaterial.color.setRGB(color.r / 255, color.g / 255, color.b / 255);
    }
}