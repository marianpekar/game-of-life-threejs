class Gui {
    constructor(game) {
        this.controller = game.controller;
        this.world = game.world;
        this.game = game;

        this.cursorPosition = {
            x: this.controller.cursor.position.x,
            y: this.controller.cursor.position.y,
            z: this.controller.cursor.position.z,
        }
        this.toggler = false;

        this.setupCursorFolder();
    }

    setupCursorFolder() {
        const gui = new dat.GUI({ autoPlace: true });
        const cursorControlls = gui.addFolder("Cursor")
        cursorControlls.add(this.cursorPosition, 'x', 0, this.world.width - 1).name('X').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'y', 0, this.world.width - 1).name('Y').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'z', 0, this.world.width - 1).name('Z').step(1).onChange(this.updateCursorPosition.bind(this));

        this.toggleButton = { toggle: () => { 
            game.toggleCellAtCoords(this.cursorPosition); 
        }};
        gui.add(this.toggleButton, 'toggle').name("Toggle Cell");

        cursorControlls.open();
    }

    
    updateCursorPosition() {
        this.controller.setCursorPosition(this.cursorPosition.x, this.cursorPosition.y, this.cursorPosition.z);
    }

    toggleCell() {
        this.game.toggleCellAtCoords(this.cursor.position); 
    }
}