class Gui {
    constructor(game) {
        this.controller = game.controller;
        this.world = game.world;
        this.game = game;

        this.gui = new dat.GUI({ autoPlace: true });

        this.cursorPosition = {
            x: this.controller.cursor.position.x,
            y: this.controller.cursor.position.y,
            z: this.controller.cursor.position.z,
        }

        this.nbrsBecomeAliveProbability = 0.5;

        this.setupCursorFolder();
        this.setupWorldFolder();
    }

    setupCursorFolder() {
        const cursorControlls = this.gui.addFolder("Cursor")
        cursorControlls.add(this.cursorPosition, 'x', 0, this.world.width - 1).name('X').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'y', 0, this.world.width - 1).name('Y').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'z', 0, this.world.width - 1).name('Z').step(1).onChange(this.updateCursorPosition.bind(this));

        this.toggleButton = { toggle: () => { 
            this.game.toggleCellAtCoords(this.controller.cursor.position); 
        }};
        cursorControlls.add(this.toggleButton, 'toggle').name("Toggle Cell");
        cursorControlls.open();

        this.setupRandomizeNBRsFolder(cursorControlls);
    }

    setupRandomizeNBRsFolder(cursorControlls) {
        const randomizeNbrsFolder = cursorControlls.addFolder("Randomize NBRs");
        this.randomizeAroundCursorButton = { randomize: () => {
            this.game.setRandomNeighborsAlive(this.controller.cursor.position, this.nbrsBecomeAliveProbability)
        }};
        randomizeNbrsFolder.add(this, 'nbrsBecomeAliveProbability', 0.1, 1).name('Probability').step(0.1);
        randomizeNbrsFolder.add(this.randomizeAroundCursorButton, 'randomize').name('Randomize');
    }

    
    updateCursorPosition() {
        this.controller.setCursorPosition(this.cursorPosition.x, this.cursorPosition.y, this.cursorPosition.z);
    }

    toggleCell() {
        this.game.toggleCellAtCoords(this.cursor.position); 
    }

    setupWorldFolder() {
        const worldControlls = this.gui.addFolder("World");
        
        this.clearButton = { clear: () => { 
            this.game.clear(); 
        }};
        worldControlls.add(this.clearButton, 'clear').name("Clear");

        worldControlls.open();
    }
}