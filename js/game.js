class Game {
    constructor(settings) {
        this.settings = settings;

        this.boxGeometry = new THREE.BoxGeometry();
        this.cellMaterial = new THREE.MeshNormalMaterial({ opacity: this.settings.scene.cellOpacity, transparent: true });

        this.world = new World(this.settings.world.width, this.settings.world.height, this.settings.world.depth);
        this.sceneManager = new SceneManager(this.settings.scene, this.settings.camera)
        this.controller = new Controller(this);

        this.cubes = [];
        this.populateWorld();

        this.drawWorldBordeLines();

        this.sceneManager.addAmbientLight(this.settings.scene.ambientLightColor);
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

        const material = new THREE.LineBasicMaterial( { color: this.settings.scene.borderLinesColor } );
        this.sceneManager.drawLine(a, b, material);
        this.sceneManager.drawLine(b, d, material);
        this.sceneManager.drawLine(d, c, material);
        this.sceneManager.drawLine(c, a, material);

        this.sceneManager.drawLine(h, g, material);
        this.sceneManager.drawLine(g, f, material);
        this.sceneManager.drawLine(f, e, material);
        this.sceneManager.drawLine(e, h, material);

        this.sceneManager.drawLine(a, h, material);
        this.sceneManager.drawLine(b, g, material);
        this.sceneManager.drawLine(c, e, material);
        this.sceneManager.drawLine(d, f, material);
    }

    setFewRandomCellsAlive() {
        const initialCellPosition = { 
            x: Math.floor(this.settings.world.width / 2),  
            y: Math.floor(this.settings.world.height / 2),  
            z: Math.floor(this.settings.world.depth / 2),  
        };

        const initialCell = this.world.getCellByCoords(initialCellPosition.x, initialCellPosition.y, initialCellPosition.z).born();
        const neighbors = this.world.getCellNeighbors(initialCell);
        neighbors.forEach(n => {
            if(Math.random() >= 0.5)
                n.born();
        });

        this.setCellStates();
    }

    step() {
        this.applyRules();
        this.setCellStates();
    }

    applyRules() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            let aliveNeighbors = this.countAliveNeighbors(cell);
    
            if(cell.isAlive) 
            {
                if(aliveNeighbors < 3) {
                    cell.shouldDie = true;
                    continue;
                }
                else if(aliveNeighbors > 5) {
                    cell.shouldDie = true;
                    continue;
                }
            }
            else if(!cell.isAlive) 
            {
                if(aliveNeighbors == 5)
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

    setCellOpacity(opacity) {
        if(opacity < 0.0 || opacity > 1.0)
            return;

        this.cellMaterial.opacity = opacity;
    }
}